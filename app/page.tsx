import type { Metadata } from 'next'
import Lien from '@/components/Lien'
import Photo from '@/components/Photo'
import EnScene from '@/components/EnScene'
import Coupe from '@/components/Coupe'
import { DetailChanfrein } from '@/components/Elevation'
import { Feuille, Panneau, Calepinage, Piece, LigneDeCoupe, Cote } from '@/components/Feuille'
import { PHOTOS } from '@/lib/photos'
import { FAMILLES, ETAPES, FOURNITURES } from '@/data/atelier'

// Abscisse de chaque pièce le long de l'axe de coupe, au calepinage le plus
// large. Elle est écrite à la main et non déduite de l'index : la première
// famille occupe deux pistes, l'index ne dit donc pas où la pièce se trouve.
const X_FAMILLES = [0.33, 0.83, 0.17, 0.5, 0.83]
const X_ETAPES = [0.17, 0.5, 0.83, 0.17, 0.5]
const X_FOURNITURES = [0.17, 0.5, 0.83, 0.17, 0.5, 0.83]

export const metadata: Metadata = {
  title: 'Bois de Bout — menuiserie et agencement sur mesure',
  description:
    "Métré sur site, plan d'exécution coté, débit, assemblage et pose. Bibliothèques, dressings, cuisines, escaliers et agencement professionnel.",
}

export default function Accueil() {
  return (
    <>
      {/* ------------------------------------------------- PL-01 ouverture */}
      <section className="pt-8 md:pt-12">
        <Feuille>
          <Panneau numero="PL-01" titre="Plan d’ensemble">
            <Calepinage className="lg:grid-cols-[1.7fr_1fr]">
              <Piece className="!py-10 md:!py-16" x={0.25}>
                <p className="surtitre">Atelier de menuiserie</p>
                <h1 className="titre titre-plan mt-4">
                  Bois
                  <span className="text-chene"> de </span>
                  Bout
                </h1>
                <p className="mt-5 max-w-[46ch] font-titre text-[15px] tracking-[0.02em] text-muted md:text-[17px]">
                  Agencement sur mesure : bibliothèques, dressings, cuisines, escaliers,
                  agencement de commerce.
                </p>
              </Piece>
              <Piece x={0.85} fond className="flex items-center justify-center !py-8">
                <div className="w-full max-w-[300px]">
                  <DetailChanfrein />
                </div>
              </Piece>
            </Calepinage>

            <Calepinage className="md:grid-cols-[1.6fr_1fr]">
              <Piece x={0.3} travaillee>
                <p className="lisible text-[16px] leading-relaxed md:text-[18px]">
                  On ne vend pas du bois, on vend un plan tenu. Le métré relève la pièce telle
                  qu’elle est, faux aplombs compris ; le plan d’exécution fixe chaque cote ; le
                  devis reprend ce plan ligne à ligne. Ce qui est dessiné est ce qui est fabriqué,
                  ce qui est chiffré est ce qui est facturé.
                </p>
                <div className="mt-7">
                  <Lien href="/devis/" className="plaque chanfrein">
                    Demander un métré
                    <span aria-hidden="true">&rarr;</span>
                  </Lien>
                </div>
              </Piece>

              <Piece x={0.85} fond>
                <p className="surtitre">Cartouche</p>
                <dl className="mt-4 text-[14px]">
                  {[
                    ['Ouvrage', 'Plan d’ensemble'],
                    ['Échelle', '1:20'],
                    ['Unités', 'millimètres'],
                    ['Indice', 'C'],
                    ['Établi par', 'l’atelier'],
                  ].map(([cle, valeur]) => (
                    <div
                      key={cle}
                      className="flex justify-between gap-3 border-b border-bordure py-2"
                    >
                      <dt className="text-muted">{cle}</dt>
                      <dd className="text-right">{valeur}</dd>
                    </div>
                  ))}
                </dl>
              </Piece>
            </Calepinage>
          </Panneau>
        </Feuille>
      </section>

      {/* --------------------------------------- PL-02 familles, signature */}
      <section className="mt-[var(--section-y)]">
        <Feuille>
          <EnScene>
            <Coupe numero="PL-02" titre="Familles d’ouvrages">
              <Calepinage cote={1}>
                <Piece x={0.2}>
                  <h2 className="titre titre-section">Ce que l’atelier fabrique</h2>
                  <p className="lisible mt-4 text-[16px] leading-relaxed text-muted">
                    Chaque famille se chiffre dans l’unité où elle se pense : au mètre linéaire
                    quand l’ouvrage court le long d’un mur, au mètre carré quand il se compte en
                    surface, à l’ouvrage quand il n’y en a qu’un exemplaire.
                  </p>
                  <Cote className="mt-6" valeur="cinq familles" />
                </Piece>
              </Calepinage>

              <LigneDeCoupe />

              <Calepinage cote={-1} className="sm:grid-cols-2 lg:grid-cols-3">
                {FAMILLES.map((famille, index) => (
                  <Piece
                    key={famille.reference}
                    x={X_FAMILLES[index]}
                    travaillee
                    reperes
                    className={index === 0 ? 'lg:col-span-2' : ''}
                  >
                    <div className="flex items-baseline justify-between gap-3">
                      <span className="repere-marge">{famille.reference}</span>
                      <span className="font-titre text-[11px] tracking-[0.1em] text-muted uppercase">
                        {famille.unite}
                      </span>
                    </div>
                    <h3 className="titre titre-piece mt-3">{famille.nom}</h3>
                    <p className="mt-3 text-[15px] leading-relaxed text-muted">{famille.texte}</p>
                    <p className="mt-4 font-titre text-[15px] text-chene">{famille.prix}</p>
                  </Piece>
                ))}
              </Calepinage>
            </Coupe>
          </EnScene>
        </Feuille>
      </section>

      {/* ------------------------------------------------- PL-03 le tracé */}
      <section className="mt-[var(--section-y)]">
        <Feuille>
          <EnScene>
            <Panneau numero="PL-03" titre="Report du tracé">
              <Photo
                fiche={PHOTOS.leTrace}
                hauteur="clamp(220px, 40vw, 440px)"
                sizes="(min-width: 1264px) 1198px, (min-width: 768px) calc(100vw - 66px), calc(100vw - 34px)"
              />
              <Calepinage className="md:grid-cols-[1fr_auto]">
                <Piece x={0.3}>
                  <p className="lisible text-[15px] leading-relaxed text-muted">
                    Le tracé grandeur nature reporté sur le panneau. Ce que le plan a fixé en
                    millimètres, le gabarit le rend palpable — et c’est là, pas plus tard, qu’on
                    voit qu’une courbe passe mal ou qu’un jeu manque.
                  </p>
                </Piece>
                <Piece x={0.85} fond className="md:min-w-[220px]">
                  <Cote valeur="échelle 1:1" />
                </Piece>
              </Calepinage>
            </Panneau>
          </EnScene>
        </Feuille>
      </section>

      {/* ------------------------------------------------ PL-04 cinq temps */}
      <section className="mt-[var(--section-y)]">
        <Feuille>
          <EnScene>
            <Panneau numero="PL-04" titre="Déroulement">
              <Calepinage>
                <Piece x={0.2}>
                  <h2 className="titre titre-section">L’atelier en cinq temps</h2>
                  <p className="lisible mt-4 text-[16px] leading-relaxed text-muted">
                    Trois délais séparés, jamais un délai global : l’étude, la fabrication et la
                    pose ne dépendent pas des mêmes choses, et les annoncer ensemble revient à
                    n’en tenir aucun.
                  </p>
                </Piece>
              </Calepinage>
              <Calepinage className="md:grid-cols-2 xl:grid-cols-3">
                {ETAPES.map((etape, index) => (
                  <Piece
                    key={etape.numero}
                    x={X_ETAPES[index]}
                    travaillee
                    className={index === 4 ? 'xl:col-span-2' : ''}
                  >
                    <div className="flex items-baseline gap-3">
                      <span className="font-titre text-[26px] leading-none text-chene">
                        {etape.numero}
                      </span>
                      <h3 className="titre text-[17px]">{etape.nom}</h3>
                    </div>
                    <p className="mt-3 text-[15px] leading-relaxed text-muted">{etape.texte}</p>
                    <p className="mt-4 border-t border-bordure pt-3 font-titre text-[12px] tracking-[0.08em] text-texte uppercase">
                      {etape.delai}
                    </p>
                  </Piece>
                ))}
                {/* Place explicitement en troisieme colonne pour que l'ordre de
                    lecture reste 01 a 05, la photo apres. */}
                <Piece
                  x={0.85}
                  fond
                  className="!p-0 xl:col-start-3 xl:row-start-1 xl:row-span-2"
                >
                  <Photo
                    fiche={PHOTOS.laSurface}
                    hauteur="100%"
                    className="h-full min-h-[220px] border-0"
                    sizes="(min-width: 1264px) 399px, (min-width: 768px) calc(50vw - 33px), calc(100vw - 34px)"
                  />
                </Piece>
              </Calepinage>
            </Panneau>
          </EnScene>
        </Feuille>
      </section>

      {/* ------------------------------------------------- PL-05 le débit */}
      <section className="mt-[var(--section-y)]">
        <Feuille>
          <EnScene>
            <Panneau numero="PL-05" titre="Débit dans le panneau">
              <Calepinage className="md:grid-cols-[auto_1fr]">
                <Piece x={0.15} fond className="md:min-w-[240px]">
                  <Cote valeur="perte 6,4 %" />
                </Piece>
                <Piece x={0.7}>
                  <p className="lisible text-[15px] leading-relaxed text-muted">
                    Le calepinage décide de ce que coûte un panneau. Les pièces y sont rangées
                    comme les blocs de cette page : jointives, de tailles inégales, orientées dans
                    le sens du fil quand le fil compte.
                  </p>
                </Piece>
              </Calepinage>
              <Photo
                fiche={PHOTOS.leDebit}
                hauteur="clamp(220px, 40vw, 440px)"
                sizes="(min-width: 1264px) 1198px, (min-width: 768px) calc(100vw - 66px), calc(100vw - 34px)"
              />
            </Panneau>
          </EnScene>
        </Feuille>
      </section>

      {/* ----------------------------------------------- PL-06 fournitures */}
      <section className="mt-[var(--section-y)]">
        <Feuille>
          <EnScene>
            <Coupe numero="PL-06" titre="Nomenclature de fournitures">
              <Calepinage cote={1}>
                <Piece x={0.25}>
                  <h2 className="titre titre-section">Ce qu’il y a dedans</h2>
                  <p className="lisible mt-4 text-[16px] leading-relaxed text-muted">
                    Un ouvrage se juge autant à ce qui ne se voit pas. Voici ce qui est monté par
                    défaut, et la raison de chaque choix.
                  </p>
                </Piece>
              </Calepinage>

              <LigneDeCoupe />

              <Calepinage cote={-1} className="sm:grid-cols-2 lg:grid-cols-3">
                {FOURNITURES.map((fourniture, index) => (
                  <Piece key={fourniture.domaine} x={X_FOURNITURES[index]} travaillee>
                    <p className="surtitre">{fourniture.domaine}</p>
                    <h3 className="titre titre-piece mt-2">{fourniture.marque}</h3>
                    <p className="mt-2 font-titre text-[12px] tracking-[0.04em] text-chene">
                      {fourniture.references}
                    </p>
                    <p className="mt-3 text-[15px] leading-relaxed text-muted">
                      {fourniture.texte}
                    </p>
                  </Piece>
                ))}
              </Calepinage>
            </Coupe>
          </EnScene>
        </Feuille>
      </section>

      {/* ---------------------------------------------------- PL-07 appel */}
      <section className="mt-[var(--section-y)]">
        <Feuille>
          <EnScene>
            <Panneau numero="PL-07" titre="Suite">
              <Calepinage className="md:grid-cols-[1.4fr_1fr]">
                <Piece x={0.3}>
                  <h2 className="titre titre-section">Le métré passe avant tout le reste</h2>
                  <p className="lisible mt-4 text-[16px] leading-relaxed text-muted">
                    Un chiffrage donné sur photo ne vaut rien : c’est le dévers du sol et le faux
                    aplomb du mur qui font la différence entre un ouvrage qui se pose et un
                    ouvrage qu’on rattrape au joint. La visite dure une demi-journée.
                  </p>
                  <div className="mt-7 flex flex-wrap gap-4">
                    <Lien href="/devis/" className="plaque chanfrein">
                      Demander un métré
                      <span aria-hidden="true">&rarr;</span>
                    </Lien>
                    <Lien
                      href="/agencements/"
                      className="lien-plan flex min-h-11 items-center font-titre text-[15px]"
                    >
                      Voir les ouvrages
                    </Lien>
                  </div>
                </Piece>
                <Piece x={0.8} fond>
                  <p className="surtitre">Délais courants</p>
                  <dl className="mt-4 text-[14px]">
                    {[
                      ['Étude et plan', '10 à 15 j'],
                      ['Fabrication', '5 à 7 sem.'],
                      ['Pose', '2 à 5 j'],
                    ].map(([cle, valeur]) => (
                      <div
                        key={cle}
                        className="flex justify-between gap-3 border-b border-bordure py-2"
                      >
                        <dt className="text-muted">{cle}</dt>
                        <dd className="font-titre">{valeur}</dd>
                      </div>
                    ))}
                  </dl>
                </Piece>
              </Calepinage>
            </Panneau>
          </EnScene>
        </Feuille>
      </section>
    </>
  )
}
