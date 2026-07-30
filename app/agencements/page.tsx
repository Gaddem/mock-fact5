import type { Metadata } from 'next'
import Lien from '@/components/Lien'
import Photo from '@/components/Photo'
import EnScene from '@/components/EnScene'
import Coupe from '@/components/Coupe'
import Elevation from '@/components/Elevation'
import { Feuille, Panneau, Calepinage, Piece, LigneDeCoupe, Cote } from '@/components/Feuille'
import { PHOTOS } from '@/lib/photos'
import { OUVRAGES } from '@/data/ouvrages'

export const metadata: Metadata = {
  title: 'Agencements',
  description:
    "Cinq ouvrages en élévation cotée : bibliothèque toute hauteur, dressing d'angle, cuisine en L, escalier droit, banque d'accueil. Nomenclature, délais et prix.",
}

export default function Agencements() {
  return (
    <>
      <section className="pt-8 md:pt-12">
        <Feuille>
          <Coupe numero="PL-10" titre="Ouvrages réalisés">
            <Calepinage cote={1}>
              <Piece className="!py-9 md:!py-14" x={0.2}>
                <p className="surtitre">Planches 11 à 15</p>
                <h1 className="titre titre-plan mt-4">Agencements</h1>
                <p className="lisible mt-5 text-[16px] leading-relaxed text-muted md:text-[18px]">
                  Cinq ouvrages, montrés comme ils ont été vendus : une élévation cotée et une
                  nomenclature. Pas de vue d’ambiance — un plan dit ce qu’il y a, une photo
                  d’intérieur dit surtout comment quelqu’un d’autre vit chez lui.
                </p>
              </Piece>
            </Calepinage>

            <LigneDeCoupe />

            <Calepinage cote={-1} className="md:grid-cols-[auto_1fr]">
              <Piece x={0.15} fond className="md:min-w-[230px]">
                <Cote valeur="5 planches" />
              </Piece>
              <Piece x={0.7}>
                <p className="text-[15px] leading-relaxed text-muted">
                  Les prix sont ceux du devis d’origine, quincaillerie, finition et pose
                  comprises. Le ratio au mètre linéaire n’est donné que pour comparer : il ne se
                  transpose pas d’un ouvrage à l’autre.
                </p>
              </Piece>
            </Calepinage>
          </Coupe>
        </Feuille>
      </section>

      <section className="mt-[var(--section-y)]">
        <Feuille>
          <EnScene>
            <Panneau numero="PL-10b" titre="Finition posée">
              <Photo
                fiche={PHOTOS.laSurface}
                sizes="(min-width: 1264px) 1198px, (min-width: 768px) calc(100vw - 66px), calc(100vw - 34px)"
              />
              <Calepinage>
                <Piece x={0.4} className="md:flex md:flex-col md:justify-center">
                  <p className="lisible text-[15px] leading-relaxed text-muted">
                    Un plan de travail en chêne massif de 40 mm, deux ans après la pose. La
                    finition huile-cire se répare à l’endroit où elle est marquée ; un vernis, lui,
                    se refait en entier.
                  </p>
                </Piece>
              </Calepinage>
            </Panneau>
          </EnScene>
        </Feuille>
      </section>

      {OUVRAGES.map((ouvrage, index) => (
        <section key={ouvrage.reference} className="mt-[var(--section-y)]">
          <Feuille>
            <EnScene>
              <Panneau numero={ouvrage.reference} titre={ouvrage.contexte}>
                <Calepinage className="lg:grid-cols-[1.15fr_1fr]">
                  <Piece
                    fond
                    x={index % 2 === 0 ? 0.25 : 0.75}
                    className={`!p-6 md:!p-10 ${index % 2 === 0 ? '' : 'lg:order-2'}`}
                  >
                    <Elevation type={ouvrage.elevation} />
                  </Piece>

                  <Piece x={index % 2 === 0 ? 0.75 : 0.25} travaillee reperes>
                    <h2 className="titre titre-piece">{ouvrage.nom}</h2>
                    <p className="mt-2 font-titre text-[12px] tracking-[0.08em] text-chene uppercase">
                      {ouvrage.cotes}
                    </p>
                    <p className="mt-4 text-[15px] leading-relaxed text-muted">{ouvrage.texte}</p>

                    <dl className="mt-6 text-[14px]">
                      {ouvrage.nomenclature.map((ligne) => (
                        <div
                          key={ligne.poste}
                          className="grid grid-cols-1 gap-1 border-t border-bordure py-2 sm:grid-cols-[130px_1fr] sm:gap-4"
                        >
                          <dt className="min-w-0 font-titre text-[11px] tracking-[0.1em] text-muted uppercase">
                            {ligne.poste}
                          </dt>
                          <dd className="min-w-0">{ligne.valeur}</dd>
                        </div>
                      ))}
                    </dl>

                    <div className="mt-6 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-t border-bordure pt-4">
                      <p className="font-titre text-[12px] tracking-[0.06em] text-muted uppercase">
                        {ouvrage.delai}
                      </p>
                      <p className="font-titre text-[22px] text-texte">
                        {ouvrage.prix}
                        <span className="ml-3 text-[13px] text-chene">{ouvrage.ratio}</span>
                      </p>
                    </div>
                  </Piece>
                </Calepinage>
              </Panneau>
            </EnScene>
          </Feuille>
        </section>
      ))}

      <section className="mt-[var(--section-y)]">
        <Feuille>
          <EnScene>
            <Panneau numero="PL-16" titre="Suite">
              <Calepinage className="md:grid-cols-[1.4fr_1fr]">
                <Piece x={0.3}>
                  <h2 className="titre titre-section">Le vôtre n’est dans aucune de ces cinq</h2>
                  <p className="lisible mt-4 text-[16px] leading-relaxed text-muted">
                    C’est normal : aucun de ces cinq ouvrages n’existait avant le métré. Dites la
                    pièce, la contrainte et le budget — le reste se dessine.
                  </p>
                  <div className="mt-7">
                    <Lien href="/devis/" className="plaque chanfrein">
                      Demander un métré
                      <span aria-hidden="true">&rarr;</span>
                    </Lien>
                  </div>
                </Piece>
                <Piece x={0.8} fond>
                  <p className="surtitre">À voir aussi</p>
                  <ul className="mt-3">
                    <li>
                      <Lien
                        href="/essences/"
                        className="lien-plan flex min-h-11 items-center text-[15px]"
                      >
                        Les sept essences de l’atelier
                      </Lien>
                    </li>
                    <li>
                      <Lien href="/" className="lien-plan flex min-h-11 items-center text-[15px]">
                        L’atelier en cinq temps
                      </Lien>
                    </li>
                  </ul>
                </Piece>
              </Calepinage>
            </Panneau>
          </EnScene>
        </Feuille>
      </section>
    </>
  )
}
