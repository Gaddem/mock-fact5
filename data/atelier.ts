export type Famille = {
  reference: string
  nom: string
  unite: string
  prix: string
  texte: string
}

export const FAMILLES: Famille[] = [
  {
    reference: 'A',
    nom: 'Bibliothèque et rangement mural',
    unite: 'au mètre linéaire',
    prix: 'à partir de 890 €/ml',
    texte:
      'Montants pris du sol au plafond, tablettes recoupées au niveau réel de la pièce. Chants plaqués ou massif rapporté selon la portée.',
  },
  {
    reference: 'B',
    nom: 'Dressing et penderie',
    unite: 'au mètre linéaire',
    prix: 'à partir de 640 €/ml',
    texte:
      'Aménagement intérieur seul ou avec façades. Tiroirs sur coulisses à sortie totale, penderies à hauteur réglée sur ce qui y sera pendu.',
  },
  {
    reference: 'C',
    nom: 'Cuisine et plan de travail',
    unite: 'au ml pour les meubles, au m² pour le plan',
    prix: 'à partir de 1 450 €/ml',
    texte:
      'Caissons, façades et plan massif ou plaqué. Découpes d’évier et de plaque faites à l’atelier sur le relevé, jamais sur site.',
  },
  {
    reference: 'D',
    nom: 'Escalier et garde-corps',
    unite: 'à l’ouvrage',
    prix: 'à partir de 6 800 €',
    texte:
      'Droit, quart tournant, limons apparents ou crémaillère. Hauteur de marche calculée sur la hauteur à franchir mesurée, pas sur un standard.',
  },
  {
    reference: 'E',
    nom: 'Agencement professionnel',
    unite: 'sur métré',
    prix: 'chiffrage à l’ouvrage',
    texte:
      'Banque d’accueil, comptoir, présentoirs, habillage mural. Pose de nuit ou en fermeture possible pour un commerce en activité.',
  },
]

export type Etape = {
  numero: string
  nom: string
  texte: string
  delai: string
}

export const ETAPES: Etape[] = [
  {
    numero: '01',
    nom: 'Métré',
    texte:
      'Relevé contradictoire sur place. On mesure les faux aplombs, les faux équerrages et le dévers du sol — ce sont eux qui décident des jeux à prévoir, pas la cote nominale du plan d’architecte.',
    delai: 'une demi-journée sur site',
  },
  {
    numero: '02',
    nom: 'Plan d’exécution',
    texte:
      'Élévations cotées, coupes, calepinage des panneaux et nomenclature de quincaillerie. Le plan part en validation et revient indicé ; rien n’est débité avant.',
    delai: '10 à 15 jours après le métré',
  },
  {
    numero: '03',
    nom: 'Débit et corroyage',
    texte:
      'Les pièces sont calepinées dans le panneau pour perdre le moins de matière possible, puis dégauchies, rabotées, mises à largeur et à longueur. Le bois repose entre les passes.',
    delai: 'compris dans la fabrication',
  },
  {
    numero: '04',
    nom: 'Assemblage et finition',
    texte:
      'Tenon et mortaise sur les bâtis, tourillon ou lamello sur les caissons, queue d’aronde sur les tiroirs qui la méritent. Placage et chant plaqué, puis huile-cire ou vernis.',
    delai: '5 à 7 semaines après validation',
  },
  {
    numero: '05',
    nom: 'Pose',
    texte:
      'Calage, scribage des joues sur le mur, réglage des ferrures, joint de finition. L’ouvrage arrive monté à blanc : on ne découvre rien sur place.',
    delai: '2 à 5 jours selon l’ouvrage',
  },
]

export type Fourniture = {
  domaine: string
  marque: string
  references: string
  texte: string
}

export const FOURNITURES: Fourniture[] = [
  {
    domaine: 'Quincaillerie',
    marque: 'Talvec',
    references: 'coulisse T90 · charnière C110 · ferrure R40',
    texte:
      'Coulisses à sortie totale données pour 40 kg, charnières à amortisseur intégré, ferrure de porte coulissante à rail haut.',
  },
  {
    domaine: 'Panneaux',
    marque: 'Fibralam',
    references: 'latté peuplier 19 · MDF hydro 19 · CP bouleau 18',
    texte:
      'Latté pour les grandes portées, MDF hydrofuge partout où il y a de l’eau, contreplaqué bouleau pour les fonds et les tiroirs.',
  },
  {
    domaine: 'Colles',
    marque: 'Ombrelin',
    references: 'V300 (vinylique D3) · U40 (polyuréthane)',
    texte:
      'D3 pour tout ce qui reste au sec, polyuréthane dès qu’une pièce voit l’humidité ou une variation de température.',
  },
  {
    domaine: 'Vernis',
    marque: 'Ondelac',
    references: 'PU21 bi-composant mat',
    texte:
      'Deux couches avec égrenage entre les deux. Réservé aux plans très sollicités : ailleurs l’huile-cire se répare, le vernis se refait.',
  },
  {
    domaine: 'Huiles-cires',
    marque: 'Cirandel',
    references: 'HC7 (dure) · E2 (entretien)',
    texte:
      'Finition par défaut de l’atelier. Une reprise localisée suffit à effacer une trace ; le pot d’entretien part avec l’ouvrage.',
  },
  {
    domaine: 'Visserie',
    marque: 'Torvis',
    references: 'torx T20 zinguée · tirefond M8 · cheville à expansion',
    texte:
      'Inox obligatoire au contact du châtaignier : ses tanins font couler l’acier zingué en traînées noires en quelques semaines.',
  },
]
