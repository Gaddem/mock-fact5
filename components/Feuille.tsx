import type { CSSProperties, ReactNode } from 'react'

type Variables = CSSProperties & Record<`--${string}`, string | number>

export function Feuille({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`feuille ${className}`}>{children}</div>
}

export function Panneau({
  children,
  className = '',
  numero,
  titre,
}: {
  children: ReactNode
  className?: string
  numero?: string
  titre?: string
}) {
  return (
    <div className={`panneau ${className}`}>
      {numero ? <EnTeteDePanneau numero={numero} titre={titre} /> : null}
      {children}
    </div>
  )
}

// Le numero de planche tient lieu de reperage : sur un plan on sait ou l'on est
// a la planche, pas a une barre de progression.
//
// Le titre ne se tronque pas : sur /agencements il porte le contexte de
// l'ouvrage (le mur, le devers, la contrainte), et c'est une information qui
// vaut plus qu'une ligne bien alignee. Il passe sous le numero en etroit.
export function EnTeteDePanneau({ numero, titre }: { numero: string; titre?: string }) {
  return (
    <div className="flex flex-col gap-1 border-b border-bordure px-4 py-2 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6 md:px-6">
      <span className="repere-marge shrink-0">{numero}</span>
      {titre ? <span className="surtitre min-w-0 sm:text-right">{titre}</span> : null}
    </div>
  )
}

export function Calepinage({
  children,
  className = '',
  cote,
}: {
  children: ReactNode
  className?: string
  cote?: 1 | -1
}) {
  const style: Variables | undefined = cote === undefined ? undefined : { '--cote-coupe': cote }
  return (
    <div className={`calepinage ${className}`} style={style}>
      {children}
    </div>
  )
}

export function Piece({
  children,
  className = '',
  x = 0,
  fond = false,
  travaillee = false,
  reperes = false,
}: {
  children: ReactNode
  className?: string
  /** Abscisse de la piece le long de l'axe de coupe, de 0 a 1. */
  x?: number
  fond?: boolean
  travaillee?: boolean
  reperes?: boolean
}) {
  const style: Variables = { '--x': x }
  return (
    <article
      className={`piece ${fond ? 'piece-fond' : ''} ${reperes ? 'piece-cotee' : ''} ${className}`}
      style={style}
    >
      {children}
      {reperes ? <Reperes /> : null}
      {travaillee ? (
        <>
          <span className="copeau" aria-hidden="true" />
          <span className="face-de-coupe" aria-hidden="true" />
        </>
      ) : null}
    </article>
  )
}

function Reperes() {
  return (
    <span aria-hidden="true">
      <span className="repere" style={{ left: 8, top: 8 }} />
      <span className="repere" style={{ right: 8, top: 8 }} />
      <span className="repere" style={{ left: 8, bottom: 8 }} />
      <span className="repere" style={{ right: 8, bottom: 8 }} />
    </span>
  )
}

export function LigneDeCoupe() {
  return (
    <div className="ligne-de-coupe" aria-hidden="true">
      <span className="trait-de-scie" />
    </div>
  )
}

export function Cote({ valeur, className = '' }: { valeur: string; className?: string }) {
  return (
    <div className={`cote ${className}`} aria-hidden="true">
      <span className="cote-fleche" />
      <span className="cote-trait" />
      <span className="cote-valeur">{valeur}</span>
      <span className="cote-trait" />
      <span className="cote-fleche cote-fleche-fin" />
    </div>
  )
}
