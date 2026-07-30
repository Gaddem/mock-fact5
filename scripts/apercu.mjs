// Sert l'export statique sous son basePath, en gzip comme GitHub Pages.
//
// Sans compression, le JS et le CSS arrivent trois fois plus gros qu'en ligne
// et toute mesure de performance faite sur l'apercu est fausse. Et la fluidite
// se juge sur ce build, jamais sur `next dev` : React en mode developpement,
// non minifie, avec HMR, coute plusieurs fois son prix a l'hydratation.

import { createReadStream, existsSync, statSync } from 'node:fs'
import { createServer } from 'node:http'
import path from 'node:path'
import { createGzip } from 'node:zlib'

const racine = path.resolve(import.meta.dirname, '..', 'out')
const BASE = '/mock-fact5'
const PORT = Number(process.env.PORT ?? 4173)

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
}

const COMPRESSIBLES = new Set(['.html', '.css', '.js', '.json', '.txt', '.svg'])

if (!existsSync(racine)) {
  process.stderr.write("out/ est absent : lancer `npm run build` d'abord.\n")
  process.exit(1)
}

function resoudre(url) {
  let chemin = decodeURIComponent(new URL(url, 'http://x').pathname)
  if (chemin === BASE) chemin = '/'
  else if (chemin.startsWith(`${BASE}/`)) chemin = chemin.slice(BASE.length)
  else if (chemin !== '/') return null

  const cible = path.join(racine, chemin)
  if (!cible.startsWith(racine)) return null

  if (existsSync(cible) && statSync(cible).isDirectory()) {
    const index = path.join(cible, 'index.html')
    return existsSync(index) ? index : null
  }
  if (existsSync(cible)) return cible
  if (existsSync(`${cible}.html`)) return `${cible}.html`
  return null
}

const serveur = createServer((requete, reponse) => {
  const fichier = resoudre(requete.url ?? '/')
  const introuvable = path.join(racine, '404.html')

  const cible = fichier ?? (existsSync(introuvable) ? introuvable : null)
  if (!cible) {
    reponse.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' })
    reponse.end('404')
    return
  }

  const extension = path.extname(cible)
  const entetes = { 'content-type': TYPES[extension] ?? 'application/octet-stream' }
  const accepte = String(requete.headers['accept-encoding'] ?? '').includes('gzip')

  if (accepte && COMPRESSIBLES.has(extension)) {
    reponse.writeHead(fichier ? 200 : 404, { ...entetes, 'content-encoding': 'gzip' })
    createReadStream(cible).pipe(createGzip()).pipe(reponse)
    return
  }

  reponse.writeHead(fichier ? 200 : 404, entetes)
  createReadStream(cible).pipe(reponse)
})

// Plusieurs mocks tournent souvent en meme temps : on prend le premier port
// libre plutot que d'echouer sur un EADDRINUSE.
let port = PORT
serveur.on('error', (erreur) => {
  if (erreur.code !== 'EADDRINUSE' || port > PORT + 20) throw erreur
  port += 1
  serveur.listen(port)
})

serveur.listen(port, () => {
  process.stdout.write(`Apercu : http://localhost:${serveur.address().port}${BASE}/\n`)
})
