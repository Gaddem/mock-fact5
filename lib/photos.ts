// Le chargeur maison a besoin du NOM du fichier pour retrouver ses variantes :
// un import statique ne lui donnerait qu'une URL hachee. Passer par cet objet
// plutot que par des chaines libres dans les pages rend la faute de frappe
// visible a la compilation.
//
// Les dimensions sont celles du recadrage produit par scripts/preparer-images.mjs.

export type Photo = {
  src: string
  largeur: number
  hauteur: number
  alt: string
}

export const PHOTOS = {
  leTrace: {
    src: '/images/le-trace.webp',
    largeur: 3648,
    hauteur: 3200,
    alt: 'Gabarits tracés au crayon sur des panneaux, des pointes de repérage plantées le long du tracé.',
  },
  leDebit: {
    src: '/images/le-debit.webp',
    largeur: 3648,
    hauteur: 3000,
    alt: "Une pièce se dégage du panneau sous l'outil, la sciure de coupe reste le long du trait.",
  },
  laSurface: {
    src: '/images/la-surface.webp',
    largeur: 2900,
    hauteur: 970,
    alt: 'Plan de travail en bois massif fini, le fil et le satiné pris en lumière rasante.',
  },
  avivesEmpiles: {
    src: '/images/avives-empiles.webp',
    largeur: 3648,
    hauteur: 3000,
    alt: 'Avivés empilés sur chant, nœuds et fil visibles sur les tranches rabotées.',
  },
  stockDebite: {
    src: '/images/stock-debite.webp',
    largeur: 3040,
    hauteur: 2530,
    alt: 'Stock débité rangé sur rack : tourillons et tasseaux vus par le bout.',
  },
} satisfies Record<string, Photo>
