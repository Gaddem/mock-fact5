import type { Metadata } from 'next'
import Lien from '@/components/Lien'
import { Feuille, Panneau, Calepinage, Piece, Cote } from '@/components/Feuille'

export const metadata: Metadata = {
  title: 'Cote absente du plan',
  description: 'La planche demandée n’existe pas.',
}

const PAGES = [
  { chemin: '/', libelle: 'Plan d’ensemble', numero: 'PL-01' },
  { chemin: '/agencements/', libelle: 'Agencements', numero: 'PL-10' },
  { chemin: '/essences/', libelle: 'Essences', numero: 'PL-20' },
  { chemin: '/devis/', libelle: 'Devis', numero: 'PL-30' },
]

export default function Introuvable() {
  return (
    <section className="pt-8 md:pt-12">
      <Feuille>
        <Panneau numero="PL-00" titre="Planche manquante">
          <Calepinage className="lg:grid-cols-[1.3fr_1fr]">
            <Piece className="!py-10 md:!py-16" x={0.25}>
              <p className="surtitre">Erreur 404</p>
              <h1 className="titre titre-plan mt-4">Cote absente du plan</h1>
              <p className="lisible mt-5 text-[16px] leading-relaxed text-muted md:text-[18px]">
                Le repère existe, la valeur manque. Sur un plan c’est le genre de trou qui arrête
                le débit : on ne devine pas une cote, on retourne la chercher.
              </p>
              <Cote className="mt-7 max-w-[280px]" valeur="?" />
              <div className="mt-8">
                <Lien href="/" className="plaque chanfrein">
                  Revenir au plan d’ensemble
                  <span aria-hidden="true">&rarr;</span>
                </Lien>
              </div>
            </Piece>

            <Piece x={0.8} fond>
              <p className="surtitre">Planches du dossier</p>
              <ul className="mt-3">
                {PAGES.map((page) => (
                  <li key={page.chemin} className="border-b border-bordure">
                    <Lien
                      href={page.chemin}
                      className="lien-plan flex min-h-11 items-center justify-between gap-4 text-[15px]"
                    >
                      <span className="min-w-0">{page.libelle}</span>
                      <span className="shrink-0 font-titre text-[12px] tracking-[0.08em] text-muted">
                        {page.numero}
                      </span>
                    </Lien>
                  </li>
                ))}
              </ul>
            </Piece>
          </Calepinage>
        </Panneau>
      </Feuille>
    </section>
  )
}
