'use client'

import { useState, useEffect, useTransition } from 'react'
import {
  getAdminStats,
  getPendingTributes,
  getAllTributes,
  getAllCandles,
  getAllGalleryImages,
  getFuneralInfo,
  approveTribute,
  rejectTribute,
  deleteTribute,
  deleteCandle,
  updateFuneralInfo,
  addGalleryImage,
  deleteGalleryImage,
} from '@/lib/actions'

type Tab = 'stats' | 'tributes' | 'candles' | 'gallery' | 'funeral'

type Stats = {
  candleCount: number
  pendingTributes: number
  approvedTributes: number
  totalViews: number
}

type Tribute = {
  id: string
  name: string
  relation: string
  message: string
  status: string
  createdAt: Date
}

type Candle = {
  id: string
  name: string
  city: string | null
  message: string | null
  createdAt: Date
}

type GalleryImage = {
  id: string
  url: string
  caption: string | null
  order: number
}

type FuneralInfo = {
  id: string
  date: string
  time: string
  venue: string
  address: string
  mapsUrl: string | null
  program: string | null
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date)
}

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<Tab>('stats')
  const [isPending, startTransition] = useTransition()

  const [stats, setStats] = useState<Stats | null>(null)
  const [tributes, setTributes] = useState<Tribute[]>([])
  const [candles, setCandles] = useState<Candle[]>([])
  const [images, setImages] = useState<GalleryImage[]>([])
  const [funeralInfo, setFuneralInfo] = useState<FuneralInfo | null>(null)

  const [funeralSuccess, setFuneralSuccess] = useState(false)
  const [funeralError, setFuneralError] = useState<string | null>(null)
  const [gallerySuccess, setGallerySuccess] = useState(false)
  const [galleryError, setGalleryError] = useState<string | null>(null)

  // Upload state
  const [uploadMode, setUploadMode] = useState<'file' | 'url'>('file')
  const [uploading, setUploading] = useState(false)
  const [uploadPreview, setUploadPreview] = useState<string | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const loadAll = () => {
    startTransition(async () => {
      const [s, t, c, g, f] = await Promise.all([
        getAdminStats(),
        getAllTributes(),
        getAllCandles(),
        getAllGalleryImages(),
        getFuneralInfo(),
      ])
      setStats(s)
      setTributes(
        t.map((x) => ({
          id: x.id,
          name: x.name,
          relation: x.relation,
          message: x.message,
          status: x.status,
          createdAt: x.createdAt,
        }))
      )
      setCandles(
        c.map((x) => ({
          id: x.id,
          name: x.name,
          city: x.city,
          message: x.message,
          createdAt: x.createdAt,
        }))
      )
      setImages(
        g.map((x) => ({
          id: x.id,
          url: x.url,
          caption: x.caption,
          order: x.order,
        }))
      )
      setFuneralInfo(
        f
          ? {
              id: f.id,
              date: f.date,
              time: f.time,
              venue: f.venue,
              address: f.address,
              mapsUrl: f.mapsUrl,
              program: f.program,
            }
          : null
      )
    })
  }

  useEffect(() => {
    loadAll()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleApproveTribute = async (id: string) => {
    await approveTribute(id)
    loadAll()
  }

  const handleRejectTribute = async (id: string) => {
    await rejectTribute(id)
    loadAll()
  }

  const handleDeleteTribute = async (id: string) => {
    if (!confirm('Supprimer définitivement ce témoignage ?')) return
    await deleteTribute(id)
    loadAll()
  }

  const handleDeleteCandle = async (id: string) => {
    if (!confirm('Supprimer cette bougie ?')) return
    await deleteCandle(id)
    loadAll()
  }

  const handleDeleteImage = async (id: string) => {
    if (!confirm('Supprimer cette image ?')) return
    await deleteGalleryImage(id)
    loadAll()
  }

  const handleFuneralSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setFuneralError(null)
    const formData = new FormData(e.currentTarget)
    const result = await updateFuneralInfo(formData)
    if (result?.error) {
      setFuneralError(result.error)
    } else {
      setFuneralSuccess(true)
      setTimeout(() => setFuneralSuccess(false), 3000)
      loadAll()
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setSelectedFile(file)
    const reader = new FileReader()
    reader.onload = (ev) => setUploadPreview(ev.target?.result as string)
    reader.readAsDataURL(file)
  }

  const handleAddImage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setGalleryError(null)
    const form = e.currentTarget
    const formData = new FormData(form)

    if (uploadMode === 'file') {
      if (!selectedFile) {
        setGalleryError('Veuillez sélectionner une image.')
        return
      }
      setUploading(true)
      try {
        const uploadData = new FormData()
        uploadData.append('file', selectedFile)
        const res = await fetch('/api/admin/upload', { method: 'POST', body: uploadData })
        const json = await res.json()
        if (!res.ok) { setGalleryError(json.error || 'Erreur upload'); return }
        formData.set('url', json.url)
      } finally {
        setUploading(false)
      }
    }

    const result = await addGalleryImage(formData)
    if (result?.error) {
      setGalleryError(result.error)
    } else {
      setGallerySuccess(true)
      form.reset()
      setUploadPreview(null)
      setSelectedFile(null)
      setTimeout(() => setGallerySuccess(false), 3000)
      loadAll()
    }
  }

  const tabs: { id: Tab; label: string; badge?: number }[] = [
    { id: 'stats', label: 'Statistiques' },
    { id: 'tributes', label: 'Témoignages', badge: stats?.pendingTributes },
    { id: 'candles', label: 'Bougies' },
    { id: 'gallery', label: 'Galerie' },
    { id: 'funeral', label: 'Obsèques' },
  ]

  return (
    <div style={{ padding: '2rem 1.5rem', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Tabs */}
      <div
        style={{
          display: 'flex',
          gap: 0,
          borderBottom: '1px solid var(--border-subtle)',
          marginBottom: '2rem',
          overflowX: 'auto',
        }}
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`admin-tab ${activeTab === tab.id ? 'active' : ''}`}
            style={{ position: 'relative' }}
          >
            {tab.label}
            {tab.badge != null && tab.badge > 0 && (
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 18,
                  height: 18,
                  borderRadius: '50%',
                  background: '#fbbf24',
                  color: '#0a0a0f',
                  fontSize: '0.6rem',
                  fontWeight: 700,
                  marginLeft: '0.4rem',
                  verticalAlign: 'middle',
                }}
              >
                {tab.badge}
              </span>
            )}
          </button>
        ))}
      </div>

      {isPending && (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '1rem' }}>
          <span className="spinner" />
        </div>
      )}

      {/* ── Stats Tab ── */}
      {activeTab === 'stats' && stats && (
        <div>
          <h2
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: '1.75rem',
              color: 'var(--ivory)',
              marginBottom: '1.5rem',
              fontWeight: 300,
            }}
          >
            Tableau de bord
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1.25rem',
              marginBottom: '2rem',
            }}
          >
            {[
              { label: 'Bougies allumées', value: stats.candleCount, icon: '🕯️', color: '#fbbf24' },
              { label: 'Témoignages en attente', value: stats.pendingTributes, icon: '⏳', color: '#fbbf24' },
              { label: 'Témoignages approuvés', value: stats.approvedTributes, icon: '✅', color: '#34d399' },
              { label: 'Vues de pages', value: stats.totalViews, icon: '👁️', color: 'var(--gold)' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="memorial-card"
                style={{ padding: '1.5rem', textAlign: 'center' }}
              >
                <div style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>{stat.icon}</div>
                <p
                  style={{
                    fontFamily: 'Cormorant Garamond, serif',
                    fontSize: '2.5rem',
                    color: stat.color,
                    fontWeight: 300,
                    lineHeight: 1,
                    marginBottom: '0.375rem',
                  }}
                >
                  {stat.value}
                </p>
                <p
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '0.75rem',
                    color: 'var(--text-secondary)',
                    letterSpacing: '0.05em',
                  }}
                >
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Tributes Tab ── */}
      {activeTab === 'tributes' && (
        <div>
          <h2
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: '1.75rem',
              color: 'var(--ivory)',
              marginBottom: '1.5rem',
              fontWeight: 300,
            }}
          >
            Gestion des témoignages
          </h2>

          {tributes.length === 0 ? (
            <p style={{ fontFamily: 'Inter, sans-serif', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
              Aucun témoignage.
            </p>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table className="admin-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    <th>Nom</th>
                    <th>Relation</th>
                    <th>Message</th>
                    <th>Statut</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {tributes.map((t) => (
                    <tr key={t.id}>
                      <td style={{ color: 'var(--ivory)', fontFamily: 'Inter, sans-serif', fontSize: '0.875rem', whiteSpace: 'nowrap' }}>
                        {t.name}
                      </td>
                      <td>
                        <span className="relation-badge">{t.relation}</span>
                      </td>
                      <td style={{ maxWidth: '280px' }}>
                        <p
                          style={{
                            fontFamily: 'Inter, sans-serif',
                            fontSize: '0.8rem',
                            color: 'var(--text-secondary)',
                            overflow: 'hidden',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            lineHeight: 1.4,
                          }}
                        >
                          {t.message}
                        </p>
                      </td>
                      <td>
                        <span
                          className={`status-badge ${
                            t.status === 'PENDING'
                              ? 'status-pending'
                              : t.status === 'APPROVED'
                              ? 'status-approved'
                              : 'status-rejected'
                          }`}
                        >
                          {t.status === 'PENDING' ? 'En attente' : t.status === 'APPROVED' ? 'Approuvé' : 'Rejeté'}
                        </span>
                      </td>
                      <td
                        style={{
                          fontFamily: 'Inter, sans-serif',
                          fontSize: '0.75rem',
                          color: 'var(--text-secondary)',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {formatDate(t.createdAt)}
                      </td>
                      <td>
                        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'nowrap' }}>
                          {t.status === 'PENDING' && (
                            <>
                              <button
                                onClick={() => handleApproveTribute(t.id)}
                                style={{
                                  background: 'rgba(16,185,129,0.1)',
                                  border: '1px solid rgba(16,185,129,0.2)',
                                  color: '#34d399',
                                  padding: '0.3rem 0.6rem',
                                  borderRadius: '4px',
                                  fontSize: '0.7rem',
                                  cursor: 'pointer',
                                  fontFamily: 'Inter, sans-serif',
                                  whiteSpace: 'nowrap',
                                }}
                              >
                                Approuver
                              </button>
                              <button
                                onClick={() => handleRejectTribute(t.id)}
                                style={{
                                  background: 'rgba(245,158,11,0.1)',
                                  border: '1px solid rgba(245,158,11,0.2)',
                                  color: '#fbbf24',
                                  padding: '0.3rem 0.6rem',
                                  borderRadius: '4px',
                                  fontSize: '0.7rem',
                                  cursor: 'pointer',
                                  fontFamily: 'Inter, sans-serif',
                                  whiteSpace: 'nowrap',
                                }}
                              >
                                Rejeter
                              </button>
                            </>
                          )}
                          <button
                            onClick={() => handleDeleteTribute(t.id)}
                            style={{
                              background: 'rgba(239,68,68,0.1)',
                              border: '1px solid rgba(239,68,68,0.2)',
                              color: '#f87171',
                              padding: '0.3rem 0.6rem',
                              borderRadius: '4px',
                              fontSize: '0.7rem',
                              cursor: 'pointer',
                              fontFamily: 'Inter, sans-serif',
                            }}
                          >
                            Supprimer
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* ── Candles Tab ── */}
      {activeTab === 'candles' && (
        <div>
          <h2
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: '1.75rem',
              color: 'var(--ivory)',
              marginBottom: '1.5rem',
              fontWeight: 300,
            }}
          >
            Bougies allumées ({candles.length})
          </h2>

          {candles.length === 0 ? (
            <p style={{ fontFamily: 'Inter, sans-serif', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
              Aucune bougie.
            </p>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table className="admin-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    <th>Nom</th>
                    <th>Ville</th>
                    <th>Message</th>
                    <th>Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {candles.map((c) => (
                    <tr key={c.id}>
                      <td style={{ color: 'var(--ivory)', fontFamily: 'Inter, sans-serif', fontSize: '0.875rem', whiteSpace: 'nowrap' }}>
                        {c.name}
                      </td>
                      <td style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                        {c.city || '—'}
                      </td>
                      <td style={{ maxWidth: '240px' }}>
                        <p
                          style={{
                            fontFamily: 'Inter, sans-serif',
                            fontSize: '0.8rem',
                            color: 'var(--text-secondary)',
                            overflow: 'hidden',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                          }}
                        >
                          {c.message || '—'}
                        </p>
                      </td>
                      <td
                        style={{
                          fontFamily: 'Inter, sans-serif',
                          fontSize: '0.75rem',
                          color: 'var(--text-secondary)',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {formatDate(c.createdAt)}
                      </td>
                      <td>
                        <button
                          onClick={() => handleDeleteCandle(c.id)}
                          style={{
                            background: 'rgba(239,68,68,0.1)',
                            border: '1px solid rgba(239,68,68,0.2)',
                            color: '#f87171',
                            padding: '0.3rem 0.6rem',
                            borderRadius: '4px',
                            fontSize: '0.7rem',
                            cursor: 'pointer',
                            fontFamily: 'Inter, sans-serif',
                          }}
                        >
                          Supprimer
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* ── Gallery Tab ── */}
      {activeTab === 'gallery' && (
        <div>
          <h2
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: '1.75rem',
              color: 'var(--ivory)',
              marginBottom: '1.5rem',
              fontWeight: 300,
            }}
          >
            Galerie photos
          </h2>

          {/* Add image form */}
          <div className="memorial-card" style={{ padding: '1.75rem', marginBottom: '2rem' }}>
            <h3
              style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: '1.2rem',
                color: 'var(--gold)',
                marginBottom: '1.25rem',
              }}
            >
              Ajouter une image
            </h3>

            {gallerySuccess && (
              <div
                style={{
                  padding: '0.75rem 1rem',
                  borderRadius: '6px',
                  background: 'rgba(16,185,129,0.08)',
                  border: '1px solid rgba(16,185,129,0.2)',
                  color: '#34d399',
                  marginBottom: '1rem',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.875rem',
                }}
              >
                Image ajoutée avec succès.
              </div>
            )}

            {galleryError && (
              <div
                style={{
                  padding: '0.75rem 1rem',
                  borderRadius: '6px',
                  background: 'rgba(239,68,68,0.1)',
                  border: '1px solid rgba(239,68,68,0.2)',
                  color: '#f87171',
                  marginBottom: '1rem',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.875rem',
                }}
              >
                {galleryError}
              </div>
            )}

            {/* Mode toggle */}
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem' }}>
              {(['file', 'url'] as const).map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => { setUploadMode(mode); setUploadPreview(null); setSelectedFile(null) }}
                  style={{
                    padding: '0.4rem 1rem',
                    borderRadius: '4px',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '0.8rem',
                    cursor: 'pointer',
                    border: '1px solid',
                    borderColor: uploadMode === mode ? 'var(--gold)' : 'var(--border-subtle)',
                    background: uploadMode === mode ? 'rgba(201,169,110,0.1)' : 'transparent',
                    color: uploadMode === mode ? 'var(--gold)' : 'var(--text-secondary)',
                    transition: 'all 0.2s',
                  }}
                >
                  {mode === 'file' ? '📁 Depuis l\'ordinateur' : '🔗 Par URL'}
                </button>
              ))}
            </div>

            <form onSubmit={handleAddImage} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {uploadMode === 'file' ? (
                <div>
                  <label style={{ display: 'block', fontFamily: 'Inter, sans-serif', fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gold)', opacity: 0.8, marginBottom: '0.4rem' }}>
                    Choisir une image *
                  </label>
                  {/* Drop zone */}
                  <label
                    htmlFor="file-upload"
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.75rem',
                      padding: '2rem',
                      border: '2px dashed',
                      borderColor: selectedFile ? 'var(--gold)' : 'var(--border-subtle)',
                      borderRadius: '8px',
                      background: selectedFile ? 'rgba(201,169,110,0.04)' : 'rgba(255,255,255,0.02)',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                    }}
                  >
                    {uploadPreview ? (
                      <img
                        src={uploadPreview}
                        alt="Aperçu"
                        style={{ maxHeight: 180, maxWidth: '100%', borderRadius: '6px', objectFit: 'contain' }}
                      />
                    ) : (
                      <>
                        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1" opacity="0.5">
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                          <polyline points="17 8 12 3 7 8"/>
                          <line x1="12" y1="3" x2="12" y2="15"/>
                        </svg>
                        <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                          Cliquez ou glissez une photo ici
                        </span>
                        <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.7rem', color: 'var(--text-secondary)', opacity: 0.5 }}>
                          JPG, PNG, WebP, GIF — max 10 Mo
                        </span>
                      </>
                    )}
                    <input
                      id="file-upload"
                      type="file"
                      accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
                      onChange={handleFileChange}
                      style={{ display: 'none' }}
                    />
                  </label>
                  {selectedFile && (
                    <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.75rem', color: 'var(--gold)', opacity: 0.7, marginTop: '0.4rem' }}>
                      {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} Mo)
                    </p>
                  )}
                </div>
              ) : (
                <div>
                  <label style={{ display: 'block', fontFamily: 'Inter, sans-serif', fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gold)', opacity: 0.8, marginBottom: '0.4rem' }}>
                    URL de l&apos;image *
                  </label>
                  <input type="url" name="url" placeholder="https://..." required className="memorial-input" />
                </div>
              )}

              <div>
                <label style={{ display: 'block', fontFamily: 'Inter, sans-serif', fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gold)', opacity: 0.8, marginBottom: '0.4rem' }}>
                  Légende (optionnel)
                </label>
                <input type="text" name="caption" placeholder="Description de la photo…" className="memorial-input" />
              </div>
              <div>
                <label style={{ display: 'block', fontFamily: 'Inter, sans-serif', fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gold)', opacity: 0.8, marginBottom: '0.4rem' }}>
                  Ordre d&apos;affichage
                </label>
                <input type="number" name="order" defaultValue="0" min="0" className="memorial-input" style={{ maxWidth: '120px' }} />
              </div>
              <button
                type="submit"
                className="btn-gold"
                style={{ alignSelf: 'flex-start', opacity: uploading ? 0.6 : 1 }}
                disabled={uploading}
              >
                {uploading ? 'Envoi en cours…' : 'Ajouter l\'image'}
              </button>
            </form>
          </div>

          {/* Images list */}
          {images.length === 0 ? (
            <p style={{ fontFamily: 'Inter, sans-serif', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
              Aucune image dans la galerie.
            </p>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
              {images.map((img) => (
                <div key={img.id} className="memorial-card" style={{ padding: '1rem' }}>
                  <div
                    style={{
                      height: 120,
                      borderRadius: '6px',
                      overflow: 'hidden',
                      marginBottom: '0.75rem',
                      background: 'var(--bg-secondary)',
                    }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={img.url}
                      alt={img.caption || ''}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                  {img.caption && (
                    <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.75rem', lineHeight: 1.4 }}>
                      {img.caption}
                    </p>
                  )}
                  <button
                    onClick={() => handleDeleteImage(img.id)}
                    style={{
                      background: 'rgba(239,68,68,0.1)',
                      border: '1px solid rgba(239,68,68,0.2)',
                      color: '#f87171',
                      padding: '0.3rem 0.6rem',
                      borderRadius: '4px',
                      fontSize: '0.7rem',
                      cursor: 'pointer',
                      fontFamily: 'Inter, sans-serif',
                      width: '100%',
                    }}
                  >
                    Supprimer
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── Funeral Tab ── */}
      {activeTab === 'funeral' && (
        <div>
          <h2
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: '1.75rem',
              color: 'var(--ivory)',
              marginBottom: '1.5rem',
              fontWeight: 300,
            }}
          >
            Informations obsèques
          </h2>

          {funeralSuccess && (
            <div
              style={{
                padding: '0.875rem 1rem',
                borderRadius: '6px',
                background: 'rgba(16,185,129,0.08)',
                border: '1px solid rgba(16,185,129,0.2)',
                color: '#34d399',
                marginBottom: '1.5rem',
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.875rem',
              }}
            >
              Informations mises à jour avec succès.
            </div>
          )}

          {funeralError && (
            <div
              style={{
                padding: '0.875rem 1rem',
                borderRadius: '6px',
                background: 'rgba(239,68,68,0.1)',
                border: '1px solid rgba(239,68,68,0.2)',
                color: '#f87171',
                marginBottom: '1.5rem',
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.875rem',
              }}
            >
              {funeralError}
            </div>
          )}

          <form onSubmit={handleFuneralSubmit}>
            <div className="memorial-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem' }}>
                <div>
                  <label style={{ display: 'block', fontFamily: 'Inter, sans-serif', fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gold)', opacity: 0.8, marginBottom: '0.4rem' }}>
                    Date *
                  </label>
                  <input
                    type="text"
                    name="date"
                    defaultValue={funeralInfo?.date || ''}
                    placeholder="Vendredi 20 septembre 2026"
                    required
                    className="memorial-input"
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontFamily: 'Inter, sans-serif', fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gold)', opacity: 0.8, marginBottom: '0.4rem' }}>
                    Heure *
                  </label>
                  <input
                    type="text"
                    name="time"
                    defaultValue={funeralInfo?.time || ''}
                    placeholder="10h00"
                    required
                    className="memorial-input"
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontFamily: 'Inter, sans-serif', fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gold)', opacity: 0.8, marginBottom: '0.4rem' }}>
                  Lieu *
                </label>
                <input
                  type="text"
                  name="venue"
                  defaultValue={funeralInfo?.venue || ''}
                  placeholder="Cathédrale de Ziguinchor"
                  required
                  className="memorial-input"
                />
              </div>

              <div>
                <label style={{ display: 'block', fontFamily: 'Inter, sans-serif', fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gold)', opacity: 0.8, marginBottom: '0.4rem' }}>
                  Adresse *
                </label>
                <input
                  type="text"
                  name="address"
                  defaultValue={funeralInfo?.address || ''}
                  placeholder="Place de la Cathédrale, Ziguinchor, Sénégal"
                  required
                  className="memorial-input"
                />
              </div>

              <div>
                <label style={{ display: 'block', fontFamily: 'Inter, sans-serif', fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gold)', opacity: 0.8, marginBottom: '0.4rem' }}>
                  URL Google Maps (optionnel)
                </label>
                <input
                  type="url"
                  name="mapsUrl"
                  defaultValue={funeralInfo?.mapsUrl || ''}
                  placeholder="https://maps.google.com/embed?..."
                  className="memorial-input"
                />
              </div>

              <div>
                <label style={{ display: 'block', fontFamily: 'Inter, sans-serif', fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gold)', opacity: 0.8, marginBottom: '0.4rem' }}>
                  Programme de la cérémonie (optionnel)
                </label>
                <textarea
                  name="program"
                  defaultValue={funeralInfo?.program || ''}
                  placeholder={'10h00 - Accueil des familles\n10h30 - Cérémonie religieuse\n...'}
                  rows={8}
                  className="memorial-input"
                  style={{ resize: 'vertical', minHeight: '180px', fontFamily: 'monospace', fontSize: '0.875rem' }}
                />
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.7rem', color: 'var(--text-secondary)', opacity: 0.5, marginTop: '0.25rem' }}>
                  Format : &quot;10h00 - Description&quot; par ligne
                </p>
              </div>

              <button type="submit" className="btn-gold" style={{ alignSelf: 'flex-start' }}>
                Enregistrer les modifications
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}
