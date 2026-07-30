import type { Metadata } from 'next'
import Lien from '@/components/Lien'
import Photo from '@/components/Photo'
import EnScene from '@/components/EnScene'
import Coupe from '@/components/Coupe'
import { Feuille, Panneau, Calepinage, Piece, LigneDeCoupe, Cote } from '@/components/Feuille'
import { PHOTOS } from '@/lib/photos'
import { ESSENCES } from '@/data/essences'

const X_ESSENCES = [0.17, 0.5, 0.83, 0.17, 0.5, 0.83, 0.5]

export const metadata: Metadata = {
  title: 'Essences',
  description:
    "Chêne, frêne, noyer, châtaignier, hêtre, douglas, mélèze : densité, dureté Monnin, stabilité, emploi et prix indicatif de l'avivé.",
}

export default function Essences() {
  return (
    <>
      <section className="pt-8 md:pt-12">
        <Feuille>
          <Panneau numero="PL-20" titre="Feuille d’échantillons">
            <Calepinage className="lg:grid-cols-[1fr_1fr]">
              <Piece className="!py-9 md:!py-14" x={0.25}>
                <p className="surtitre">Planche 20</p>
                <h1 className="titre titre-plan mt-4">Essences</h1>
                <p className="lisible mt-5 text-[16px] leading-relaxed text-muted md:text-[18px]">
                  Sept bois tenus en stock. Le choix ne se fait pas sur la couleur : il se fait sur
                  ce que la pièce va subir, sur la portée des tablettes et sur ce que l’essence
                  fait aux fixations.
                </p>
              </Piece>
              <Piece x={0.75} fond className="!p-0">
                <Photo
                  fiche={PHOTOS.avivesEmpiles}
                  hauteur="clamp(220px, 34vw, 420px)"
                  className="border-0"
                  sizes="(min-width: 1264px) 599px, (min-width: 1024px) 50vw, (min-width: 768px) calc(100vw - 66px), calc(100vw - 34px)"
                />
              </Piece>
            </Calepinage>
          </Panneau>
        </Feuille>
      </section>

      <section className="mt-[var(--section-y)]">
        <Feuille>
          <EnScene>
            <Coupe numero="PL-21" titre="Caractéristiques">
              <Calepinage cote={1}>
                <Piece x={0.2}>
                  <h2 className="titre titre-section">Ce qui décide, en pratique</h2>
                  <p className="lisible mt-4 text-[16px] leading-relaxed text-muted">
                    Densité à 12 % d’humidité, dureté Monnin en newtons par millimètre carré, prix
                    indicatif de l’avivé de 27 mm au mètre carré — hors chute et hors corroyage,
                    qui ajoutent de 15 à 25 % selon la pièce.
                  </p>
                  <Cote className="mt-6" valeur="7 essences en stock" />
                </Piece>
              </Calepinage>

              <LigneDeCoupe />

              <Calepinage cote={-1} className="md:grid-cols-2 xl:grid-cols-3">
                {ESSENCES.map((essence, index) => (
                  <Piece
                    key={essence.reference}
                    x={X_ESSENCES[index]}
                    travaillee
                    reperes
                    className={index === 6 ? 'xl:col-span-3' : ''}
                  >
                    <div className="flex items-baseline justify-between gap-3">
                      <span className="repere-marge">{essence.reference}</span>
                      <span className="font-titre text-[15px] text-chene">{essence.prix}</span>
                    </div>
                    <h3 className="titre titre-piece mt-2">{essence.nom}</h3>

                    <dl className="mt-4 text-[14px]">
                      {[
                        ['Densité', essence.densite],
                        ['Monnin', essence.monnin],
                        ['Stabilité', essence.stabilite],
                        ['Teinte', essence.teinte],
                        ['Emploi', essence.emploi],
                      ].map(([cle, valeur]) => (
                        <div
                          key={cle}
                          className="grid grid-cols-1 gap-1 border-t border-bordure py-2 sm:grid-cols-[92px_1fr] sm:gap-3"
                        >
                          <dt className="min-w-0 font-titre text-[11px] tracking-[0.1em] text-muted uppercase">
                            {cle}
                          </dt>
                          <dd className="min-w-0">{valeur}</dd>
                        </div>
                      ))}
                    </dl>

                    <p className="mt-4 border-t border-bordure pt-3 text-[14px] leading-relaxed text-muted">
                      {essence.note}
                    </p>
                  </Piece>
                ))}
              </Calepinage>
            </Coupe>
          </EnScene>
        </Feuille>
      </section>

      <section className="mt-[var(--section-y)]">
        <Feuille>
          <EnScene>
            <Panneau numero="PL-22" titre="Deux règles qui coûtent cher">
              <Calepinage className="md:grid-cols-2">
                <Piece x={0.25} travaillee>
                  <h2 className="titre titre-piece">Le tanin et l’acier</h2>
                  <p className="mt-3 text-[15px] leading-relaxed text-muted">
                    Chêne et châtaignier attaquent l’acier zingué dès qu’il y a un peu d’humidité.
                    Le sel de fer qui se forme migre dans le bois et laisse des traînées noires
                    autour de chaque vis, parfois en trois semaines. Toute fixation au contact de
                    ces deux essences est en inox ou en laiton, sans exception, y compris celles
                    qu’on ne verra jamais.
                  </p>
                </Piece>
                <Piece x={0.75} travaillee>
                  <h2 className="titre titre-piece">La portée d’une tablette</h2>
                  <p className="mt-3 text-[15px] leading-relaxed text-muted">
                    Au-delà de 900 mm entre deux appuis, un panneau de 19 mm chargé de livres
                    fléchit de façon visible en un an, et le fléchissement ne revient jamais. On
                    passe alors en massif de 27 mm, ou l’on rapporte un chant massif de 8 mm qui
                    fait office de raidisseur. C’est une cote qui se décide au plan, pas sur place.
                  </p>
                </Piece>
              </Calepinage>
            </Panneau>
          </EnScene>
        </Feuille>
      </section>

      <section className="mt-[var(--section-y)]">
        <Feuille>
          <EnScene>
            <Panneau numero="PL-23" titre="Stock">
              <Calepinage className="md:grid-cols-[auto_1fr]">
                <Piece x={0.15} fond className="md:min-w-[240px]">
                  <Cote valeur="stock atelier" />
                  <p className="mt-4 text-[14px] leading-relaxed text-muted">
                    Tourillons, tasseaux et avivés sèchent à l’atelier avant d’être débités. Un
                    bois qui arrive le matin et passe à la machine l’après-midi travaille ensuite
                    dans l’ouvrage.
                  </p>
                </Piece>
                <Piece x={0.7} fond className="!p-0">
                  <Photo
                    fiche={PHOTOS.stockDebite}
                    hauteur="clamp(220px, 36vw, 420px)"
                    className="border-0"
                    sizes="(min-width: 1264px) 958px, (min-width: 768px) calc(100vw - 306px), calc(100vw - 34px)"
                  />
                </Piece>
              </Calepinage>
            </Panneau>
          </EnScene>
        </Feuille>
      </section>

      <section className="mt-[var(--section-y)]">
        <Feuille>
          <EnScene>
            <Panneau numero="PL-24" titre="Suite">
              <Calepinage>
                <Piece x={0.4}>
                  <h2 className="titre titre-section">Le choix se tranche au métré</h2>
                  <p className="lisible mt-4 text-[16px] leading-relaxed text-muted">
                    Sur place, avec la lumière de la pièce et ce qui s’y trouve déjà. Un noyer
                    superbe en échantillon peut être le mauvais choix contre un parquet foncé.
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
              </Calepinage>
            </Panneau>
          </EnScene>
        </Feuille>
      </section>
    </>
  )
}
