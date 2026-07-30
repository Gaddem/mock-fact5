'use client'

// Un seul moteur pour tout le defilement du site : une boucle rAF partagee,
// un observateur pour l'abonnement, un observateur pour les entrees en scene.
// Quinze ecouteurs `scroll` qui recalculent chacun leur geometrie coutent plus
// cher qu'une boucle unique, et ratent le defilement inertiel et les sauts.

const MOUVEMENT_REDUIT = '(prefers-reduced-motion: reduce)'

function mouvementReduit() {
  return typeof window !== 'undefined' && window.matchMedia(MOUVEMENT_REDUIT).matches
}

/* ------------------------------------------------------- boucle partagee */

const abonnes = new Set<HTMLElement>()
const dernieres = new WeakMap<HTMLElement, number>()
let boucle = 0
let branchee = false

// L'avancee se rapporte aux reperes de l'ECRAN, jamais a la hauteur de
// l'element : rapportee a l'element, un bloc court finit sa course alors
// qu'il depasse a peine du bas de la fenetre, et l'effet n'est jamais vu.
function avancee(element: HTMLElement) {
  const boite = element.getBoundingClientRect()
  const ecran = window.innerHeight
  const depart = ecran * 0.94
  const course = ecran * 0.66
  const brut = (depart - boite.top) / course
  return brut < 0 ? 0 : brut > 1 ? 1 : brut
}

function passe() {
  boucle = 0
  for (const element of abonnes) {
    const valeur = Math.round(avancee(element) * 1000) / 1000
    // Ne jamais reecrire un style inchange : l'ecriture invalide le style meme
    // si la valeur est identique.
    if (dernieres.get(element) === valeur) continue
    dernieres.set(element, valeur)
    element.style.setProperty('--coupe', String(valeur))
  }
  if (abonnes.size > 0 && !document.hidden) demarrer()
}

function demarrer() {
  if (boucle === 0) boucle = requestAnimationFrame(passe)
}

function arreter() {
  if (boucle !== 0) {
    cancelAnimationFrame(boucle)
    boucle = 0
  }
}

let observateurCoupe: IntersectionObserver | null = null

function observateur() {
  if (observateurCoupe) return observateurCoupe
  observateurCoupe = new IntersectionObserver(
    (entrees) => {
      for (const entree of entrees) {
        const element = entree.target as HTMLElement
        if (entree.isIntersecting) abonnes.add(element)
        else abonnes.delete(element)
      }
      if (abonnes.size > 0) demarrer()
      else arreter()
    },
    { rootMargin: '15% 0px 15% 0px' },
  )
  return observateurCoupe
}

function brancher() {
  if (branchee) return
  branchee = true
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) arreter()
    else if (abonnes.size > 0) demarrer()
  })
}

function apresChargement(action: () => void) {
  if (document.readyState === 'complete') action()
  else window.addEventListener('load', action, { once: true })
}

// La section suit le defilement via une seule variable continue. Le moteur ne
// se branche qu'apres `load` : avant ca, aucune transformation n'est posee,
// donc aucune couche de composition ne peut sortir vide pendant que le
// navigateur decode l'image prioritaire.
export function suivreCoupe(element: HTMLElement) {
  if (mouvementReduit()) return () => {}
  let annule = false
  apresChargement(() => {
    if (annule) return
    brancher()
    observateur().observe(element)
  })
  return () => {
    annule = true
    observateurCoupe?.unobserve(element)
    abonnes.delete(element)
    if (abonnes.size === 0) arreter()
  }
}

/* ---------------------------------------------------- entrees en scene */

const SEUIL_ENTREE = 0.15
const SEUIL_CHIEN = 0.01
const DELAI_CHIEN = 1200

const minuteries = new WeakMap<HTMLElement, number>()
const enAttente = new Set<HTMLElement>()
let observateurScene: IntersectionObserver | null = null

function reveler(element: HTMLElement) {
  const minuterie = minuteries.get(element)
  if (minuterie !== undefined) {
    clearTimeout(minuterie)
    minuteries.delete(element)
  }
  // Le filet retire l'attribut, il ne le fait pas changer de valeur : c'est
  // precisement quand rien ne s'anime qu'on a besoin de lui.
  element.removeAttribute('data-attente')
  enAttente.delete(element)
  observateurScene?.unobserve(element)
}

function scene() {
  if (observateurScene) return observateurScene
  observateurScene = new IntersectionObserver(
    (entrees) => {
      for (const entree of entrees) {
        const element = entree.target as HTMLElement
        if (entree.intersectionRatio >= SEUIL_ENTREE) {
          reveler(element)
          continue
        }
        // Chien de garde arme seulement sur ce qui est ENTRE DANS LE CHAMP,
        // avec un seuil plus bas que celui de l'entree pour laisser la main a
        // l'observateur quand il fonctionne. Les minuteries vont dans une
        // WeakMap : un observateur partage cree au premier appel ne connait
        // sinon que la minuterie du premier element observe.
        if (entree.isIntersecting && !minuteries.has(element)) {
          minuteries.set(element, window.setTimeout(() => reveler(element), DELAI_CHIEN))
        }
      }
    },
    { threshold: [SEUIL_CHIEN, SEUIL_ENTREE] },
  )
  return observateurScene
}

function armer(element: HTMLElement) {
  // Rien a faire sur ce qui est deja peint : lui poser un etat de depart apres
  // la premiere peinture le ferait clignoter.
  const boite = element.getBoundingClientRect()
  if (boite.top < window.innerHeight * 0.92) return
  element.setAttribute('data-attente', '')
  enAttente.add(element)
  scene().observe(element)
}

let sceneBranchee = false

function brancherScene() {
  if (sceneBranchee) return
  sceneBranchee = true
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      // Dans un onglet cache, ni rAF ni IntersectionObserver ne se declenchent :
      // une minuterie qui expirerait la ne revelerait rien de visible et
      // consommerait le filet. On les rearme au retour.
      for (const element of enAttente) {
        const minuterie = minuteries.get(element)
        if (minuterie !== undefined) {
          clearTimeout(minuterie)
          minuteries.delete(element)
        }
      }
    }
  })
}

// Enregistre un bloc pour son entree en scene. Dans un document que le
// navigateur ne compose pas, on ne pose AUCUN etat de depart : l'observateur ne
// s'y declencherait jamais et le bloc resterait decale pour rien.
export function revelerEnVue(element: HTMLElement) {
  if (mouvementReduit()) return () => {}
  let annule = false

  const poser = () => {
    if (annule || !element.isConnected) return
    if (document.hidden) {
      document.addEventListener('visibilitychange', poser, { once: true })
      return
    }
    brancherScene()
    armer(element)
  }

  apresChargement(poser)

  return () => {
    annule = true
    const minuterie = minuteries.get(element)
    if (minuterie !== undefined) clearTimeout(minuterie)
    minuteries.delete(element)
    enAttente.delete(element)
    observateurScene?.unobserve(element)
    element.removeAttribute('data-attente')
  }
}
