import { redirect } from 'next/navigation'
import { getSession } from '@/lib/auth'
import AdminLogoutButton from '@/components/AdminLogoutButton'

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getSession()

  if (!session) {
    redirect('/admin')
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--bg-primary)',
      }}
    >
      {/* Admin top bar */}
      <div
        style={{
          background: 'var(--bg-secondary)',
          borderBottom: '1px solid var(--border-subtle)',
          padding: '1rem 1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <p
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.65rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--text-secondary)',
              marginBottom: '0.2rem',
            }}
          >
            Administration
          </p>
          <p
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: '1.1rem',
              color: 'var(--gold)',
            }}
          >
            À la mémoire de Raymond
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.75rem',
              color: 'var(--text-secondary)',
            }}
          >
            Connecté en tant que <strong style={{ color: 'var(--ivory)' }}>{session.username}</strong>
          </span>

          <AdminLogoutButton />
        </div>
      </div>

      {children}
    </div>
  )
}
