'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLoginPage() {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)

    const formData = new FormData(e.currentTarget)
    const username = formData.get('username') as string
    const password = formData.get('password') as string

    startTransition(async () => {
      try {
        const res = await fetch('/api/admin/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password }),
        })

        const data = await res.json()

        if (data.success) {
          router.push('/admin/dashboard')
          router.refresh()
        } else {
          setError(data.error || 'Identifiants incorrects.')
        }
      } catch {
        setError('Une erreur de connexion est survenue.')
      }
    })
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        background: 'radial-gradient(ellipse at 50% 40%, rgba(13,13,26,0.8) 0%, var(--bg-primary) 70%)',
      }}
    >
      <div style={{ width: '100%', maxWidth: '380px' }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <p
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.65rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--text-secondary)',
              marginBottom: '0.5rem',
            }}
          >
            Administration
          </p>
          <h1
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: '1.75rem',
              color: 'var(--gold)',
              fontWeight: 300,
            }}
          >
            À la mémoire de Raymond
          </h1>
        </div>

        <div
          className="memorial-card"
          style={{ padding: '2.5rem' }}
        >
          <h2
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: '1.3rem',
              color: 'var(--ivory)',
              fontWeight: 400,
              marginBottom: '1.75rem',
              textAlign: 'center',
            }}
          >
            Connexion
          </h2>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {/* Username */}
            <div>
              <label
                style={{
                  display: 'block',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.7rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'var(--gold)',
                  opacity: 0.8,
                  marginBottom: '0.5rem',
                }}
              >
                Identifiant
              </label>
              <input
                type="text"
                name="username"
                placeholder="admin"
                required
                autoComplete="username"
                className="memorial-input"
              />
            </div>

            {/* Password */}
            <div>
              <label
                style={{
                  display: 'block',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.7rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'var(--gold)',
                  opacity: 0.8,
                  marginBottom: '0.5rem',
                }}
              >
                Mot de passe
              </label>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                required
                autoComplete="current-password"
                className="memorial-input"
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
                  textAlign: 'center',
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
                marginTop: '0.5rem',
              }}
            >
              {isPending ? (
                <>
                  <span className="spinner" />
                  Connexion…
                </>
              ) : (
                'Se connecter'
              )}
            </button>
          </form>
        </div>

        <p
          style={{
            textAlign: 'center',
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.7rem',
            color: 'var(--text-secondary)',
            opacity: 0.4,
            marginTop: '1.5rem',
          }}
        >
          Accès réservé aux administrateurs du site mémoriel.
        </p>
      </div>
    </div>
  )
}
