import { getFuneralInfo } from '@/lib/actions'

export const dynamic = 'force-dynamic'

export default async function ObsequesPage() {
  const info = await getFuneralInfo()

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--bg-primary)',
        padding: '4rem 1.5rem',
      }}
    >
      <div className="max-w-3xl mx-auto">
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
            Cérémonie funèbre
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
            Informations obsèques
          </h1>
          <p
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontStyle: 'italic',
              fontSize: '1.05rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.65,
            }}
          >
            Raymond MENDY
          </p>
        </div>

        <div className="gold-divider mb-10" />

        {info ? (
          <>
            {/* Main info card */}
            <div
              className="memorial-card"
              style={{ padding: '2.5rem', marginBottom: '2rem' }}
            >
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                  gap: '2rem',
                }}
              >
                {/* Date */}
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      border: '1px solid var(--border-gold)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.5">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                  </div>
                  <div>
                    <p
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '0.65rem',
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase',
                        color: 'var(--gold)',
                        opacity: 0.7,
                        marginBottom: '0.3rem',
                      }}
                    >
                      Date
                    </p>
                    <p
                      style={{
                        fontFamily: 'Cormorant Garamond, serif',
                        fontSize: '1.1rem',
                        color: 'var(--ivory)',
                        lineHeight: 1.3,
                      }}
                    >
                      {info.date}
                    </p>
                  </div>
                </div>

                {/* Time */}
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      border: '1px solid var(--border-gold)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.5">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                  </div>
                  <div>
                    <p
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '0.65rem',
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase',
                        color: 'var(--gold)',
                        opacity: 0.7,
                        marginBottom: '0.3rem',
                      }}
                    >
                      Heure
                    </p>
                    <p
                      style={{
                        fontFamily: 'Cormorant Garamond, serif',
                        fontSize: '1.1rem',
                        color: 'var(--ivory)',
                      }}
                    >
                      {info.time}
                    </p>
                  </div>
                </div>

                {/* Venue */}
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      border: '1px solid var(--border-gold)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.5">
                      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                      <polyline points="9 22 9 12 15 12 15 22" />
                    </svg>
                  </div>
                  <div>
                    <p
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '0.65rem',
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase',
                        color: 'var(--gold)',
                        opacity: 0.7,
                        marginBottom: '0.3rem',
                      }}
                    >
                      Lieu
                    </p>
                    <p
                      style={{
                        fontFamily: 'Cormorant Garamond, serif',
                        fontSize: '1.1rem',
                        color: 'var(--ivory)',
                        lineHeight: 1.3,
                      }}
                    >
                      {info.venue}
                    </p>
                  </div>
                </div>

                {/* Address */}
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      border: '1px solid var(--border-gold)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.5">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </div>
                  <div>
                    <p
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '0.65rem',
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase',
                        color: 'var(--gold)',
                        opacity: 0.7,
                        marginBottom: '0.3rem',
                      }}
                    >
                      Adresse
                    </p>
                    <p
                      style={{
                        fontFamily: 'Cormorant Garamond, serif',
                        fontSize: '1.1rem',
                        color: 'var(--ivory)',
                        lineHeight: 1.4,
                      }}
                    >
                      {info.address}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Maps embed */}
            {info.mapsUrl ? (
              <div
                className="memorial-card"
                style={{ marginBottom: '2rem', overflow: 'hidden', padding: 0 }}
              >
                <iframe
                  src={info.mapsUrl}
                  width="100%"
                  height="300"
                  style={{ border: 0, display: 'block' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Localisation de la cérémonie"
                />
              </div>
            ) : (
              <div
                className="memorial-card"
                style={{
                  marginBottom: '2rem',
                  height: 200,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  gap: '0.75rem',
                }}
              >
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1" opacity="0.4">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <p
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '0.8rem',
                    color: 'var(--text-secondary)',
                    opacity: 0.5,
                  }}
                >
                  Carte Google Maps — à configurer via l&apos;administration
                </p>
              </div>
            )}

            {/* Program */}
            {info.program && (
              <div className="memorial-card" style={{ padding: '2rem' }}>
                <h2
                  style={{
                    fontFamily: 'Cormorant Garamond, serif',
                    fontSize: '1.5rem',
                    color: 'var(--gold)',
                    fontWeight: 400,
                    marginBottom: '1.5rem',
                    textAlign: 'center',
                  }}
                >
                  Programme de la cérémonie
                </h2>

                <div className="gold-divider mb-6" />

                <div>
                  {info.program.split('\n').map((line, i) => {
                    const trimmed = line.trim()
                    if (!trimmed) return <div key={i} style={{ height: '0.5rem' }} />
                    const match = trimmed.match(/^(\d{1,2}[h:]\d{0,2})\s*-?\s*(.+)$/)
                    if (match) {
                      return (
                        <div
                          key={i}
                          style={{
                            display: 'flex',
                            gap: '1.5rem',
                            alignItems: 'flex-start',
                            padding: '0.875rem 0',
                            borderBottom: '1px solid rgba(201,169,110,0.08)',
                          }}
                        >
                          <span
                            style={{
                              fontFamily: 'Cormorant Garamond, serif',
                              fontSize: '1rem',
                              color: 'var(--gold)',
                              minWidth: '70px',
                              fontWeight: 500,
                              flexShrink: 0,
                            }}
                          >
                            {match[1]}
                          </span>
                          <span
                            style={{
                              fontFamily: 'Inter, sans-serif',
                              fontSize: '0.9rem',
                              color: 'var(--ivory-dim)',
                              lineHeight: 1.5,
                            }}
                          >
                            {match[2]}
                          </span>
                        </div>
                      )
                    }
                    return (
                      <p
                        key={i}
                        style={{
                          fontFamily: 'Inter, sans-serif',
                          fontSize: '0.9rem',
                          color: 'var(--text-secondary)',
                          lineHeight: 1.6,
                          padding: '0.25rem 0',
                        }}
                      >
                        {trimmed}
                      </p>
                    )
                  })}
                </div>
              </div>
            )}
          </>
        ) : (
          <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
            <p
              style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontStyle: 'italic',
                fontSize: '1.15rem',
                color: 'var(--text-secondary)',
              }}
            >
              Les informations sur les obsèques seront communiquées prochainement.
            </p>
          </div>
        )}

        {/* Message de condoléances */}
        <div
          style={{
            marginTop: '3rem',
            padding: '2rem',
            borderRadius: '8px',
            background: 'rgba(201,169,110,0.04)',
            border: '1px solid var(--border-subtle)',
            textAlign: 'center',
          }}
        >
          <p
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontStyle: 'italic',
              fontSize: '1.1rem',
              color: 'var(--ivory-dim)',
              lineHeight: 1.65,
              marginBottom: '1rem',
            }}
          >
            &ldquo;Ceux que nous aimons restent à jamais vivants dans nos souvenirs,
            dans nos prières et dans nos cœurs.&rdquo;
          </p>
          <p
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.75rem',
              color: 'var(--text-secondary)',
              opacity: 0.5,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}
          >
            La famille Mendy
          </p>
        </div>
      </div>
    </div>
  )
}
