'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { lightCandle } from '@/lib/actions'
import CandleFlame from '@/components/CandleFlame'

export default function AllumerPage() {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [submittedName, setSubmittedName] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)

    const formData = new FormData(e.currentTarget)
    const name = (formData.get('name') as string)?.trim() || 'Anonyme'
    setSubmittedName(name)

    startTransition(async () => {
      const result = await lightCandle(formData)
      if (result?.error) {
        setError(result.error)
      } else {
        setSuccess(true)
        setTimeout(() => {
          router.push('/bougies')
        }, 3500)
      }
    })
  }

  if (success) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
          textAlign: 'center',
          background: 'radial-gradient(ellipse at 50% 30%, rgba(13,13,26,1) 0%, rgba(10,10,15,1) 100%)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Glow */}
        <div
          style={{
            position: 'absolute',
            top: '30%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            height: 400,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(251,191,36,0.1) 0%, transparent 65%)',
            pointerEvents: 'none',
          }}
        />

        <div style={{ position: 'relative', zIndex: 10 }}>
          {/* Large candle */}
          <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'center' }}>
            <CandleFlame size="xl" />
          </div>

          <h1
            className="text-glow-gold"
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: 'clamp(1.8rem, 5vw, 3rem)',
              color: 'var(--gold)',
              marginBottom: '1rem',
              fontWeight: 300,
              animation: 'fade-in-up 0.8s ease forwards',
            }}
          >
            Votre bougie est allumée
          </h1>

          <p
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontStyle: 'italic',
              fontSize: '1.15rem',
              color: 'var(--ivory-dim)',
              maxWidth: '400px',
              margin: '0 auto 1.5rem',
              lineHeight: 1.65,
              animation: 'fade-in-up 0.8s ease 0.2s forwards',
              opacity: 0,
            }}
          >
            Merci, {submittedName}. Votre lumière rejoint celles de tous ceux qui
            gardent Raymond dans leur cœur.
          </p>

          <p
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.8rem',
              color: 'var(--text-secondary)',
              letterSpacing: '0.08em',
              animation: 'fade-in 0.8s ease 0.6s forwards',
              opacity: 0,
            }}
          >
            Redirection vers le mur de bougies…
          </p>
        </div>
      </div>
    )
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'radial-gradient(ellipse at 50% 0%, rgba(13,13,26,0.8) 0%, var(--bg-primary) 60%)',
        padding: '4rem 1.5rem',
      }}
    >
      <div className="max-w-xl mx-auto">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
            <CandleFlame size="lg" />
          </div>

          <h1
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              color: 'var(--gold)',
              fontWeight: 300,
              marginBottom: '0.75rem',
            }}
          >
            Allumer une bougie
          </h1>

          <p
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontStyle: 'italic',
              fontSize: '1.05rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.65,
              maxWidth: '400px',
              margin: '0 auto',
            }}
          >
            Offrez une flamme de lumière en mémoire de Raymond MENDY.
          </p>
        </div>

        <div className="gold-divider mb-8" />

        {/* Form */}
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
                Votre nom <span style={{ opacity: 0.5 }}>(optionnel)</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="Anonyme"
                maxLength={100}
                className="memorial-input"
              />
            </div>

            {/* City */}
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
                Votre ville <span style={{ opacity: 0.5 }}>(optionnel)</span>
              </label>
              <input
                type="text"
                name="city"
                placeholder="Dakar, Ziguinchor, Paris…"
                maxLength={100}
                className="memorial-input"
              />
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
                Un mot, une pensée <span style={{ opacity: 0.5 }}>(optionnel)</span>
              </label>
              <textarea
                name="message"
                placeholder="Partagez une pensée, une prière, un souvenir…"
                maxLength={500}
                rows={4}
                className="memorial-input"
                style={{ resize: 'vertical', minHeight: '100px' }}
              />
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

            {/* Submit */}
            <button
              type="submit"
              disabled={isPending}
              className="btn-gold"
              style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
            >
              {isPending ? (
                <>
                  <span className="spinner" />
                  Allumage en cours…
                </>
              ) : (
                '🕯️ Allumer ma bougie'
              )}
            </button>
          </div>
        </form>

        {/* Note */}
        <p
          style={{
            textAlign: 'center',
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.75rem',
            color: 'var(--text-secondary)',
            opacity: 0.6,
            marginTop: '1.5rem',
            lineHeight: 1.6,
          }}
        >
          Votre bougie sera visible sur le mur des bougies et restera allumée à jamais
          en mémoire de Raymond.
        </p>
      </div>
    </div>
  )
}
