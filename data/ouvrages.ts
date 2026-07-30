export type Ligne = { poste: string; valeur: string }

export type Ouvrage = {
  reference: string
  nom: string
  contexte: string
  elevation: 'bibliotheque' | 'dressing' | 'cuisine' | 'escalier' | 'banque'
  cotes: string
  texte: string
  nomenclature: Ligne[]
  delai: string
  prix: string
  ratio: string
}

export const OUVRAGES: Ouvrage[] = [
  {
    reference: 'PL-11',
    nom: 'Bibliothèque de bout en bout',
    contexte: 'Salon de maison de ville, mur de refend, plafond en pente sur 40 cm',
    elevation: 'bibliotheque',
    cotes: '4 260 × 2 780 × 340 mm',
    texte:
      'Sept travées inégales : la largeur de chacune est celle qui tombait juste dans le panneau, pas une largeur décidée d’avance. Les tablettes sont en chêne massif de 27 mm au-delà de 900 mm de portée, en panneau plaqué à chant massif en dessous — au-delà, un panneau fléchit et cela se voit à l’œil au bout d’un an.',
    nomenclature: [
      { poste: 'Essence', valeur: 'Chêne, avivé 27 mm' },
      { poste: 'Panneau', valeur: 'Fibralam latté peuplier 19 mm, plaqué chêne deux faces' },
      { poste: 'Chants', valeur: 'Massif rapporté 8 mm sur les tablettes, chant plaqué sur les joues' },
      { poste: 'Assemblages', valeur: 'Tenon et mortaise sur les montants, tourillon sur les traverses' },
      { poste: 'Finition', valeur: 'Cirandel HC7, deux couches, égrenage entre les deux' },
      { poste: 'Quincaillerie', valeur: 'Aucune apparente. Fixation murale par tirefonds Torvis M8' },
    ],
    delai: 'Étude 12 j · Fabrication 6 sem. · Pose 3 j',
    prix: '6 400 €',
    ratio: '1 500 €/ml',
  },
  {
    reference: 'PL-12',
    nom: 'Dressing d’angle',
    contexte: 'Chambre sous comble, mur de 3,18 m avec un retour de 1,40 m',
    elevation: 'dressing',
    cotes: '3 180 × 2 450 × 600 mm',
    texte:
      'Aménagement intérieur seul, sans façade : le client voulait voir ses affaires. L’angle est traité en penderie profonde plutôt qu’en étagères, parce qu’un angle d’étagère est un endroit où l’on ne va jamais chercher. Tiroirs à fond bouleau, coulisses à sortie totale pour atteindre le fond sans se baisser.',
    nomenclature: [
      { poste: 'Essence', valeur: 'Frêne, panneau plaqué frêne' },
      { poste: 'Panneau', valeur: 'Fibralam MDF 19 mm plaqué, fonds de tiroir CP bouleau 12 mm' },
      { poste: 'Chants', valeur: 'Chant plaqué frêne 2 mm, colle Ombrelin V300' },
      { poste: 'Assemblages', valeur: 'Lamello sur les caissons, queue d’aronde sur les huit tiroirs' },
      { poste: 'Finition', valeur: 'Cirandel HC7, une couche, frêne laissé clair' },
      { poste: 'Quincaillerie', valeur: 'Coulisses Talvec T90, barres de penderie ovales' },
    ],
    delai: 'Étude 10 j · Fabrication 5 sem. · Pose 2 j',
    prix: '3 250 €',
    ratio: '1 020 €/ml',
  },
  {
    reference: 'PL-13',
    nom: 'Cuisine en L, meubles bas et plan massif',
    contexte: 'Maison ancienne, sol en dévers de 22 mm sur 4,80 m',
    elevation: 'cuisine',
    cotes: '4 800 mm de linéaire · plan 3,8 m²',
    texte:
      'Le dévers du sol a été rattrapé sur les pieds réglables, pas sur le plan : un plan de travail qui suit le sol se voit au premier verre posé dessus. Découpes d’évier et de plaque faites à l’atelier d’après le relevé, avec les rayons d’angle demandés par les notices — une découpe faite sur site dans un plan massif de 40 mm ne pardonne rien.',
    nomenclature: [
      { poste: 'Essence', valeur: 'Chêne, plan massif 40 mm en lamelles collées à fil vertical' },
      { poste: 'Panneau', valeur: 'Fibralam MDF hydrofuge 19 mm pour les caissons' },
      { poste: 'Chants', valeur: 'Massif 20 mm sur les façades, chant plaqué à l’intérieur' },
      { poste: 'Assemblages', valeur: 'Tourillon et vis Torvis T20 en fond de caisson' },
      { poste: 'Finition', valeur: 'Ondelac PU21 mat sur le plan, Cirandel HC7 sur les façades' },
      { poste: 'Quincaillerie', valeur: 'Charnières Talvec C110, coulisses T90, pieds réglables 100-130 mm' },
    ],
    delai: 'Étude 15 j · Fabrication 7 sem. · Pose 4 j',
    prix: '12 700 €',
    ratio: '2 645 €/ml, plan compris',
  },
  {
    reference: 'PL-14',
    nom: 'Escalier droit à limons apparents',
    contexte: 'Trémie existante de 2 400 × 900 mm, hauteur à franchir 2 940 mm',
    elevation: 'escalier',
    cotes: '14 marches · giron 265 mm · hauteur 210 mm',
    texte:
      'La hauteur de marche sort de la hauteur réellement mesurée divisée par quatorze, pas d’un standard : 2 940 / 14 = 210 mm exactement, et le giron suit la règle de Blondel. Les limons sont entaillés à la défonceuse sur gabarit, marches et contremarches assemblées à rainure et collées.',
    nomenclature: [
      { poste: 'Essence', valeur: 'Chêne, limons 55 mm, marches 40 mm' },
      { poste: 'Panneau', valeur: 'Aucun. Tout massif' },
      { poste: 'Chants', valeur: 'Nez de marche arrondi au rayon 8 mm' },
      { poste: 'Assemblages', valeur: 'Entailles sur gabarit, rainure et languette, colle Ombrelin U40' },
      { poste: 'Finition', valeur: 'Ondelac PU21 mat, trois couches sur les marches' },
      { poste: 'Quincaillerie', valeur: 'Tirefonds Torvis M8 en pied et en tête, équerres masquées' },
    ],
    delai: 'Étude 15 j · Fabrication 6 sem. · Pose 3 j',
    prix: '9 400 €',
    ratio: '671 € la marche',
  },
  {
    reference: 'PL-15',
    nom: 'Banque d’accueil avec retour',
    contexte: 'Commerce en activité, pose faite en une nuit de fermeture',
    elevation: 'banque',
    cotes: '2 600 × 1 100 × 700 mm, retour 900 mm',
    texte:
      'Le plateau haut est en noyer, le bâti et le retour en châtaignier — deux essences pour deux fonctions, et une différence de prix au m² qui va de un à trois. Toute la visserie au contact du châtaignier est en inox : ses tanins font couler l’acier zingué en traînées noires en quelques semaines.',
    nomenclature: [
      { poste: 'Essence', valeur: 'Noyer sur le plateau, châtaignier sur le bâti et le retour' },
      { poste: 'Panneau', valeur: 'Fibralam latté peuplier 19 mm plaqué noyer sur les joues' },
      { poste: 'Chants', valeur: 'Massif noyer 25 mm chanfreiné à 45° sur le nez du plateau' },
      { poste: 'Assemblages', valeur: 'Tenon et mortaise, montage à blanc complet à l’atelier' },
      { poste: 'Finition', valeur: 'Ondelac PU21 mat sur le plateau, Cirandel HC7 sur le bâti' },
      { poste: 'Quincaillerie', valeur: 'Visserie inox uniquement, passe-câbles, coulisses Talvec T90' },
    ],
    delai: 'Étude 12 j · Fabrication 5 sem. · Pose 1 nuit',
    prix: '5 800 €',
    ratio: '2 230 €/ml',
  },
]
