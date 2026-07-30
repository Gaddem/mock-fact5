'use client'

type Parametres = {
  src: string
  width: number
}

// Le basePath est a la charge du chargeur : Next ne le prefixe pas aux sources
// passees sous forme de chaine.
export default function chargeurImage({ src, width }: Parametres) {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? ''
  const nom = src.replace(/^\//, '').replace(/\.[a-z0-9]+$/i, '')
  return `${base}/${nom}-${width}.webp`
}
