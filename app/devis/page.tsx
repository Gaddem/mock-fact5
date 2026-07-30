import type { Metadata } from 'next'
import Lien from '@/components/Lien'
import EnScene from '@/components/EnScene'
import Coupe from '@/components/Coupe'
import { Feuille, Panneau, Calepinage, Piece, LigneDeCoupe, Cote } from '@/components/Feuille'

export const metadata: Metadata = {
  title: 'Devis',
  description:
    "Ce qu'il faut pour chiffrer un agencement sur mesure : la pièce, les contraintes, le budget. Métré sur site, plan d'exécution coté, devis ligne à ligne.",
}

const CHAMPS = [
  { id: 'nom', libelle: 'Nom', type: 'text', indice: 'tel qu’il figurera sur le devis' },
  { id: 'telephone', libelle: 'Téléphone', type: 'tel', indice: 'pour caler le métré' },
  { id: 'courriel', libelle: 'Courriel', type: 'email', indice: 'envoi du plan et du devis' },
  { id: 'commune', libelle: 'Commune', type: 'text', indice: 'zone d’intervention 60 km' },
]

const OUVRAGES_POSSIBLES = [
  'Bibliothèque ou rangement mural',
  'Dressing ou penderie',
  'Cuisine ou plan de travail',
  'Escalier ou garde-corps',
  'Agencement professionnel',
  'Autre, à préciser',
]

const BESOINS = [
  [
    'La pièce',
    'Ses dimensions approximatives, sa hauteur sous plafond, ce qui s’y trouve déjà.',
  ],
  [
    'Les contraintes',
    'Une trappe de visite, un radiateur, une prise à conserver, un sol en pente, un mur qui n’est pas droit.',
  ],
  [
    'Le budget',
    'Même large. Il décide de l’essence et du mode de fabrication bien plus que le style.',
  ],
]

export default function Devis() {
  return (
    <>
      <section className="pt-8 md:pt-12">
        <Feuille>
          <Coupe numero="PL-30" titre="Demande de métré">
            <Calepinage cote={1}>
              <Piece className="!py-9 md:!py-14" x={0.2}>
                <p className="surtitre">Planche 30</p>
                <h1 className="titre titre-plan mt-4">Devis</h1>
                <p className="lisible mt-5 text-[16px] leading-relaxed text-muted md:text-[18px]">
                  Le chiffrage part du métré, jamais d’une photo. La demande sert à savoir s’il y a
                  matière à se déplacer et à préparer la visite : la moitié des questions posées
                  sur place ont déjà leur réponse ici.
                </p>
              </Piece>
            </Calepinage>

            <LigneDeCoupe />

            <Calepinage cote={-1} className="md:grid-cols-3">
              {BESOINS.map(([titre, texte], index) => (
                <Piece key={titre} x={[0.17, 0.5, 0.83][index]} travaillee>
                  <h2 className="titre titre-piece">{titre}</h2>
                  <p className="mt-3 text-[15px] leading-relaxed text-muted">{texte}</p>
                </Piece>
              ))}
            </Calepinage>
          </Coupe>
        </Feuille>
      </section>

      <section className="mt-[var(--section-y)]">
        <Feuille>
          <EnScene>
            <Panneau numero="PL-31" titre="Formulaire">
              <Calepinage>
                <Piece x={0.3} className="border-l-2 border-chene">
                  <p className="surtitre text-chene">Maquette</p>
                  <p className="lisible mt-2 text-[15px] leading-relaxed">
                    Ce site est une démonstration : le formulaire ci-dessous est désactivé et
                    n’envoie rien. Il est là pour montrer la mise en page d’une saisie calepinée
                    comme une feuille de débit.
                  </p>
                </Piece>
              </Calepinage>

              <form aria-label="Demande de métré (maquette désactivée)">
                <fieldset disabled className="contents">
                  <Calepinage className="sm:grid-cols-2">
                    {CHAMPS.map((champ, index) => (
                      <Piece key={champ.id} x={(index % 2) * 0.6 + 0.2}>
                        <label
                          htmlFor={champ.id}
                          className="font-titre text-[11px] tracking-[0.1em] text-muted uppercase"
                        >
                          {champ.libelle}
                        </label>
                        <input
                          id={champ.id}
                          name={champ.id}
                          type={champ.type}
                          placeholder="—"
                          className="mt-2 block h-11 w-full min-w-0 border border-bordure bg-fond px-3 text-[15px] text-texte placeholder:text-muted"
                        />
                        <p className="mt-2 text-[13px] text-muted">{champ.indice}</p>
                      </Piece>
                    ))}
                  </Calepinage>

                  <Calepinage>
                    <Piece x={0.4}>
                      <fieldset>
                        <legend className="font-titre text-[11px] tracking-[0.1em] text-muted uppercase">
                          Nature de l’ouvrage
                        </legend>
                        <div className="mt-3 grid gap-x-6 sm:grid-cols-2 lg:grid-cols-3">
                          {OUVRAGES_POSSIBLES.map((ouvrage) => (
                            <label
                              key={ouvrage}
                              className="flex min-h-11 min-w-0 items-center gap-3 text-[15px]"
                            >
                              <input
                                type="checkbox"
                                name="ouvrage"
                                value={ouvrage}
                                className="h-4 w-4 shrink-0 appearance-none border border-bordure bg-fond"
                              />
                              <span className="min-w-0">{ouvrage}</span>
                            </label>
                          ))}
                        </div>
                      </fieldset>
                    </Piece>
                  </Calepinage>

                  <Calepinage className="lg:grid-cols-[1.5fr_1fr]">
                    <Piece x={0.3}>
                      <label
                        htmlFor="description"
                        className="font-titre text-[11px] tracking-[0.1em] text-muted uppercase"
                      >
                        La pièce, les contraintes, le budget
                      </label>
                      <textarea
                        id="description"
                        name="description"
                        rows={7}
                        placeholder="—"
                        className="mt-2 block w-full min-w-0 resize-none border border-bordure bg-fond px-3 py-2 text-[15px] text-texte placeholder:text-muted"
                      />
                    </Piece>
                    <Piece x={0.8} fond>
                      <p className="surtitre">Pièce jointe</p>
                      <p className="mt-3 text-[14px] leading-relaxed text-muted">
                        Un croquis coté à la main vaut mieux que dix photos. S’il existe un plan
                        d’architecte, la version DWG évite de tout ressaisir.
                      </p>
                      <p className="mt-4 border-t border-bordure pt-3 text-[13px] text-muted">
                        Formats acceptés : pdf, dwg, jpg, png &mdash; 20 Mo au total.
                      </p>
                    </Piece>
                  </Calepinage>

                  <Calepinage>
                    <Piece x={0.5} fond>
                      <div className="flex flex-wrap items-center gap-5">
                        <span
                          aria-hidden="true"
                          className="plaque chanfrein cursor-not-allowed opacity-45"
                        >
                          Envoyer la demande
                        </span>
                        <p className="min-w-0 text-[14px] text-muted">
                          Désactivé : projet de démonstration, aucune donnée n’est transmise.
                        </p>
                      </div>
                    </Piece>
                  </Calepinage>
                </fieldset>
              </form>
            </Panneau>
          </EnScene>
        </Feuille>
      </section>

      <section className="mt-[var(--section-y)]">
        <Feuille>
          <EnScene>
            <Panneau numero="PL-32" titre="Conditions">
              <Calepinage className="md:grid-cols-3">
                <Piece x={0.16}>
                  <p className="surtitre">Zone d’intervention</p>
                  <p className="mt-3 text-[15px] leading-relaxed text-muted">
                    60 km autour de l’atelier pour la pose. Au-delà, l’ouvrage part monté à blanc
                    et la pose est chiffrée à part.
                  </p>
                </Piece>
                <Piece x={0.5}>
                  <p className="surtitre">Délais</p>
                  <dl className="mt-3 text-[14px]">
                    {[
                      ['Métré', 'sous 10 jours'],
                      ['Étude et plan', '10 à 15 jours'],
                      ['Fabrication', '5 à 7 semaines'],
                      ['Pose', '2 à 5 jours'],
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
                <Piece x={0.84}>
                  <p className="surtitre">Ce que couvre le devis</p>
                  <p className="mt-3 text-[15px] leading-relaxed text-muted">
                    Matière, quincaillerie, finition, montage à blanc à l’atelier, livraison et
                    pose. Le plan d’exécution est fourni ; il reste la référence en cas de
                    désaccord.
                  </p>
                  <Cote className="mt-5" valeur="indice C" />
                </Piece>
              </Calepinage>
            </Panneau>
          </EnScene>
        </Feuille>
      </section>

      <section className="mt-[var(--section-y)]">
        <Feuille>
          <EnScene>
            <Panneau numero="PL-33" titre="Avant d’envoyer">
              <Calepinage className="md:grid-cols-[1.4fr_1fr]">
                <Piece x={0.3}>
                  <h2 className="titre titre-section">Regardez d’abord les essences</h2>
                  <p className="lisible mt-4 text-[16px] leading-relaxed text-muted">
                    Arriver au métré avec une idée de l’essence fait gagner une semaine sur
                    l’étude, et parfois beaucoup plus sur le budget : entre le douglas et le noyer,
                    le prix de la matière va de un à six.
                  </p>
                </Piece>
                <Piece x={0.8} fond>
                  <ul>
                    <li>
                      <Lien
                        href="/essences/"
                        className="lien-plan flex min-h-11 items-center text-[15px]"
                      >
                        Les sept essences
                      </Lien>
                    </li>
                    <li>
                      <Lien
                        href="/agencements/"
                        className="lien-plan flex min-h-11 items-center text-[15px]"
                      >
                        Les cinq ouvrages
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
