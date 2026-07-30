'use client'

import { useEffect, useRef, type ReactNode } from 'react'
import { revelerEnVue } from '@/lib/scroll'

// Enveloppe d'entree en scene. L'etat de depart est pose par le script et
// seulement sur ce qui est encore sous la ligne de flottaison ; l'etat
// d'arrivee est l'absence de cet etat, pas une regle concurrente.
export default function EnScene({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  const cadre = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = cadre.current
    if (!element) return
    return revelerEnVue(element)
  }, [])

  return (
    <div ref={cadre} className={`en-scene ${className}`}>
      {children}
    </div>
  )
}
