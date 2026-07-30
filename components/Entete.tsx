'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import Lien from './Lien'

const PAGES = [
  { chemin: '/agencements/', libelle: 'Agencements' },
  { chemin: '/essences/', libelle: 'Essences' },
  { chemin: '/devis/', libelle: 'Devis' },
]

export default function Entete() {
  const [ouvert, setOuvert] = useState(false)
  const chemin = usePathname()

  return (
    <header className="border-b border-bordure">
      <div className="feuille">
        <div className="flex items-stretch justify-between gap-4">
          <Lien
            href="/"
            className="flex min-h-11 flex-col justify-center py-3 pr-4"
            aria-label="Bois de Bout, accueil"
          >
            <span className="titre text-[19px] leading-none tracking-tight md:text-[22px]">
              Bois&nbsp;de&nbsp;Bout
            </span>
            <span className="surtitre mt-1 hidden text-[11px] sm:block">
              Menuiserie et agencement sur mesure
            </span>
          </Lien>

          <nav aria-label="Navigation principale" className="hidden items-stretch md:flex">
            {PAGES.map((page) => {
              const courant = chemin === page.chemin
              return (
                <Lien
                  key={page.chemin}
                  href={page.chemin}
                  aria-current={courant ? 'page' : undefined}
                  className={`flex min-h-11 items-center border-b-2 px-5 font-titre text-[13px] tracking-[0.1em] uppercase transition-colors duration-200 ${
                    courant
                      ? 'border-chene text-texte'
                      : 'border-transparent text-muted hover:text-texte'
                  }`}
                >
                  {page.libelle}
                </Lien>
              )
            })}
          </nav>

          <button
            type="button"
            onClick={() => setOuvert((etat) => !etat)}
            aria-expanded={ouvert}
            aria-controls="menu-mobile"
            className="flex h-11 w-11 shrink-0 items-center justify-center self-center border border-bordure md:hidden"
          >
            <span className="sr-only">{ouvert ? 'Fermer le menu' : 'Ouvrir le menu'}</span>
            <span aria-hidden="true" className="flex w-5 flex-col gap-[5px]">
              <span className="h-px w-full bg-texte" />
              <span className="h-px w-full bg-texte" />
              <span className="h-px w-full bg-texte" />
            </span>
          </button>
        </div>

        {ouvert ? (
          <nav id="menu-mobile" aria-label="Navigation principale" className="pb-3 md:hidden">
            {PAGES.map((page) => (
              <Lien
                key={page.chemin}
                href={page.chemin}
                onClick={() => setOuvert(false)}
                aria-current={chemin === page.chemin ? 'page' : undefined}
                className={`flex min-h-11 items-center border-t border-bordure font-titre text-[13px] tracking-[0.1em] uppercase ${
                  chemin === page.chemin ? 'text-texte' : 'text-muted'
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`mr-3 h-3 w-px ${chemin === page.chemin ? 'bg-chene' : 'bg-bordure'}`}
                />
                {page.libelle}
              </Lien>
            ))}
          </nav>
        ) : null}
      </div>
    </header>
  )
}
