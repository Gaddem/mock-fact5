import Image from 'next/image'
import type { Photo as Fiche } from '@/lib/photos'

// Aucune photo ne porte de texte, nulle part : le controle automatise fait
// echouer tout bloc de texte dont la boite intersecte celle d'une photo. Une
// photo n'a donc jamais de voile de protection ni de bande cuite — le
// traitement de palette est deja dans le fichier.
//
// Le cadre prend le rapport du FICHIER : sans ca, `object-fit: cover` recadre
// une seconde fois par-dessus le recadrage du build, et il en rogne jusqu'a la
// moitie. Le sujet devient illisible sans que rien ne le signale.
export default function Photo({
  fiche,
  sizes,
  priority = false,
  className = '',
}: {
  fiche: Fiche
  sizes: string
  priority?: boolean
  className?: string
}) {
  return (
    <div
      className={`plaque-photo ${className}`}
      style={{ aspectRatio: `${fiche.largeur} / ${fiche.hauteur}` }}
    >
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
