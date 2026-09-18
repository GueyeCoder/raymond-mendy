'use client'

import { useState, useTransition } from 'react'
import { submitTribute, getApprovedTributes } from '@/lib/actions'
import TributeCard from '@/components/TributeCard'
import { useEffect } from 'react'

const RELATIONS = ['Famille', 'Ami(e)', 'Collègue', 'Promotion', 'Connaissance']

type Tribute = {
  id: string
  name: string
  relation: string
  message: string
  createdAt: Date
}

export default function TemoignagesPage() {
  const [isPending, startTransition] = useTransition()
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [tributes, setTributes] = useState<Tribute[]>([])
  const [loadingTributes, setLoadingTributes] = useState(true)

  useEffect(() => {
    getApprovedTributes()
      .then((data) =>
        setTributes(
          data.map((t) => ({
            id: t.id,
            name: t.name,
            relation: t.relation,
            message: t.message,
            createdAt: t.createdAt,
          }))
        )
      )
      .finally(() => setLoadingTributes(false))
  }, [submitted])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)

    const form = e.currentTarget
    const formData = new FormData(form)

    startTransition(async () => {
      const result = await submitTribute(formData)
      if (result?.error) {
        setError(result.error)
      } else {
        setSubmitted(true)
        form.reset()
        setTimeout(() => setSubmitted(false), 6000)
      }
    })
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--bg-primary)',
        padding: '4rem 1.5rem',
      }}
    >
      <div className="max-w-4xl mx-auto">
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
            Livre d&apos;or
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
            Témoignages
          </h1>
          <p
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontStyle: 'italic',
              fontSize: '1.05rem',
              color: 'var(--text-secondary)',
              maxWidth: '480px',
              margin: '0 auto',
              lineHeight: 1.65,
            }}
          >
            Partagez vos souvenirs, vos pensées et vos témoignages d&apos;amour
            pour Raymond MENDY.
          </p>
        </div>

        <div className="gold-divider mb-10" />

        {/* Form */}
        <div className="max-w-xl mx-auto mb-16">
          <h2
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: '1.6rem',
              color: 'var(--gold)',
              fontWeight: 400,
              marginBottom: '1.5rem',
              textAlign: 'center',
            }}
          >
            Laisser un témoignage
          </h2>

          {submitted && (
            <div
              style={{
                padding: '1rem 1.25rem',
                borderRadius: '8px',
                background: 'rgba(16,185,129,0.08)',
                border: '1px solid rgba(16,185,129,0.2)',
                marginBottom: '1.5rem',
                textAlign: 'center',
              }}
            >
              <p
                style={{
                  fontFamily: 'Cormorant Garamond, serif',
                  fontSize: '1.05rem',
                  color: '#34d399',
                  marginBottom: '0.25rem',
                }}
              >
                Votre témoignage a été soumis avec succès.
              </p>
              <p
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.8rem',
                  color: 'var(--text-secondary)',
                  opacity: 0.7,
                }}
              >
                Il sera visible après validation par l&apos;administrateur.
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div
              className="memorial-card"
              style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
            >
              {/* Name */}
              <div>
                <label
                  style={{
                    display: 'block',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '0.75rem',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: 'var(--gold)',
                    marginBottom: '0.5rem',
                    opacity: 0.85,
                  }}
                >
                  Votre nom <span style={{ color: '#f87171' }}>*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Prénom et nom"
                  maxLength={100}
                  required
                  className="memorial-input"
                />
              </div>

              {/* Relation */}
              <div>
                <label
                  style={{
                    display: 'block',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '0.75rem',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: 'var(--gold)',
                    marginBottom: '0.5rem',
                    opacity: 0.85,
                  }}
                >
                  Lien avec Raymond <span style={{ color: '#f87171' }}>*</span>
                </label>
                <select name="relation" required className="memorial-select">
                  <option value="">— Choisir —</option>
                  {RELATIONS.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>

              {/* Message */}
              <div>
                <label
                  style={{
                    display: 'block',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '0.75rem',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: 'var(--gold)',
                    marginBottom: '0.5rem',
                    opacity: 0.85,
                  }}
                >
                  Votre témoignage <span style={{ color: '#f87171' }}>*</span>
                </label>
                <textarea
                  name="message"
                  placeholder="Partagez vos souvenirs, vos mots d'amour, vos pensées pour Raymond…"
                  maxLength={2000}
                  rows={6}
                  required
                  className="memorial-input"
                  style={{ resize: 'vertical', minHeight: '140px' }}
                />
                <p
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '0.7rem',
                    color: 'var(--text-secondary)',
                    opacity: 0.5,
                    marginTop: '0.375rem',
                    textAlign: 'right',
                  }}
                >
                  Max. 2000 caractères
                </p>
              </div>

              {/* Error */}
              {error && (
                <div
                  style={{
                    padding: '0.75rem 1rem',
                    borderRadius: '6px',
                    background: 'rgba(239,68,68,0.1)',
                    border: '1px solid rgba(239,68,68,0.2)',
                    color: '#f87171',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '0.875rem',
                  }}
                >
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isPending}
                className="btn-gold"
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                }}
              >
                {isPending ? (
                  <>
                    <span className="spinner" />
                    Envoi en cours…
                  </>
                ) : (
                  'Soumettre mon témoignage'
                )}
              </button>

              <p
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.7rem',
                  color: 'var(--text-secondary)',
                  opacity: 0.5,
                  textAlign: 'center',
                  lineHeight: 1.5,
                }}
              >
                Votre témoignage sera relu par notre équipe avant publication.
              </p>
            </div>
          </form>
        </div>

        <div className="gold-divider mb-10" />

        {/* Tributes list */}
        <h2
          style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: '1.8rem',
            color: 'var(--ivory)',
            fontWeight: 300,
            textAlign: 'center',
            marginBottom: '2.5rem',
          }}
        >
          Témoignages partagés
        </h2>

        {loadingTributes ? (
          <div style={{ textAlign: 'center', padding: '3rem' }}>
            <span className="spinner" />
          </div>
        ) : tributes.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
            <p
              style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontStyle: 'italic',
                fontSize: '1.15rem',
                color: 'var(--text-secondary)',
              }}
            >
              Les premiers témoignages apparaîtront ici après validation.
            </p>
            <p
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.8rem',
                color: 'var(--text-secondary)',
                opacity: 0.5,
                marginTop: '0.75rem',
              }}
            >
              Soyez le premier à partager votre souvenir.
            </p>
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {tributes.map((tribute, i) => (
              <TributeCard
                key={tribute.id}
                name={tribute.name}
                relation={tribute.relation}
                message={tribute.message}
                createdAt={tribute.createdAt}
                index={i}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
