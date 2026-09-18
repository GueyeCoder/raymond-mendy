'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { getGalleryImages } from '@/lib/actions'

type GalleryImage = {
  id: string
  url: string
  caption: string | null
  order: number
}

export default function GaleriePage() {
  const [images, setImages] = useState<GalleryImage[]>([])
  const [loading, setLoading] = useState(true)
  const [lightbox, setLightbox] = useState<GalleryImage | null>(null)

  useEffect(() => {
    getGalleryImages()
      .then((data) =>
        setImages(
          data.map((img) => ({
            id: img.id,
            url: img.url,
            caption: img.caption,
            order: img.order,
          }))
        )
      )
      .finally(() => setLoading(false))
  }, [])

  // Close lightbox on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightbox(null)
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--bg-primary)',
        padding: '4rem 1.5rem',
      }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <p
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.7rem',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: 'var(--gold)',
              opacity: 0.7,
              marginBottom: '1rem',
            }}
          >
            Souvenirs
          </p>
          <h1
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              color: 'var(--ivory)',
              fontWeight: 300,
              marginBottom: '1rem',
            }}
          >
            Galerie photos
          </h1>
          <p
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontStyle: 'italic',
              fontSize: '1.05rem',
              color: 'var(--text-secondary)',
              maxWidth: '440px',
              margin: '0 auto',
              lineHeight: 1.65,
            }}
          >
            Les images qui immortalisent la vie, les sourires et la lumière de Raymond.
          </p>
        </div>

        <div className="gold-divider mb-10" />

        {/* Grid */}
        {loading ? (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
              gap: '1rem',
            }}
          >
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="shimmer"
                style={{ height: 240, borderRadius: '8px', border: '1px solid var(--border-subtle)' }}
              />
            ))}
          </div>
        ) : images.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '6rem 2rem' }}>
            {/* Photo placeholder grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                gap: '1rem',
                maxWidth: '700px',
                margin: '0 auto 3rem',
                opacity: 0.35,
              }}
            >
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  style={{
                    height: 200,
                    borderRadius: '8px',
                    border: '1px solid var(--border-subtle)',
                    background: 'var(--bg-card)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    gap: '0.5rem',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'Cormorant Garamond, serif',
                      fontSize: '2rem',
                      color: 'var(--gold)',
                      opacity: 0.4,
                    }}
                  >
                    KA
                  </span>
                </div>
              ))}
            </div>

            <p
              style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontStyle: 'italic',
                fontSize: '1.15rem',
                color: 'var(--text-secondary)',
                marginBottom: '0.75rem',
              }}
            >
              Les photos seront ajoutées prochainement.
            </p>
            <p
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.8rem',
                color: 'var(--text-secondary)',
                opacity: 0.5,
              }}
            >
              La galerie sera mise à jour par la famille.
            </p>
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
              gap: '1rem',
            }}
          >
            {images.map((img, i) => (
              <div
                key={img.id}
                onClick={() => setLightbox(img)}
                style={{
                  cursor: 'pointer',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  border: '1px solid var(--border-subtle)',
                  background: 'var(--bg-card)',
                  position: 'relative',
                  animation: `fade-in-up 0.6s ease ${i * 0.06}s forwards`,
                  opacity: 0,
                  transition: 'border-color 0.2s ease, transform 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border-gold)'
                  e.currentTarget.style.transform = 'scale(1.02)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border-subtle)'
                  e.currentTarget.style.transform = 'scale(1)'
                }}
              >
                <div style={{ position: 'relative', aspectRatio: '4/3' }}>
                  <Image
                    src={img.url}
                    alt={img.caption || 'Photo de Raymond'}
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>

                {img.caption && (
                  <div
                    style={{
                      padding: '0.75rem 1rem',
                      background: 'var(--bg-card)',
                    }}
                  >
                    <p
                      style={{
                        fontFamily: 'Cormorant Garamond, serif',
                        fontStyle: 'italic',
                        fontSize: '0.9rem',
                        color: 'var(--text-secondary)',
                        lineHeight: 1.4,
                      }}
                    >
                      {img.caption}
                    </p>
                  </div>
                )}

                {/* Hover overlay */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'rgba(201,169,110,0.06)',
                    opacity: 0,
                    transition: 'opacity 0.2s',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = '0')}
                >
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="var(--gold)"
                    strokeWidth="1.5"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="lightbox-overlay"
          onClick={() => setLightbox(null)}
        >
          <div
            style={{
              maxWidth: '90vw',
              maxHeight: '90vh',
              position: 'relative',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setLightbox(null)}
              style={{
                position: 'absolute',
                top: '-2.5rem',
                right: 0,
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--ivory)',
                opacity: 0.7,
                padding: '0.5rem',
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div
              style={{
                borderRadius: '8px',
                overflow: 'hidden',
                border: '1px solid var(--border-gold)',
                position: 'relative',
                maxHeight: '80vh',
              }}
            >
              <Image
                src={lightbox.url}
                alt={lightbox.caption || 'Photo de Raymond'}
                width={1200}
                height={800}
                style={{
                  objectFit: 'contain',
                  maxHeight: '75vh',
                  maxWidth: '85vw',
                  display: 'block',
                }}
              />
            </div>

            {lightbox.caption && (
              <p
                style={{
                  textAlign: 'center',
                  fontFamily: 'Cormorant Garamond, serif',
                  fontStyle: 'italic',
                  fontSize: '1rem',
                  color: 'var(--ivory-dim)',
                  marginTop: '1rem',
                }}
              >
                {lightbox.caption}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
