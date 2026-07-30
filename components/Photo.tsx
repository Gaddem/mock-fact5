import Image from 'next/image'
import type { Photo as Fiche } from '@/lib/photos'

// Aucune photo ne porte de texte, nulle part : le controle automatise fait
// echouer tout bloc de texte dont la boite intersecte celle d'une photo. Une
// photo n'a donc jamais de voile de protection ni de bande cuite — le
// traitement de palette est deja dans le fichier.
export default function Photo({
  fiche,
  sizes,
  priority = false,
  hauteur,
  className = '',
}: {
  fiche: Fiche
  sizes: string
  priority?: boolean
  /** Hauteur de cadre en CSS ; l'image y est recadree par object-fit. */
  hauteur: string
  className?: string
}) {
  return (
    <div className={`plaque-photo ${className}`} style={{ height: hauteur }}>
      <Image
        src={fiche.src}
        alt={fiche.alt}
        width={fiche.largeur}
        height={fiche.hauteur}
        sizes={sizes}
        priority={priority}
      />
    </div>
  )
}
