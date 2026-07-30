import Lien from './Lien'

const PAGES = [
  { chemin: '/', libelle: 'Accueil' },
  { chemin: '/agencements/', libelle: 'Agencements' },
  { chemin: '/essences/', libelle: 'Essences' },
  { chemin: '/devis/', libelle: 'Devis' },
]

// Le cartouche d'un plan : qui, quoi, a quelle echelle, a quel indice. Il est
// un bloc du calepinage comme les autres, pas une decoration.
export default function PiedDePage() {
  return (
    <footer className="mt-[var(--section-y)] border-t border-bordure">
      <div className="feuille py-10">
        <div className="grid gap-px bg-bordure md:grid-cols-[1.4fr_1fr_1fr]">
          <div className="min-w-0 bg-fond p-5">
            <p className="titre text-[22px] leading-none">Bois de Bout</p>
            <p className="mt-3 text-[14px] leading-relaxed text-muted">
              Menuiserie et agencement sur mesure. Métré sur site, plan d&rsquo;exécution coté,
              fabrication à l&rsquo;atelier et pose.
            </p>
            <p className="mt-4 text-[13px] text-muted">
              Atelier ouvert du lundi au vendredi, 8 h &ndash; 17 h, sur rendez-vous.
            </p>
          </div>

          <nav aria-label="Navigation de pied de page" className="min-w-0 bg-fond p-5">
            <p className="surtitre">Planches</p>
            <ul className="mt-3">
              {PAGES.map((page) => (
                <li key={page.chemin}>
                  <Lien
                    href={page.chemin}
                    className="lien-plan flex min-h-11 items-center text-[14px]"
                  >
                    {page.libelle}
                  </Lien>
                </li>
              ))}
            </ul>
          </nav>

          <div className="min-w-0 bg-fond p-5">
            <p className="surtitre">Cartouche</p>
            <dl className="mt-3 text-[13px]">
              <div className="flex justify-between gap-3 border-b border-bordure py-2">
                <dt className="text-muted">Échelle</dt>
                <dd>1:20</dd>
              </div>
              <div className="flex justify-between gap-3 border-b border-bordure py-2">
                <dt className="text-muted">Indice</dt>
                <dd>C</dd>
              </div>
              <div className="flex justify-between gap-3 py-2">
                <dt className="text-muted">Unités</dt>
                <dd>millimètres</dd>
              </div>
            </dl>
          </div>
        </div>

        <p className="mt-6 text-[13px] text-muted">
          Projet de démonstration &mdash; Développé par DEVAZU. Marque, ouvrages, prix et
          fournitures sont fictifs.
        </p>
      </div>
    </footer>
  )
}
