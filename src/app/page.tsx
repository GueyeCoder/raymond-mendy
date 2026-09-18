import Link from 'next/link'
import Image from 'next/image'
import { getCandleCount } from '@/lib/actions'
import ParticleEffect from '@/components/ParticleEffect'
import CandleFlame from '@/components/CandleFlame'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const candleCount = await getCandleCount()

  return (
    <div style={{ minHeight: '100vh', overflowX: 'hidden' }}>
      {/* ── Hero Section ── */}
      <section
        style={{
          position: 'relative',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '4rem 1.5rem',
          textAlign: 'center',
          background: 'radial-gradient(ellipse at 50% 40%, rgba(13,13,26,1) 0%, rgba(10,10,15,1) 100%)',
          overflow: 'hidden',
        }}
      >
        {/* Background glow blobs */}
        <div
          className="hero-glow"
          style={{
            width: 500,
            height: 500,
            top: '5%',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'radial-gradient(circle, rgba(201,169,110,0.04) 0%, transparent 70%)',
          }}
        />
        <div
          className="hero-glow"
          style={{
            width: 300,
            height: 300,
            bottom: '10%',
            left: '10%',
            background: 'radial-gradient(circle, rgba(251,191,36,0.03) 0%, transparent 70%)',
          }}
        />

        {/* Particles */}
        <ParticleEffect count={16} />

        {/* Content wrapper */}
        <div style={{ position: 'relative', zIndex: 10, maxWidth: '720px', width: '100%' }}>
          {/* Eyebrow */}
          <p
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.7rem',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: 'var(--gold)',
              opacity: 0.8,
              marginBottom: '2.5rem',
              animation: 'fade-in 1s ease forwards',
            }}
          >
            En mémoire
          </p>

          {/* Photo */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginBottom: '2.5rem',
              animation: 'fade-in-up 0.9s ease forwards',
            }}
          >
            <div
              style={{
                width: 200,
                height: 200,
                borderRadius: '50%',
                overflow: 'hidden',
                border: '2px solid rgba(201, 169, 110, 0.4)',
                boxShadow: '0 0 40px rgba(201, 169, 110, 0.18), 0 0 80px rgba(201, 169, 110, 0.08)',
                position: 'relative',
                flexShrink: 0,
              }}
            >
              <Image
                src="/karen-cathy-coly.jpeg"
                alt="Commissaire Karen Atenance Cathy Coly"
                fill
                style={{ objectFit: 'cover', objectPosition: 'center top' }}
                priority
              />
            </div>
          </div>

          {/* Name */}
          <h1
            className="text-glow-gold"
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: 'clamp(2rem, 6vw, 3.5rem)',
              fontWeight: 300,
              color: 'var(--gold)',
              letterSpacing: '0.04em',
              marginBottom: '0.5rem',
              animation: 'fade-in-up 1s ease 0.2s forwards',
              opacity: 0,
            }}
          >
            Commissaire Karen Atenance Cathy Coly
          </h1>

          {/* Dates */}
          <p
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.8rem',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'var(--text-secondary)',
              marginBottom: '2.5rem',
              animation: 'fade-in-up 1s ease 0.35s forwards',
              opacity: 0,
            }}
          >
            10 octobre 1975, Ziguinchor &nbsp;—&nbsp; 14 septembre 2026, Dakar
          </p>

          {/* Gold divider */}
          <div
            className="gold-divider"
            style={{
              maxWidth: 200,
              margin: '0 auto 2rem',
              animation: 'fade-in 1s ease 0.45s forwards',
              opacity: 0,
            }}
          />

          {/* Main quote */}
          <blockquote
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontStyle: 'italic',
              fontSize: 'clamp(1.1rem, 2.5vw, 1.45rem)',
              color: 'var(--ivory-dim)',
              lineHeight: 1.65,
              maxWidth: '520px',
              margin: '0 auto 2rem',
              animation: 'fade-in-up 1s ease 0.5s forwards',
              opacity: 0,
            }}
          >
            &ldquo;Une vie, des souvenirs, une lumière qui demeure.&rdquo;
          </blockquote>

          <p
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontStyle: 'italic',
              fontSize: '1rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.7,
              maxWidth: '480px',
              margin: '0 auto 3rem',
              animation: 'fade-in-up 1s ease 0.6s forwards',
              opacity: 0,
            }}
          >
            Ceux que nous aimons restent à jamais vivants dans nos souvenirs,
            dans nos prières et dans nos cœurs.
          </p>

          {/* CTA Button */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1rem',
              marginBottom: '2rem',
              animation: 'fade-in-up 1s ease 0.7s forwards',
              opacity: 0,
            }}
          >
            <Link href="/allumer">
              <button className="btn-gold" style={{ fontSize: '1.15rem', padding: '1rem 2.5rem' }}>
                🕯️ Allumer une bougie
              </button>
            </Link>

            {/* Counter */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.5rem 1.25rem',
                border: '1px solid var(--border-subtle)',
                borderRadius: '24px',
                background: 'rgba(201,169,110,0.04)',
              }}
            >
              <CandleFlame size="sm" />
              <span
                style={{
                  fontFamily: 'Cormorant Garamond, serif',
                  fontSize: '1rem',
                  color: 'var(--ivory-dim)',
                }}
              >
                <strong style={{ color: 'var(--gold)' }}>{candleCount}</strong>{' '}
                bougie{candleCount !== 1 ? 's' : ''} allumée{candleCount !== 1 ? 's' : ''}
              </span>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          style={{
            position: 'absolute',
            bottom: '2rem',
            left: '50%',
            transform: 'translateX(-50%)',
            animation: 'fade-in 1s ease 1.2s forwards',
            opacity: 0,
          }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--gold)"
            strokeWidth="1"
            opacity="0.4"
            style={{ animation: 'pulse-glow 2s ease-in-out infinite' }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </section>

      {/* ── Navigation Cards ── */}
      <section
        style={{
          background: 'var(--bg-secondary)',
          padding: '5rem 1.5rem',
        }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="gold-divider mb-12" />
          <h2
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: 'clamp(1.6rem, 4vw, 2.4rem)',
              color: 'var(--ivory)',
              textAlign: 'center',
              marginBottom: '3rem',
              fontWeight: 300,
            }}
          >
            Espaces de mémoire
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {[
              {
                href: '/allumer',
                icon: '🕯️',
                title: 'Allumer une bougie',
                desc: 'Offrez une lumière en sa mémoire et laissez un message de recueillement.',
              },
              {
                href: '/temoignages',
                icon: '📖',
                title: 'Livre de témoignages',
                desc: 'Partagez vos souvenirs, vos mots et votre amour pour Karen.',
              },
              {
                href: '/bougies',
                icon: '✨',
                title: 'Mur de bougies',
                desc: `Découvrez les ${candleCount} lumières allumées par ceux qui lui étaient chers.`,
              },
              {
                href: '/galerie',
                icon: '🖼️',
                title: 'Galerie photos',
                desc: 'Les images qui immortalisent ses moments de vie et de joie.',
              },
              {
                href: '/obseques',
                icon: '🕊️',
                title: 'Informations obsèques',
                desc: 'Retrouvez toutes les informations sur la cérémonie funèbre.',
              },
            ].map((card) => (
              <Link key={card.href} href={card.href} style={{ textDecoration: 'none' }}>
                <div
                  className="memorial-card"
                  style={{
                    padding: '2rem',
                    cursor: 'pointer',
                    height: '100%',
                  }}
                >
                  <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>{card.icon}</div>
                  <h3
                    style={{
                      fontFamily: 'Cormorant Garamond, serif',
                      fontSize: '1.3rem',
                      color: 'var(--gold)',
                      marginBottom: '0.75rem',
                      fontWeight: 400,
                    }}
                  >
                    {card.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '0.875rem',
                      color: 'var(--text-secondary)',
                      lineHeight: 1.6,
                    }}
                  >
                    {card.desc}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          <div className="gold-divider mt-12" />
        </div>
      </section>
    </div>
  )
}
