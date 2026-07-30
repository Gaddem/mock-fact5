import type { NextConfig } from 'next'

const depot = 'mock-fact5'
const enProd = process.env.NODE_ENV === 'production'
const base = enProd ? `/${depot}` : ''

const nextConfig: NextConfig = {
  output: 'export',
  basePath: base,
  assetPrefix: enProd ? `${base}/` : '',
  env: {
    NEXT_PUBLIC_BASE_PATH: base,
  },
  images: {
    loader: 'custom',
    loaderFile: './lib/chargeur-image.ts',
    // Les deux listes sont fixees : des qu'une image porte `sizes`, Next les
    // concatene dans le srcset. Elles ne se recouvrent pas, et chaque largeur
    // correspond a un fichier reellement produit par scripts/preparer-images.mjs.
    imageSizes: [384],
    deviceSizes: [768, 1200, 1800, 2400],
  },
  trailingSlash: true,
  poweredByHeader: false,
}

export default nextConfig
