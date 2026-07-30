import type { ReactNode } from 'react'

// Elevations dessinees plutot que photographiees : c'est ainsi qu'un agencement
// se vend et se valide. Traits fins a epaisseur constante quelle que soit
// l'echelle, lignes de cote avec leurs fleches, hachures sur les sections
// coupees. Aucun aplat, aucune ombre, aucun degrade.

const TRAIT = { stroke: 'currentColor', strokeWidth: 1, vectorEffect: 'non-scaling-stroke' } as const

function Cadre({
  viewBox,
  label,
  hachureId,
  children,
}: {
  viewBox: string
  label: string
  hachureId: string
  children: ReactNode
}) {
  return (
    <svg
      viewBox={viewBox}
      role="img"
      aria-label={label}
      preserveAspectRatio="xMidYMid meet"
      className="block h-auto w-full text-muted"
    >
      <defs>
        <pattern
          id={hachureId}
          width="7"
          height="7"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(45)"
        >
          <line x1="0" y1="0" x2="0" y2="7" stroke="currentColor" strokeWidth="1.1" opacity="0.55" />
        </pattern>
      </defs>
      {children}
    </svg>
  )
}

// La valeur d'une cote INTERROMPT sa ligne, exactement comme sur un plan : sans
// cette reserve, les chiffres se posent sur les fleches des petites cotes et sur
// les hachures, et le contraste tombe a 1,1:1 — mesure sur les pixels rendus.
function Reserve({ x, y, texte }: { x: number; y: number; texte: string }) {
  const largeur = texte.length * 4.8 + 6
  return (
    <rect
      x={x - largeur / 2}
      y={y - 5.5}
      width={largeur}
      height={11}
      fill="var(--color-fond)"
      stroke="none"
    />
  )
}

function CoteH({ x1, x2, y, texte }: { x1: number; x2: number; y: number; texte: string }) {
  const milieu = (x1 + x2) / 2
  return (
    <g className="text-accent">
      <line x1={x1} y1={y - 5} x2={x1} y2={y + 5} {...TRAIT} />
      <line x1={x2} y1={y - 5} x2={x2} y2={y + 5} {...TRAIT} />
      <line x1={x1} y1={y} x2={x2} y2={y} {...TRAIT} />
      <path d={`M${x1} ${y} l7 -2.6 v5.2 z`} fill="currentColor" />
      <path d={`M${x2} ${y} l-7 -2.6 v5.2 z`} fill="currentColor" />
      <Reserve x={milieu} y={y} texte={texte} />
      <text
        x={milieu}
        y={y + 2.8}
        textAnchor="middle"
        fontSize="8"
        fill="currentColor"
        fontFamily="var(--font-titre)"
      >
        {texte}
      </text>
    </g>
  )
}

function CoteV({ y1, y2, x, texte }: { y1: number; y2: number; x: number; texte: string }) {
  const milieu = (y1 + y2) / 2
  return (
    <g className="text-accent">
      <line x1={x - 5} y1={y1} x2={x + 5} y2={y1} {...TRAIT} />
      <line x1={x - 5} y1={y2} x2={x + 5} y2={y2} {...TRAIT} />
      <line x1={x} y1={y1} x2={x} y2={y2} {...TRAIT} />
      <path d={`M${x} ${y1} l-2.6 7 h5.2 z`} fill="currentColor" />
      <path d={`M${x} ${y2} l-2.6 -7 h5.2 z`} fill="currentColor" />
      <g transform={`rotate(-90 ${x} ${milieu})`}>
        <Reserve x={x} y={milieu} texte={texte} />
        <text
          x={x}
          y={milieu + 2.8}
          textAnchor="middle"
          fontSize="8"
          fill="currentColor"
          fontFamily="var(--font-titre)"
        >
          {texte}
        </text>
      </g>
    </g>
  )
}

function Sol({ x1, x2, y }: { x1: number; x2: number; y: number }) {
  return (
    <g>
      <line x1={x1} y1={y} x2={x2} y2={y} {...TRAIT} />
      {Array.from({ length: Math.floor((x2 - x1) / 9) }, (_, i) => (
        <line
          key={i}
          x1={x1 + i * 9}
          y1={y}
          x2={x1 + i * 9 - 5}
          y2={y + 5}
          {...TRAIT}
          opacity="0.5"
        />
      ))}
    </g>
  )
}

/* ------------------------------------------------------------ bibliotheque */

function Bibliotheque() {
  const montants = [0, 68, 128, 196, 250, 320, 372, 426]
  const tablettes: Record<number, number[]> = {
    0: [62, 118, 176, 232],
    1: [48, 104, 168, 214, 244],
    2: [70, 140, 205],
    3: [56, 112, 168, 224],
    4: [86, 172, 236],
    5: [64, 128, 192],
    6: [92, 168],
  }
  return (
    <Cadre
      viewBox="-34 -18 494 330"
      hachureId="hach-bib"
      label="Élévation cotée d'une bibliothèque toute hauteur de 4 260 mm par 2 780 mm, sept travées inégales sous un plafond en pente sur les 400 derniers millimètres."
    >
      <g data-phase="1">
        <path d="M0 278 L0 0 L346 0 L426 40 L426 278" fill="none" {...TRAIT} />
        {montants.map((x) => (
          <line key={x} x1={x} y1={x >= 346 ? (x - 346) / 2 : 0} x2={x} y2={278} {...TRAIT} />
        ))}
      </g>
      <g data-phase="2">
        {montants.slice(0, -1).map((x, i) =>
          (tablettes[i] ?? []).map((y) => (
            <line
              key={`${x}-${y}`}
              x1={x}
              y1={278 - y}
              x2={montants[i + 1]}
              y2={278 - y}
              {...TRAIT}
            />
          )),
        )}
      </g>
      <g data-phase="3">
        {/* Section coupee du montant de rive : hachuree, comme sur un plan. */}
        <rect x="0" y="0" width="6" height="278" fill="url(#hach-bib)" stroke="none" />
        <rect x="420" y="40" width="6" height="238" fill="url(#hach-bib)" stroke="none" />
        <Sol x1={-14} x2={440} y={278} />
      </g>
      <g data-phase="4">
        <CoteH x1={0} x2={426} y={300} texte="4 260" />
        <CoteV y1={0} y2={278} x={-18} texte="2 780" />
        <CoteH x1={346} x2={426} y={-10} texte="400" />
      </g>
    </Cadre>
  )
}

/* ---------------------------------------------------------------- dressing */

function Dressing() {
  return (
    <Cadre
      viewBox="-34 -14 386 300"
      hachureId="hach-dre"
      label="Élévation cotée d'un dressing d'angle de 3 180 mm par 2 450 mm : penderie profonde à gauche, huit tiroirs au centre, étagères à droite."
    >
      <g data-phase="1">
        <rect x="0" y="0" width="318" height="245" fill="none" {...TRAIT} />
        <line x1="118" y1="0" x2="118" y2="245" {...TRAIT} />
        <line x1="208" y1="0" x2="208" y2="245" {...TRAIT} />
      </g>
      <g data-phase="2">
        {/* penderie : barre ovale et hauteur libre */}
        <line x1="0" y1="52" x2="118" y2="52" {...TRAIT} />
        <ellipse cx="59" cy="60" rx="46" ry="3" fill="none" {...TRAIT} />
        <line x1="0" y1="196" x2="118" y2="196" {...TRAIT} />

        {/* huit tiroirs */}
        {Array.from({ length: 8 }, (_, i) => (
          <g key={i}>
            <rect x="118" y={12 + i * 29} width="90" height="26" fill="none" {...TRAIT} />
            <line x1="148" y1={25 + i * 29} x2="178" y2={25 + i * 29} {...TRAIT} />
          </g>
        ))}

        {/* etageres */}
        {[38, 78, 118, 158, 198].map((y) => (
          <line key={y} x1="208" y1={y} x2="318" y2={y} {...TRAIT} />
        ))}
      </g>
      <g data-phase="3">
        <rect x="0" y="239" width="318" height="6" fill="url(#hach-dre)" stroke="none" />
        <Sol x1={-14} x2={332} y={245} />
      </g>
      <g data-phase="4">
        <CoteH x1={0} x2={318} y={268} texte="3 180" />
        <CoteV y1={0} y2={245} x={-18} texte="2 450" />
        <CoteH x1={118} x2={208} y={-8} texte="900" />
      </g>
    </Cadre>
  )
}

/* ----------------------------------------------------------------- cuisine */

function Cuisine() {
  const caissons = [0, 60, 120, 210, 270, 360, 420, 480]
  return (
    <Cadre
      viewBox="-30 -16 542 172"
      hachureId="hach-cui"
      label="Élévation cotée d'une cuisine en L de 4 800 mm de linéaire : sept caissons bas, plan de travail massif de 40 mm, plinthe de 100 mm."
    >
      <g data-phase="1">
        {/* caissons */}
        <rect x="0" y="12" width="480" height="102" fill="none" {...TRAIT} />
        {caissons.slice(1, -1).map((x) => (
          <line key={x} x1={x} y1={12} x2={x} y2={114} {...TRAIT} />
        ))}
      </g>
      <g data-phase="2">
        {/* poignees gorge fraisees en haut de facade */}
        {caissons.slice(0, -1).map((x, i) => (
          <line key={x} x1={x + 8} y1={20} x2={caissons[i + 1] - 8} y2={20} {...TRAIT} />
        ))}
        {/* tiroirs sur le troisieme caisson */}
        <line x1="120" y1="48" x2="210" y2="48" {...TRAIT} />
        <line x1="120" y1="80" x2="210" y2="80" {...TRAIT} />
        {/* plinthe en retrait */}
        <line x1="10" y1="114" x2="470" y2="114" {...TRAIT} />
        <line x1="10" y1="114" x2="10" y2="126" {...TRAIT} />
        <line x1="470" y1="114" x2="470" y2="126" {...TRAIT} />
        <line x1="10" y1="126" x2="470" y2="126" {...TRAIT} />
      </g>
      <g data-phase="3">
        {/* le plan se pose en dernier sur les caissons, section hachuree */}
        <rect x="-6" y="0" width="492" height="12" fill="url(#hach-cui)" {...TRAIT} />
        <Sol x1={-16} x2={498} y={126} />
      </g>
      <g data-phase="4">
        <CoteH x1={0} x2={480} y={148} texte="4 800" />
        <CoteV y1={0} y2={12} x={-14} texte="40" />
        <CoteV y1={114} y2={126} x={498} texte="100" />
      </g>
    </Cadre>
  )
}

/* ---------------------------------------------------------------- escalier */

function Escalier() {
  const giron = 26.5
  const hauteur = 21
  const marches = 14
  const points: string[] = ['M0 294']
  for (let i = 0; i < marches; i += 1) {
    points.push(`V${294 - (i + 1) * hauteur}`)
    points.push(`h${giron}`)
  }
  return (
    <Cadre
      viewBox="-34 -18 468 356"
      hachureId="hach-esc"
      label="Coupe cotée d'un escalier droit de quatorze marches : giron de 265 mm, hauteur de marche de 210 mm, limons apparents entaillés."
    >
      <g data-phase="1">
        {/* limon bas et limon haut, paralleles au nez de marche */}
        <line
          x1="0"
          y1="294"
          x2={giron * marches}
          y2={294 - hauteur * marches}
          {...TRAIT}
          opacity="0.7"
        />
        <line x1="0" y1="316" x2={giron * marches} y2={294 - hauteur * marches + 22} {...TRAIT} />
        <line x1="0" y1="294" x2="0" y2="316" {...TRAIT} />
        <line
          x1={giron * marches}
          y1={294 - hauteur * marches}
          x2={giron * marches}
          y2={294 - hauteur * marches + 22}
          {...TRAIT}
        />
      </g>
      <g data-phase="2">
        {/* marches et contremarches, posees sur les limons entailles */}
        <path d={points.join(' ')} fill="none" {...TRAIT} />
      </g>
      <g data-phase="3">
        {/* section du limon, hachuree sur le premier metre */}
        <path
          d={`M0 294 L0 316 L${giron * 2} ${316 - hauteur * 2} L${giron * 2} ${294 - hauteur * 2} z`}
          fill="url(#hach-esc)"
          stroke="none"
        />
        <Sol x1={-14} x2={400} y={316} />
      </g>
      <g data-phase="4">
        <CoteV y1={0} y2={294} x={-18} texte="2 940" />
        <CoteH x1={0} x2={giron * marches} y={338} texte="3 710" />
        <CoteH x1={giron * 4} x2={giron * 5} y={294 - hauteur * 4 + 16} texte="265" />
      </g>
    </Cadre>
  )
}

/* ------------------------------------------------------------------ banque */

function Banque() {
  return (
    <Cadre
      viewBox="-30 -16 322 172"
      hachureId="hach-ban"
      label="Élévation cotée d'une banque d'accueil de 2 600 mm par 1 100 mm : plateau en noyer à nez chanfreiné, bâti et retour en châtaignier."
    >
      <g data-phase="1">
        {/* bati */}
        <rect x="0" y="13" width="260" height="97" fill="none" {...TRAIT} />
        <line x1="86" y1="13" x2="86" y2="110" {...TRAIT} />
        <line x1="174" y1="13" x2="174" y2="110" {...TRAIT} />
      </g>
      <g data-phase="2">
        {/* trois tiroirs sur le module central */}
        {[24, 54, 84].map((y) => (
          <rect key={y} x="86" y={y} width="88" height="24" fill="none" {...TRAIT} />
        ))}
        {/* plinthe en retrait */}
        <line x1="8" y1="110" x2="252" y2="110" {...TRAIT} />
        <line x1="8" y1="110" x2="8" y2="122" {...TRAIT} />
        <line x1="252" y1="110" x2="252" y2="122" {...TRAIT} />
        <line x1="8" y1="122" x2="252" y2="122" {...TRAIT} />
      </g>
      <g data-phase="3">
        {/* le plateau se pose en dernier, nez chanfreine a 45 degres */}
        <path d="M-8 0 L268 0 L268 8 L263 13 L-8 13 z" fill="url(#hach-ban)" {...TRAIT} />
        {/* passe-cables */}
        <circle cx="220" cy="6" r="4" fill="none" {...TRAIT} />
        <Sol x1={-16} x2={280} y={122} />
      </g>
      <g data-phase="4">
        <CoteH x1={0} x2={260} y={144} texte="2 600" />
        <CoteV y1={0} y2={122} x={-14} texte="1 100" />
      </g>
    </Cadre>
  )
}

/* ------------------------------------------------ detail d'arete chanfreinee */

// Le detail d'un plan : la forme du projet, dessinee et cotee comme elle serait
// transmise a l'atelier. C'est aussi ce qui explique le chanfrein a 45° qu'on
// retrouve sur chaque plaque du site.
export function DetailChanfrein() {
  return (
    <Cadre
      viewBox="-14 -30 250 176"
      hachureId="hach-det"
      label="Détail coté d'une arête chanfreinée : panneau de 27 mm dont l'angle est cassé à 45 degrés sur 10 mm."
    >
      <path d="M0 22 H166 L192 48 V112 H0 Z" fill="url(#hach-det)" {...TRAIT} />
      {/* trait d'axe de l'arete cassee */}
      <line x1="166" y1="22" x2="192" y2="48" {...TRAIT} strokeDasharray="4 3" opacity="0.6" />
      <line x1="192" y1="22" x2="192" y2="48" {...TRAIT} strokeDasharray="4 3" opacity="0.4" />
      <line x1="166" y1="22" x2="192" y2="22" {...TRAIT} strokeDasharray="4 3" opacity="0.4" />
      <CoteH x1={166} x2={192} y={4} texte="10" />
      <CoteV y1={22} y2={112} x={214} texte="27" />
      <text
        x="0"
        y="-14"
        fontSize="9"
        letterSpacing="2"
        fill="currentColor"
        fontFamily="var(--font-titre)"
      >
        DÉTAIL A — ARÊTE CHANFREINÉE
      </text>
      <g className="text-accent">
        <Reserve x={158} y={69} texte="45°" />
        <text
          x="158"
          y="72"
          textAnchor="middle"
          fontSize="9"
          fill="currentColor"
          fontFamily="var(--font-titre)"
        >
          45°
        </text>
      </g>
    </Cadre>
  )
}

const ELEVATIONS = {
  bibliotheque: Bibliotheque,
  dressing: Dressing,
  cuisine: Cuisine,
  escalier: Escalier,
  banque: Banque,
} as const

export type TypeElevation = keyof typeof ELEVATIONS

export default function Elevation({ type }: { type: TypeElevation }) {
  const Dessin = ELEVATIONS[type]
  return <Dessin />
}
