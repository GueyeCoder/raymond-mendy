'use client'

import Link from 'next/link'

export default function Footer() {
  return (
    <footer
      style={{
        background: 'var(--bg-secondary)',
        borderTop: '1px solid var(--border-subtle)',
        padding: '3rem 1.5rem 2rem',
        marginTop: 'auto',
      }}
    >
      <div className="max-w-4xl mx-auto text-center">
        {/* Gold divider */}
        <div className="gold-divider mb-8" />

        {/* Name */}
        <p
          style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: '1.5rem',
            color: 'var(--gold)',
            marginBottom: '0.5rem',
            letterSpacing: '0.04em',
          }}
        >
          Raymond MENDY
        </p>

        {/* Dates */}
        <p
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.8rem',
            color: 'var(--text-secondary)',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            marginBottom: '1.5rem',
          }}
        >
          10 octobre 1975 — 14 septembre 2026
        </p>

        {/* Quote */}
        <p
          className="memorial-quote"
          style={{
            fontSize: '1rem',
            maxWidth: '480px',
            margin: '0 auto 2rem',
          }}
        >
          &ldquo;Une vie, des souvenirs, une lumière qui demeure.&rdquo;
        </p>

        {/* Links */}
        <div
          style={{
            display: 'flex',
            gap: '1.5rem',
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginBottom: '2rem',
          }}
        >
          {[
            { href: '/', label: 'Accueil' },
            { href: '/allumer', label: 'Allumer une bougie' },
            { href: '/temoignages', label: 'Témoignages' },
            { href: '/bougies', label: 'Mur de bougies' },
            { href: '/galerie', label: 'Galerie' },
            { href: '/obseques', label: 'Obsèques' },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.75rem',
                color: 'var(--text-secondary)',
                textDecoration: 'none',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--gold)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="gold-divider mb-6" />

        <p
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.7rem',
            color: 'var(--text-secondary)',
            opacity: 0.6,
          }}
        >
          Site mémoriel dédié à la mémoire de Raymond MENDY.
          <br />
          Créé avec amour et respect par sa famille et ses proches.
        </p>
      </div>
    </footer>
  )
}
