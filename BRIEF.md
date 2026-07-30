# Bois de Bout — brief

Projet de démonstration n° 5. Dépôt `mock-fact5`, `basePath = /mock-fact5`.

---

## 1. Le brief

```
Marque       : Bois de Bout
Secteur      : menuiserie et agencement sur mesure
Promesse     : on ne vend pas du bois, on vend un plan tenu. Ce qui est dessiné est ce
               qui est fabriqué, ce qui est chiffré est ce qui est facturé.
Public       : particulier qui fait faire une bibliothèque, un dressing, une cuisine ;
               architecte d'intérieur qui cherche un atelier capable de lire un plan ;
               commerçant qui a besoin d'un agencement.
Ton          : précis, sobre, sans esbroufe
Pages        : / · /agencements · /essences · /devis · 404
Signature    : la coupe au trait — un trait de scie traverse la section et libère le
               panneau, qui s'ouvre de part et d'autre du trait
Anti-brief   : ci-dessous, §2
```

**L'idée directrice** : la mise en page *est* le métier. Un menuisier travaille sur deux
documents — le **plan coté** et la **feuille de débit** (le calepinage des pièces dans
le panneau, pour perdre le moins de matière possible). Le site prend les deux au pied de
la lettre : chaque page est un plan d'exécution, chaque section est un panneau découpé.
Aucun aplat décoratif, aucune ombre, aucun dégradé — un plan d'atelier n'en a pas.

---

## 2. Anti-brief

Ce que ce site ne fera **pas**. Les six premiers points visent le look de site de
menuisier ; les quatre suivants sont les garde-fous du projet.

1. **Aucune texture de chêne en fond plein cadre derrière du texte clair.** Le bois est
   la matière du sujet, pas un papier peint. Aucune photo ne porte de texte, nulle part
   — règle portée par le contrôle automatisé, pas seulement par ce document.
2. **Aucun carrousel de réalisations à flèches rondes**, et aucun intérieur photographié
   au grand angle. Les agencements sont montrés comme ils se vendent : **une élévation
   cotée et une nomenclature**. Corollaire assumé : un intérieur privé reconnaissable
   ne pourrait de toute façon pas être attribué à une marque inventée.
3. **Aucun picto rabot / compas / mètre pliant dans un cercle**, aucune médaille
   « artisan certifié », aucun bandeau « + de 20 ans d'expérience ». Les seuls
   symboles du site sont ceux d'un plan : flèche de cote, hachure de coupe, repère de
   perçage, indice de révision.
4. **Aucun portrait de l'artisan bras croisés devant un atelier flouté.** Aucune
   personne sur aucune photo.
5. **Aucun « Devis gratuit » en bouton arrondi**, et aucune palette bois + vert sauge +
   beige. La palette est sombre, l'action principale est une plaque outremer à arête
   chanfreinée, et le mot employé est *demander un métré* — c'est ce qui se passe
   réellement.
6. **Aucune preuve sociale décorative.** Les seuls chiffres du site sont des cotes, des
   prix, des densités, des délais et des références de fourniture.
7. **Aucun radius, aucune ombre portée, aucun dégradé, aucun `backdrop-filter`.**
   Le chanfrein est une arête cassée à 45°, pas un biseau décoratif : 10 px en
   `clip-path`, jamais un `border-radius` déguisé.
8. **L'outremer n'est pas une ambiance, c'est un trait de repérage.** Trois usages
   seulement : le trait de coupe, les flèches de cote, la plaque d'action. Jamais un
   fond de section, jamais une teinte de bois. Le piège de l'épure technique, c'est le
   « blueprint » bleu sur bleu : ici le fond est du bois sombre, pas du bleu.
9. **Aucun bandeau défilant, aucun compteur qui s'incrémente**, aucun preloader,
   aucune intro. (Voir §7 : 29 effets caractérisants sont déjà consommés.)
10. **Aucune animation qui retient du contenu.** Toute variable d'animation vaut son
    état final par défaut : sans JS, en mouvement réduit, ou dans un onglet que le
    navigateur ne compose pas, la page est complète et lisible.

---

## 3. ADN — axes bloquants

| Axe | Valeur | Vérifié absent de `deja_utilises` |
|---|---|---|
| Police | **Bricolage Grotesque** (titre) / **Literata** (texte) | oui |
| Palette | **noyer-outremer**, sombre | oui |
| Style visuel | **epure-technique** | oui |
| Layout | **feuille-de-debit** | oui |
| Secteur | **menuiserie et agencement sur mesure** | oui |
| Animation signature | **la coupe au trait** | oui |

**Polices.** Bricolage Grotesque est un grotesque variable à axes `wdth` et `opsz` : il
donne des titres larges et un peu bruts sans tomber dans le gras de signalétique du
projet 4. Literata est un serif d'écran conçu pour le texte long : il tient les
nomenclatures, les tableaux d'essences et les notes de plan. Le renversement est
volontaire — le titre est du dessin technique, le corps est du document lu.

**Palette noyer-outremer** (sombre) — le bois est la matière, l'outremer est le crayon.

```
--fond      #1C1714   --texte  #F0E8DA   --accent    #5B8AD6   (outremer)
--surface   #262019   --muted  #A79684   --accent-2  #C9A876   (chêne)
--bordure   #382F27
```

Contrastes de tokens (déjà calculés, à re-mesurer sur les pixels rendus texture
comprise) :

| | sur `--fond` | sur `--surface` |
|---|---|---|
| `--texte` | 14,60:1 | 13,25:1 |
| `--muted` | 6,21:1 | 5,63:1 |
| `--accent` | 5,12:1 | **4,64:1** |
| `--accent-2` | 7,91:1 | 7,17:1 |

Deux règles qui en découlent et qui ne se négocient pas :

- **`--accent` sur `--surface` est à 4,64:1, sans marge.** La texture `fil-du-bois` est
  posée sur les surfaces : elle va manger une fraction de point. Donc l'accent ne porte
  **aucun texte courant sur surface**. Si la mesure sur pixels rendus le fait passer
  sous 4,5, la correction se fait **sur cette zone** (surcharge locale du token, comme
  le `.sur-fond` du projet 2), pas en délavant la texture partout.
- **Sur une plaque outremer pleine, l'encre est le FOND** `#1C1714` (5,12:1). Le texte
  clair dessus serait à 2,85:1 : interdit, y compris pour un état permanent
  (`aria-current`, lien actif) — c'est la leçon du projet 3.

## 4. ADN — axes souples

Tous différents de ceux du projet 4 (`coin-rivete`, `plaques-serrees`, `email-piquete`,
`ecrou-six-pans`).

| Axe | Valeur | Détail |
|---|---|---|
| Forme | **arete-chanfreinee** | chanfrein 10 px en `clip-path`, `border-radius: 0` partout |
| Densité | **planches-larges** | `--section-y: 96px`, `--contenu-max: 1200px` |
| Texture | **fil-du-bois** | fibres verticales très faibles, **sur les surfaces seulement**, jamais sur le fond |
| Curseur | **pointe-de-trusquin** | pointe fine + trait de rappel, `hover: hover` + `pointer: fine` + ≥ 1024 px, classe posée **par le script** |

---

## 5. Layout — feuille-de-debit

Les blocs sont calepinés comme les pièces d'un meuble dans un panneau : **rectangles
jointifs de tailles inégales, aucune gouttière**. Ce qui sépare deux blocs est un
**trait de coupe de 1 px**, pas un blanc. Chaque bloc porte sa cote sur un bord — la
largeur en haut, la hauteur à gauche — exactement comme une pièce sur une feuille de
débit porte sa dimension finie.

- Une colonne sous 640 px : le panneau se débite dans le sens de la longueur, les cotes
  passent en tête de bloc.
- Deux colonnes de 640 à 1024, calepinage à trois pistes au-delà.
- **`min-w-0` sur chaque cellule de grille, sans exception.** Une piste prend la largeur
  intrinsèque de son contenu ; une nomenclature en `nowrap` élargit la piste bien
  au-delà du viewport, `overflow-x: hidden` la rogne, et **rien ne se voit**. Contrôle
  explicite : `scrollWidth` contre largeur de boîte, cellule par cellule.
- Le cartouche (bas de page de chaque plan : ouvrage, échelle, indice, date) est un bloc
  du calepinage comme les autres, pas une décoration.

**Conséquence assumée** : pas de gouttière veut dire pas de respiration entre blocs. La
respiration vient de la marge intérieure des blocs et du blanc de la feuille autour du
panneau. C'est ce qui distingue une feuille de débit d'un bento.

---

## 6. Signature — la coupe au trait

**Principe.** Un trait de scie traverse la section au défilement. Derrière lui — et
seulement derrière lui — le panneau s'ouvre : les blocs situés de part et d'autre du
trait s'écartent de quelques pixels, la saignée se creuse, les arêtes de coupe montrent
leur chanfrein. Devant le trait, le panneau est encore entier. **C'est le trait qui
mène, le panneau suit** : à aucun instant les deux moitiés ne bougent ensemble comme un
volet qui s'ouvrirait.

**Technique.**

- Une seule variable continue `--coupe` (0 → 1) écrite par la boucle rAF partagée
  (`lib/scroll.ts`), abonnée/désabonnée par un `IntersectionObserver` partagé, arrêtée
  sur `visibilitychange`, branchée **après `load`**.
- `--coupe` **vaut 1 par défaut**, dans la feuille de style. Sans JS, en
  `prefers-reduced-motion`, ou dans un document que le navigateur ne compose pas, le
  panneau est déjà ouvert et tout est lisible. Rien ne dépend d'une transition qui
  devrait *gagner*.
- Chaque bloc connaît sa position `--x` le long de l'axe de coupe (0 → 1, posée en
  style inline au rendu, aucune mesure de géométrie au défilement). Son écartement vaut
  `clamp(0, (var(--coupe) - var(--x)) / 0.22, 1)` × 10 px, en `translate` seul.
- Le déplacement est **plafonné à 10 px** et ne fait jamais disparaître ni recouvrir
  quoi que ce soit : le pire cas d'une panne est un bloc posé 10 px trop haut.
- Le `clip-path` ne s'applique qu'aux **arêtes de coupe des panneaux décoratifs**, jamais
  à un bloc de texte.
- L'avancée de défilement se rapporte à la **hauteur de l'écran** (deux repères en
  fractions de `innerHeight`), jamais à celle de la section.

**Ce que ça n'est pas** : ni le tracé SVG du projet 1 (aucun `stroke-dashoffset`, aucun
`stroke-dasharray` — le trait est un bloc en `scale`), ni le pli en perspective du
projet 3 (aucune 3D, aucun `perspective`, aucun `preserve-3d`).

**État de repos** : panneau entier, aucun trait visible. Les deux extrémités de la
course sont lisibles ; rien n'est masqué à aucun moment.

---

## 7. Effets secondaires

Aucun des **29 effets caractérisants** des projets 1 à 4 n'est rejoué. Les quatre effets
du projet parlent tous la même langue : *un plan qui se trace, une matière qui se
travaille*.

| Effet | Ce qu'il fait |
|---|---|
| **cote-tracee** | à l'entrée en scène, la ligne de cote s'étend de son origine jusqu'à ses flèches (`scaleX`, `transform-origin`), les flèches apparaissent en fin de course |
| **elevation-qui-se-monte** | l'élévation dessinée s'assemble dans l'**ordre de fabrication** : le bâti, puis ce qui s'y pose, puis le sol et les sections coupées, puis les cotes. Quatre groupes `data-phase`, `translate` seul, 100 ms de décalage entre chacun. Un plan figé à mi-course reste entièrement lisible, seulement posé 14 unités trop bas |
| **ligne-de-rappel** | sur chaque bloc coté, la ligne de rappel — celle qui relie la pièce à sa cote sur un plan — se tire du haut vers le bas (`scaleY`, origine en haut) |
| **chanfrein-qui-mord** | au survol de la plaque d'action, l'arête est cassée plus profondément : `--chanfrein` passe de 10 à 18 px et le `clip-path` interpole. Un deuxième passage à la défonceuse |
| **copeau-detache** | au survol d'un bloc, le triangle de son coin chanfreiné se soulève et se retourne légèrement — un copeau qui décolle |
| **hachure-au-survol** | au survol, la face de coupe d'un bloc se remplit de hachures à 45° (`repeating-linear-gradient` sur un pseudo-élément) |
| **repere-de-percage** | *primitive libre* : les croix de perçage aux angles des blocs apparaissent en fondu |

Primitives libres également utilisées : fondu montant, cascade de grille, changement
d'état au survol.

**Conséquences assumées de la règle d'unicité** : pas d'intro ni de preloader, pas de
barre de progression de lecture, pas d'en-tête collante ni compacte, pas de parallaxe,
pas de palier épinglé, pas de chiffre au compteur (donc aucun prix animé — un compteur
gelé afficherait un prix faux, leçon du projet 4). Le repérage « où j'en suis » passe
par le **repère de marge** : chaque section porte son numéro de plan dans la marge,
comme une planche numérotée.

---

## 8. Contenu — crédibilité métier

Le vocabulaire est celui de l'atelier, employé au bon endroit :

**métré** (relevé contradictoire sur site, avec les faux aplombs) → **plan d'exécution**
(coté, soumis à validation, indice de révision) → **débit** (calepinage dans le panneau)
→ **corroyage** (dégauchissage, rabotage, mise à largeur) → **assemblage** (tenon et
mortaise, tourillon, lamello, queue d'aronde) → **placage** et **chant plaqué** →
**quincaillerie** → **finition** → **pose** (calage, scribage sur le mur, joint de
finition).

**Essences nommées et documentées** : chêne, frêne, noyer, châtaignier, hêtre, douglas,
mélèze — avec densité, dureté Monnin, stabilité, teinte, emploi, et prix indicatif de
l'avivé au m².

**Chiffrage à l'unité du métier** : au **mètre linéaire** pour une bibliothèque, un
dressing, une cuisine ; au **m²** pour un plan de travail, un habillage mural, une
façade de placard ; à l'ouvrage pour un escalier ou une banque d'accueil.

**Délais séparés**, jamais un délai global :

| Étape | Délai |
|---|---|
| Étude et plan d'exécution | 10 à 15 jours après le métré |
| Fabrication | 5 à 7 semaines après validation du plan |
| Pose | 2 à 5 jours selon l'ouvrage |

**Marques de fourniture — toutes inventées**, comme la marque du site. Elles servent le
récit (un menuisier sait ce qu'il visse) sans emprunter la caution de personne :

| Domaine | Marque inventée | Références citées |
|---|---|---|
| Quincaillerie | **Talvec** | coulisse à sortie totale T90 (40 kg), charnière à amortisseur C110, ferrure coulissante R40 |
| Panneaux | **Fibralam** | latté peuplier 19 mm, MDF hydrofuge 19 mm, contreplaqué bouleau 18 mm |
| Colles | **Ombrelin** | vinylique D3 V300, polyuréthane U40 (extérieur) |
| Vernis | **Ondelac** | polyuréthane bi-composant mat PU21, deux couches |
| Huiles-cires | **Cirandel** | huile-cire dure HC7, entretien E2 |
| Visserie | **Torvis** | vis torx T20 zinguée, tirefond M8, cheville à expansion |

Le formulaire de `/devis` est une maquette : il est visiblement désactivé et le dit.

---

## 9. Pages

| Page | Contenu |
|---|---|
| **/** | ouverture en cartouche de plan, avec le **détail A d'arête chanfreinée** dessiné et coté · les cinq familles d'ouvrages avec leur unité de chiffrage · bande « le tracé » · l'atelier en cinq temps, avec les délais séparés · bande « le débit » · ce qu'il y a dedans (les fournitures) · appel au métré |
| **/agencements** | cinq ouvrages, chacun en **élévation cotée dessinée** + nomenclature (essence, panneau, chants, assemblages, finition, quincaillerie, délai, prix) · un bandeau de matière |
| **/essences** | les sept essences en feuille d'échantillons : densité, Monnin, stabilité, teinte, emploi, prix de l'avivé · deux règles qui coûtent cher (le tanin et l'acier, la portée d'une tablette) · deux bandes matière |
| **/devis** | ce qu'il nous faut pour chiffrer · le formulaire calepiné comme une feuille de débit, désactivé et signalé comme tel · zone d'intervention · délais |
| **404** | « cote absente du plan » — le repère existe, la valeur manque |

## 9 bis. Images — ce qui a été retenu

Sept emplacements avaient été demandés. Sur quatorze candidates examinées en entier,
**neuf ont été écartées** (personnes identifiables, machine plein cadre, marquage de
bande abrasive, bois de chauffage, charpente, menuiserie extérieure), et **cinq
retenues**. Les motifs complets sont dans `CREDITS.md`.

Trois emplacements n'avaient aucune candidate acceptable. Conformément au cadre, deux
ont **changé de sujet** et le troisième a **disparu** — aucun n'a été bricolé :

- « bois de bout » (accueil, bande 1) devient **« le tracé »** — un gabarit tracé au
  crayon sur panneau. Plus juste, puisque le principe du site est le plan ;
- « copeaux de rabot » (accueil, bande 2) devient **« le débit »** ;
- les trois détails de `/agencements` (assemblage, arête usinée, placage) sont
  supprimés. La page garde un seul bandeau ; ses ouvrages sont montrés en élévation
  cotée, ce qui était déjà le parti pris.

Cinq photos, cinq emplacements, aucune répétition. Cinq largeurs WebP par photo
(384/768/1200/1800/2400), traitement de palette cuit dans le fichier, jamais en
`filter` CSS.

---

## 10. Contrôles avant publication

Repris de la checklist §10 du référentiel, plus ce que le projet 4 a coûté :

- `tsc --noEmit`, `lint`, `build`, puis **jugement de fluidité sur `npm run apercu`**
  (build de production servi en gzip sous le `basePath`), jamais sur `next dev`.
- **Matrice responsive 320 / 375 / 414 / 768 / 834 / 1024 / 1280 / 1536 × 5 pages**,
  zéro scroll horizontal, zéro rognage, cibles tactiles ≥ 44 px.
- **Contraste mesuré sur les pixels rendus**, texture `fil-du-bois` comprise, et pas sur
  les couleurs des tokens. Le couple `--accent` / `--surface` à 4,64:1 est le point de
  contrôle prioritaire.
- **Titres dimensionnés sur leur colonne** (`container-type: inline-size` + `cqi`), pas
  sur le viewport : un titre d'un seul mot ne peut pas se replier et déborde sa colonne
  sans que la page déborde.
- **Densité d'image ≥ 1** aux formats visés, et chaque entrée de `srcSet` vérifiée
  contre la largeur réelle du fichier. `imageSizes` **et** `deviceSizes` fixés tous les
  deux : dès qu'une image porte `sizes`, Next concatène les deux listes.
- **Navigation testée sur les 20 paires de pages, en partant du bas** de la page de
  départ : on atterrit en haut, sur du contenu peint.
- **Test `document.hidden`** : aucun bloc invisible, aucun chiffre faux.
- Footer « Projet de démonstration — Développé par DEVAZU », `.nojekyll`,
  `robots.txt` en `Disallow: /`.
</content>
</invoke>
