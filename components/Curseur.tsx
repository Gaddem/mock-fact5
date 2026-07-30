'use client'

import { useEffect, useRef } from 'react'

const CONDITIONS = '(hover: hover) and (pointer: fine) and (min-width: 1024px)'
const REDUIT = '(prefers-reduced-motion: reduce)'

// Pointe de trusquin : la pointe qui trace le trait de parallele sur le chant.
// La classe qui masque le pointeur systeme est posee PAR CE SCRIPT et jamais
// dans la feuille de style — un echec de JS laisserait sinon la page sans
// aucun pointeur.
export default function Curseur() {
  const pointe = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!window.matchMedia(CONDITIONS).matches) return
    if (window.matchMedia(REDUIT).matches) return

    const element = pointe.current
    if (!element) return

    const racine = document.documentElement
    let x = -100
    let y = -100
    let image = 0

    const dessiner = () => {
      image = 0
      element.style.translate = `${x}px ${y}px`
    }

    // La pointe n'apparait qu'au premier mouvement : posee des le montage, elle
    // resterait garee en haut a gauche tant que la souris n'a pas bouge, et le
    // pointeur systeme serait deja masque.
    let apparue = false

    const bouger = (evenement: PointerEvent) => {
      x = evenement.clientX
      y = evenement.clientY - 20
      if (!apparue) {
        apparue = true
        racine.classList.add('sans-curseur')
        element.style.opacity = '1'
      }
      if (image === 0) image = requestAnimationFrame(dessiner)
    }

    const sortir = () => {
      element.style.opacity = '0'
    }

    const entrer = () => {
      if (apparue) element.style.opacity = '1'
    }

    window.addEventListener('pointermove', bouger, { passive: true })
    document.addEventListener('pointerleave', sortir)
    document.addEventListener('pointerenter', entrer)

    return () => {
      racine.classList.remove('sans-curseur')
      window.removeEventListener('pointermove', bouger)
      document.removeEventListener('pointerleave', sortir)
      document.removeEventListener('pointerenter', entrer)
      if (image !== 0) cancelAnimationFrame(image)
    }
  }, [])

  return <span ref={pointe} className="trusquin" style={{ opacity: 0 }} aria-hidden="true" />
}
