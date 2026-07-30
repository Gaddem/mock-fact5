// Prepare les cinq photos du site : telechargement de la source, recadrage,
// traitement maison cuit dans le fichier, puis cinq largeurs en WebP.
//
// Le build ne depend jamais du reseau : ce script ne tourne qu'a la main
// (`npm run images`) et ce sont ses sorties qui sont versionnees.
//
// Le traitement est CUIT dans le fichier et jamais pose en filter CSS : un
// filtre sur une grande image la re-rasterise a chaque frame des qu'elle bouge.

import { mkdir, readFile, writeFile, stat } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'

const racine = path.resolve(import.meta.dirname, '..')
const dossierSources = path.join(racine, 'sources')
const dossierSortie = path.join(racine, 'public', 'images')

// Doit rester aligne sur imageSizes + deviceSizes de next.config.ts.
const LARGEURS = [384, 768, 1200, 1800, 2400]

// La qualite escalade PAR VARIANTE : une petite variante n'a pas besoin de la
// qualite qui fait tenir la grande, et l'y appliquer double son poids pour rien.
const QUALITE = { 384: 70, 768: 74, 1200: 76, 1800: 78, 2400: 80 }
const BUDGET_KO = { 384: 45, 768: 130, 1200: 280, 1800: 520, 2400: 850 }

const FOND = { r: 0x1c, g: 0x17, b: 0x14 }

const PHOTOS = [
  {
    nom: 'le-trace',
    fichier: '10126390.jpg',
    url: 'https://images.pexels.com/photos/10126390/pexels-photo-10126390.jpeg',
    page: 'https://www.pexels.com/photo/10126390/',
    recadrage: { left: 0, top: 1500, width: 3648, height: 3200 },
    sujet: 'Gabarits traces au crayon sur des panneaux, pointes de reperage plantees le long du trace.',
    luminosite: 0.46,
    note: "Ecriture manuscrite verifiee au zoom : hors focale, illisible, aucun nom d'entreprise ni de client.",
  },
  {
    nom: 'le-debit',
    fichier: '10119308.jpg',
    url: 'https://images.pexels.com/photos/10119308/pexels-photo-10119308.jpeg',
    page: 'https://www.pexels.com/photo/10119308/',
    recadrage: { left: 0, top: 2450, width: 3648, height: 3000 },
    sujet: 'Des pieces sortent du panneau, sciure de coupe autour des traits.',
    luminosite: 0.5,
    note: "Recadree sous la broche : sa plaque signaletique porte une marque et un marquage CE lisibles. Le point sombre sur la piece est une vis de bridage, pas un marquage.",
  },
  {
    nom: 'la-surface',
    fichier: '10117713.jpg',
    url: 'https://images.pexels.com/photos/10117713/pexels-photo-10117713.jpeg',
    page: 'https://www.pexels.com/photo/10117713/',
    recadrage: { left: 0, top: 6330, width: 2900, height: 970 },
    sujet: 'Plan de travail en bois massif fini, fil et satine en lumiere rasante.',
    luminosite: 0.72,
    note: "Recadree en bas a gauche : la cuisine, les etageres, la vaisselle, le plateau pose sur le plan et les facades peintes en bleu-vert sont tous hors cadre.",
  },
  {
    nom: 'avives-empiles',
    fichier: '8817831.jpg',
    url: 'https://images.pexels.com/photos/8817831/pexels-photo-8817831.jpeg',
    page: 'https://www.pexels.com/photo/8817831/',
    recadrage: { left: 0, top: 1100, width: 3648, height: 3000 },
    sujet: 'Avives empiles sur chant, noeuds et fil visibles sur les tranches rabotees.',
    luminosite: 0.54,
    note: 'Aucun recadrage necessaire hors mise au format paysage.',
  },
  {
    nom: 'stock-debite',
    fichier: '18420594.jpg',
    url: 'https://images.pexels.com/photos/18420594/pexels-photo-18420594.jpeg',
    page: 'https://www.pexels.com/photo/18420594/',
    recadrage: { left: 0, top: 1500, width: 3040, height: 2530 },
    sujet: 'Stock debite : tourillons et tasseaux ranges sur rack, bois de bout en masse.',
    luminosite: 0.85,
    note: 'Recadree pour ecarter la charpente metallique du plafond et les luminaires.',
  },
]

const ECARTEES = [
  ['7480716', 'Personne au premier plan (chevelure, main) et ecran de commande en arriere-plan.'],
  ['5974289', 'Personne au premier plan : tete et deux mains.'],
  ['6568679', "Personnes au premier plan, et etiquette produit lisible sur l'echantillon."],
  ['14805031', "Machine plein cadre. La seule zone exploitable fait 1300 px de large, sous le seuil de 2800."],
  ['28231722', 'Bandes abrasives au premier plan, marquage imprime lisible dessus.'],
  ['20313125', "Buches de chauffage. Un menuisier ne stocke pas de bois de feu."],
  ['12657188', 'Buches de chauffage en exterieur, ciel bleu plein cadre qui contredit la palette.'],
  ['7055821', "Charpente. Ce n'est pas le metier : un agenceur ne vend pas de ferme de toit."],
  ['33530702', "Menuiserie exterieure sur mur de pierre. Hors du recit, qui est l'agencement interieur."],
]

async function source(photo) {
  const chemin = path.join(dossierSources, photo.fichier)
  if (!existsSync(chemin)) {
    process.stdout.write(`  telechargement ${photo.fichier}\n`)
    const reponse = await fetch(photo.url)
    if (!reponse.ok) throw new Error(`${photo.url} : ${reponse.status}`)
    await mkdir(dossierSources, { recursive: true })
    await writeFile(chemin, Buffer.from(await reponse.arrayBuffer()))
  }
  return readFile(chemin)
}

// Desaturation et assombrissement, puis voile de la couleur de fond. Le duotone
// est le geste des projets 1 et 2, et il effacerait le sujet : sur ce site une
// photo doit se lire comme ce qu'elle montre, pas comme une matiere coloree.
function traiter(entree, largeur, hauteur, luminosite) {
  const voile = {
    create: { width: largeur, height: hauteur, channels: 4, background: { ...FOND, alpha: 0.28 } },
  }
  return sharp(entree)
    .resize(largeur, hauteur, { fit: 'cover' })
    .modulate({ brightness: luminosite, saturation: 0.55 })
    .composite([{ input: voile, blend: 'over' }])
}

// Vignette de partage : dessinee, pas photographiee — c'est le parti pris du
// site, et une photo de banque en 1200x630 ne dirait rien de plus.
async function vignette() {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#1C1714"/>
  <rect x="48" y="48" width="1104" height="534" fill="none" stroke="#382F27"/>
  <g stroke="#5B8AD6" fill="#5B8AD6">
    <line x1="96" y1="140" x2="1104" y2="140"/>
    <path d="M96 140 l14 -5 v10 z"/><path d="M1104 140 l-14 -5 v10 z"/>
    <line x1="96" y1="132" x2="96" y2="148"/><line x1="1104" y1="132" x2="1104" y2="148"/>
  </g>
  <g stroke="#A79684" fill="none">
    <line x1="96" y1="430" x2="1104" y2="430"/>
    <line x1="96" y1="430" x2="96" y2="502"/>
    <line x1="352" y1="430" x2="352" y2="502"/>
    <line x1="608" y1="430" x2="608" y2="502"/>
    <line x1="864" y1="430" x2="864" y2="502"/>
    <line x1="1104" y1="430" x2="1104" y2="502"/>
    <line x1="96" y1="502" x2="1104" y2="502"/>
  </g>
  <text x="96" y="118" fill="#A79684" font-family="sans-serif" font-size="20" letter-spacing="4">PL-01  ATELIER DE MENUISERIE</text>
  <text x="96" y="330" fill="#F0E8DA" font-family="sans-serif" font-size="122" font-weight="700" letter-spacing="-2">Bois <tspan fill="#C9A876">de</tspan> Bout</text>
  <text x="96" y="392" fill="#A79684" font-family="sans-serif" font-size="30">Menuiserie et agencement sur mesure</text>
  <text x="96" y="556" fill="#A79684" font-family="sans-serif" font-size="19" letter-spacing="3">ECHELLE 1:20   UNITES MM   INDICE C</text>
</svg>`
  await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(path.join(dossierSortie, 'partage.png'))
  process.stdout.write('partage.png  1200x630\n')
}

// Icone d'onglet : le panneau chanfreine ouvert par son trait de coupe, reduit
// a ce qui reste lisible a 16 px. Sans elle, le navigateur demande /favicon.ico
// et recolte une 404 visible en console.
async function icone() {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="0 0 64 64">
  <rect width="64" height="64" fill="#1C1714"/>
  <path d="M14 8 H50 V44 L44 50 H14 Z" fill="none" stroke="#C9A876" stroke-width="4"/>
  <rect x="8" y="27" width="48" height="7" fill="#1C1714"/>
  <rect x="8" y="30" width="48" height="2" fill="#5B8AD6"/>
</svg>`
  await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(path.join(racine, 'app', 'icon.png'))
  process.stdout.write('app/icon.png  256x256\n')
}

async function main() {
  await mkdir(dossierSortie, { recursive: true })
  const journal = []
  await vignette()
  await icone()

  for (const photo of PHOTOS) {
    const brut = await source(photo)
    const meta = await sharp(brut).metadata()
    const r = photo.recadrage
    if (r.left + r.width > meta.width || r.top + r.height > meta.height) {
      throw new Error(`${photo.nom} : recadrage hors de la source ${meta.width}x${meta.height}`)
    }

    // Une seule extraction, gardee en memoire : relire un fichier que sharp
    // tient encore ouvert fait echouer la reecriture sous Windows.
    const recadree = await sharp(brut).extract(r).toBuffer()
    const ratio = r.height / r.width
    process.stdout.write(`${photo.nom}  source ${meta.width}x${meta.height}  recadre ${r.width}x${r.height}\n`)

    for (const largeur of LARGEURS) {
      if (largeur > r.width) {
        journal.push(`  OMIS ${photo.nom}-${largeur} : la source recadree ne fait que ${r.width} px`)
        continue
      }
      const hauteur = Math.round(largeur * ratio)
      const tampon = await traiter(recadree, largeur, hauteur, photo.luminosite)
        .webp({ quality: QUALITE[largeur], effort: 6 })
        .toBuffer()
      const destination = path.join(dossierSortie, `${photo.nom}-${largeur}.webp`)
      await writeFile(destination, tampon)

      // Mesure sur le fichier produit, variante par variante.
      const produit = await sharp(await readFile(destination)).metadata()
      const ko = Math.round((await stat(destination)).size / 1024)
      if (produit.width !== largeur) {
        throw new Error(`${photo.nom}-${largeur} : largeur reelle ${produit.width}`)
      }
      const alerte = ko > BUDGET_KO[largeur] ? `  DEPASSE le budget de ${BUDGET_KO[largeur]} Ko` : ''
      process.stdout.write(`  ${largeur}w  ${produit.width}x${produit.height}  ${ko} Ko${alerte}\n`)
      if (alerte) journal.push(`  ${photo.nom}-${largeur} : ${ko} Ko pour un budget de ${BUDGET_KO[largeur]} Ko`)
    }
  }

  const credits = [
    '# Credits photographiques',
    '',
    'Cinq photographies pour six emplacements. Toutes sous licence Pexels.',
    'la-surface est la SEULE reprise du site — le cadre en autorise une, pas deux, et',
    'jamais deux fois sur la meme page. Elle sert la finition sur /agencements et la',
    'meme finition en fin de sequence d atelier sur l accueil.',
    'Chacune est recadree et retraitee au build ; le binaire distant n est jamais servi tel quel.',
    '',
    '## Retenues',
    '',
    ...PHOTOS.flatMap((p) => [
      `### ${p.nom}`,
      '',
      `- source : ${p.page}`,
      `- fichier d origine : ${p.url}`,
      `- recadrage : ${p.recadrage.width}x${p.recadrage.height} a partir de (${p.recadrage.left}, ${p.recadrage.top})`,
      `- sujet : ${p.sujet}`,
      `- ${p.note}`,
      '',
    ]),
    '## Ecartees apres examen en entier',
    '',
    'Quatorze candidates examinees, neuf ecartees. Les motifs sont conserves pour que',
    'la session suivante sache ce qui a deja ete regarde.',
    '',
    ...ECARTEES.map(([id, motif]) => `- \`${id}\` — ${motif}`),
    '',
    '## Emplacements sans candidate acceptable',
    '',
    "Trois emplacements prevus au brief n ont trouve aucune candidate. Deux ont change",
    'de sujet, le troisieme a disparu — aucun n a ete bricole.',
    '',
    '- « bois de bout » (accueil, bande 1) : les seules images de bois de bout du lot etaient',
    '  du bois de chauffage. L emplacement devient « le trace sur panneau ».',
    '- « copeaux de rabot » (accueil, bande 2) : aucune candidate. Devient « le debit ».',
    '- « detail d assemblage », « arete usinee » et « feuilles de placage » (/agencements) :',
    '  aucune candidate pour les trois. La page garde un seul bandeau ; ses ouvrages sont',
    '  montres en elevation cotee, ce qui etait deja le parti pris du projet.',
    '',
  ].join('\n')
  await writeFile(path.join(racine, 'CREDITS.md'), credits)

  process.stdout.write(journal.length ? `\nJournal :\n${journal.join('\n')}\n` : '\nAucune omission, aucun depassement.\n')
}

main().catch((erreur) => {
  process.stderr.write(`${erreur.message}\n`)
  process.exit(1)
})
