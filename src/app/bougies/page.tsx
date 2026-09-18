'use client'

import { useState, useEffect, useTransition, useCallback } from 'react'
import { getCandles } from '@/lib/actions'
import CandleCard from '@/components/CandleCard'
import Link from 'next/link'

type Candle = {
  id: string
  name: string
  city: string | null
  message: string | null
  createdAt: Date
}

export default function BougiesPage() {
  const [candles, setCandles] = useState<Candle[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [, startTransition] = useTransition()

  // Debounce search
  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search), 400)
    return () => clearTimeout(t)
  }, [search])

  const fetchCandles = useCallback(() => {
    setLoading(true)
    startTransition(() => {
      getCandles(debouncedSearch || undefined)
        .then((data) =>
          setCandles(
            data.map((c) => ({
              id: c.id,
              name: c.name,
              city: c.city,
              message: c.message,
              createdAt: c.createdAt,
            }))
          )
        )
        .finally(() => setLoading(false))
    })
  }, [debouncedSearch])

  useEffect(() => {
    fetchCandles()
  }, [fetchCandles])

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'radial-gradient(ellipse at 50% 0%, rgba(13,13,26,0.9) 0%, var(--bg-primary) 50%)',
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
            Recueillement
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
            Mur de bougies
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
            Chaque flamme est un amour, une pensée, un souvenir offert à Raymond.
          </p>
        </div>

        <div className="gold-divider mb-8" />

        {/* Stats + CTA */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1rem',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '2rem',
          }}
        >
          <p
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: '1.1rem',
              color: 'var(--ivory-dim)',
            }}
          >
            <strong style={{ color: 'var(--gold)' }}>{candles.length}</strong>{' '}
            bougie{candles.length !== 1 ? 's' : ''} allumée{candles.length !== 1 ? 's' : ''}
            {debouncedSearch ? ` pour "${debouncedSearch}"` : ''}
          </p>

          <Link href="/allumer">
            <button className="btn-gold" style={{ fontSize: '0.95rem', padding: '0.7rem 1.5rem' }}>
              🕯️ Allumer une bougie
            </button>
          </Link>
        </div>

        {/* Search */}
        <div style={{ maxWidth: '400px', marginBottom: '2.5rem' }}>
          <input
            type="text"
            placeholder="Rechercher par nom…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="memorial-input"
            style={{ paddingLeft: '2.75rem' }}
          />
          <div
            style={{
              position: 'relative',
              marginTop: '-2.35rem',
              marginLeft: '0.875rem',
              width: 'fit-content',
              pointerEvents: 'none',
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--gold)"
              strokeWidth="1.5"
              opacity="0.5"
            >
              <circle cx="11" cy="11" r="8" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35" />
            </svg>
          </div>
        </div>

        {/* Candle Grid */}
        {loading ? (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
              gap: '1rem',
            }}
          >
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="shimmer"
                style={{ height: 200, borderRadius: '8px', border: '1px solid var(--border-subtle)' }}
              />
            ))}
          </div>
        ) : candles.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '6rem 2rem' }}>
            {debouncedSearch ? (
              <>
                <p
                  style={{
                    fontFamily: 'Cormorant Garamond, serif',
                    fontStyle: 'italic',
                    fontSize: '1.15rem',
                    color: 'var(--text-secondary)',
                    marginBottom: '1rem',
                  }}
                >
                  Aucune bougie trouvée pour &ldquo;{debouncedSearch}&rdquo;.
                </p>
                <button
                  onClick={() => setSearch('')}
                  className="btn-outline-gold"
                  style={{ fontSize: '0.875rem' }}
                >
                  Effacer la recherche
                </button>
              </>
            ) : (
              <>
                <p
                  style={{
                    fontFamily: 'Cormorant Garamond, serif',
                    fontStyle: 'italic',
                    fontSize: '1.3rem',
                    color: 'var(--text-secondary)',
                    marginBottom: '0.75rem',
                  }}
                >
                  Aucune bougie n&apos;a encore été allumée.
                </p>
                <p
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '0.875rem',
                    color: 'var(--text-secondary)',
                    opacity: 0.6,
                    marginBottom: '2rem',
                  }}
                >
                  Soyez la première personne à offrir une flamme à Raymond.
                </p>
                <Link href="/allumer">
                  <button className="btn-gold">🕯️ Allumer la première bougie</button>
                </Link>
              </>
            )}
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
              gap: '1rem',
            }}
          >
            {candles.map((candle, i) => (
              <CandleCard
                key={candle.id}
                name={candle.name}
                city={candle.city}
                message={candle.message}
                createdAt={candle.createdAt}
                index={i}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
