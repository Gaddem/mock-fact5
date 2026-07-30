import Link from 'next/link'
import type { ComponentProps } from 'react'

type Props = Omit<ComponentProps<typeof Link>, 'prefetch'>

// En export statique, Next demande la charge utile de la route survolee sous un
// chemin que l'export n'ecrit pas : une 404 par lien visible, en console comme
// sur le live. Sur cinq pages le prechargement ne gagne rien de mesurable.
export default function Lien(props: Props) {
  return <Link {...props} prefetch={false} />
}
