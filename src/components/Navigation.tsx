'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const navLinks = [
  { href: '/', label: 'Accueil' },
  { href: '/allumer', label: 'Bougie' },
  { href: '/temoignages', label: 'Témoignages' },
  { href: '/bougies', label: 'Mur de bougies' },
  { href: '/galerie', label: 'Galerie' },
  { href: '/obseques', label: 'Obsèques' },
]

export default function Navigation() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav
      style={{
        background: 'rgba(10, 10, 15, 0.9)',
        borderBottom: '1px solid rgba(201, 169, 110, 0.12)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        position: 'sticky',
        top: 0,
        zIndex: 50,
      }}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo / Name */}
        <Link
          href="/"
          style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: '1rem',
            color: 'var(--gold)',
            letterSpacing: '0.06em',
            textDecoration: 'none',
            lineHeight: 1.3,
          }}
        >
          <span style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', display: 'block', letterSpacing: '0.15em', textTransform: 'uppercase', fontFamily: 'Inter, sans-serif', marginBottom: '2px' }}>
            À la mémoire de
          </span>
          Raymond MENDY
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="nav-link"
              style={
                pathname === link.href
                  ? { color: 'var(--gold)' }
                  : {}
              }
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--gold)', padding: '4px' }}
          aria-label="Menu"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <>
                <line x1="3" y1="7" x2="21" y2="7" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="17" x2="21" y2="17" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          style={{
            background: 'var(--bg-secondary)',
            borderTop: '1px solid var(--border-subtle)',
            padding: '1rem 1.5rem',
          }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                display: 'block',
                padding: '0.625rem 0',
                color: pathname === link.href ? 'var(--gold)' : 'var(--text-secondary)',
                textDecoration: 'none',
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.875rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                borderBottom: '1px solid var(--border-subtle)',
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  )
}
