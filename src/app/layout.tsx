import type { Metadata } from 'next'
import './globals.css'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'À la mémoire de Raymond Mendy',
  description:
    'Site mémoriel dédié à Raymond Mendy (10 octobre 1975,  Ziguinchor – 14 septembre 2026, Dakar). Allumez une bougie, partagez vos souvenirs.',
  openGraph: {
    title: 'À la mémoire de Raymond MENDY',
    description: 'Une vie, des souvenirs, une lumière qui demeure.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className="bg-night text-ivory min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
