import type { Metadata } from 'next'
import { Bricolage_Grotesque, Literata } from 'next/font/google'
import Entete from '@/components/Entete'
import PiedDePage from '@/components/PiedDePage'
import Curseur from '@/components/Curseur'
import './globals.css'

const titre = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--police-titre',
  display: 'swap',
})

const texte = Literata({
  subsets: ['latin'],
  variable: '--police-texte',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://gaddem.github.io/mock-fact5/'),
  title: {
    default: 'Bois de Bout — menuiserie et agencement sur mesure',
    template: '%s — Bois de Bout',
  },
  description:
    "Atelier de menuiserie et d'agencement sur mesure : métré sur site, plan d'exécution coté, fabrication et pose. Bibliothèques, dressings, cuisines, escaliers.",
  robots: { index: false, follow: false },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    siteName: 'Bois de Bout',
    title: 'Bois de Bout — menuiserie et agencement sur mesure',
    description:
      "Ce qui est dessiné est ce qui est fabriqué. Métré, plan d'exécution coté, débit, assemblage, pose.",
    images: [{ url: '/images/partage.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bois de Bout — menuiserie et agencement sur mesure',
    description: "Ce qui est dessiné est ce qui est fabriqué.",
    images: ['/images/partage.png'],
  },
}

export default function RacineLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${titre.variable} ${texte.variable}`}>
      <body>
        <a
          href="#contenu"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-100 focus:flex focus:min-h-11 focus:items-center focus:bg-chene focus:px-4 focus:text-fond"
        >
          Aller au contenu
        </a>
        <Entete />
        <main id="contenu">{children}</main>
        <PiedDePage />
        <Curseur />
      </body>
    </html>
  )
}
