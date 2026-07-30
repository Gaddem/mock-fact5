export type Essence = {
  reference: string
  nom: string
  densite: string
  monnin: string
  stabilite: string
  teinte: string
  emploi: string
  prix: string
  note: string
}

// Densités à 12 % d'humidité, dureté Monnin en N/mm². Prix indicatifs de
// l'avivé de 27 mm, au mètre carré, hors chute et hors corroyage.
export const ESSENCES: Essence[] = [
  {
    reference: '01',
    nom: 'Chêne',
    densite: '720 kg/m³',
    monnin: '4,2',
    stabilite: 'Moyenne',
    teinte: 'Miel, fonce nettement les deux premières années',
    emploi: 'Tout ouvrage, y compris plan de travail et marche d’escalier',
    prix: '148 €/m²',
    note: 'Ses tanins réagissent au fer : visserie inox ou laiton dès qu’il y a de l’humidité.',
  },
  {
    reference: '02',
    nom: 'Frêne',
    densite: '700 kg/m³',
    monnin: '4,0',
    stabilite: 'Nerveux',
    teinte: 'Blanc crème, veine très marquée',
    emploi: 'Façades, dressings, pièces cintrées',
    prix: '122 €/m²',
    note: 'Se cintre mieux que tout le reste de la liste. En revanche il travaille : jeux augmentés de 2 mm sur les grandes portes.',
  },
  {
    reference: '03',
    nom: 'Noyer',
    densite: '670 kg/m³',
    monnin: '3,8',
    stabilite: 'Très stable',
    teinte: 'Brun violacé, s’éclaircit à la lumière',
    emploi: 'Façades, plateaux, banques d’accueil, détail',
    prix: '395 €/m²',
    note: 'Le prix commande l’usage : on le met là où on le touche, en placage ailleurs.',
  },
  {
    reference: '04',
    nom: 'Châtaignier',
    densite: '590 kg/m³',
    monnin: '2,8',
    stabilite: 'Stable',
    teinte: 'Blond gris, proche du chêne en moins dense',
    emploi: 'Bibliothèques, habillages muraux, bâtis',
    prix: '134 €/m²',
    note: 'Tanins très agressifs. Toute fixation en acier zingué coule en traînées noires en quelques semaines : inox obligatoire.',
  },
  {
    reference: '05',
    nom: 'Hêtre',
    densite: '710 kg/m³',
    monnin: '4,0',
    stabilite: 'Très nerveux',
    teinte: 'Rose pâle, très uniforme',
    emploi: 'Intérieurs de meuble, côtés et fonds de tiroir',
    prix: '96 €/m²',
    note: 'Jamais en pièce humide ni en façade exposée à un radiateur : il tuile et il fend.',
  },
  {
    reference: '06',
    nom: 'Douglas',
    densite: '540 kg/m³',
    monnin: '3,0',
    stabilite: 'Moyenne',
    teinte: 'Rose saumon, nœuds francs assumés',
    emploi: 'Habillages, étagères d’atelier, structures apparentes',
    prix: '62 €/m²',
    note: 'Résineux : il dégorge encore après finition sur les nœuds. Une couche d’isolant avant vernis, sinon ça traverse.',
  },
  {
    reference: '07',
    nom: 'Mélèze',
    densite: '590 kg/m³',
    monnin: '3,4',
    stabilite: 'Bonne pour un résineux',
    teinte: 'Brun rosé, cerne très dessiné',
    emploi: 'Habillage, menuiserie exposée, classe d’emploi 3',
    prix: '78 €/m²',
    note: 'Tient en classe 3 sans traitement, ce qu’aucune autre essence de cette liste ne fait.',
  },
]
