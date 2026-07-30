'use client'

import { useEffect, useRef, type ReactNode } from 'react'
import { suivreCoupe } from '@/lib/scroll'
import { EnTeteDePanneau } from './Feuille'

// Section signature. Le moteur n'ecrit qu'une variable continue ; toute la
// geometrie est en CSS. Si rien ne s'execute, --coupe reste a 1 et le panneau
// est deja ouvert.
export default function Coupe({
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
  const cadre = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = cadre.current
    if (!element) return
    return suivreCoupe(element)
  }, [])

  return (
    <div ref={cadre} className={`panneau coupe ${className}`}>
      {numero ? <EnTeteDePanneau numero={numero} titre={titre} /> : null}
      {children}
    </div>
  )
}
