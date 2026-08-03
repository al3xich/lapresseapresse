# La Presse à Presse

Agrégateur d'actualités françaises : regroupe les articles par thème et croise
plusieurs sources dans une synthèse neutre, catégorie par catégorie.


## Comment ça marche ?

1. `lib/sources.ts` liste les flux RSS suivis par catégorie (7 catégories,
   40+ flux au total, j'en rajouterai plus tard).
2. `lib/fetchNews.ts` récupère les articles récents (48h) de tous ces flux.
3. `lib/groupWithAI.ts` envoie ces articles à l'API, qui les regroupe
   par sujet et écrit une synthèse multi-sources neutre.
4. `lib/getStories.ts` centralise cette logique pour la page catégorie, la
   route API et la page de détail d'un sujet.
5. La page se recalcule au maximum **toutes les 4h** (`revalidate = 14400`)
   donc plus à chaque visite (maj) pour diminuer la fréquence des appels.
6. Tant qu'aucune clé API n'est configurée, le site affiche quand meme des exemples fixes
   (mode démo) au lieu de planter.

J'ai mis une version plus détaillé et grand public de ce fonctionnement qui est présentée
sur la page `/comment-ca-marche` du site lui-même.

## Pages du site

- `/` — page catégorie (sujet principal + grille des autres sujets)
- `/sujet/[category]/[story]` = détail d'un sujet, généré à la volée (pas de
  base de données ni stockage donc un lien obsoloète peut cesser de fonctionner si le sujet ne
  fait plus parti du calcul en cours)
- `/comment-ca-marche` = explication du fonctionnement pour les visiteurs


## Personnaliser

- **Ajouter/retirer des sources** : édite `lib/sources.ts`. Vérifie l'URL du
  flux RSS avant de l'ajouter (certains sites changent leurs flux donc à actualiser
  réguilièrement. Le site ignore silencieusement un flux cassé plutôt que de planter.
- **Couleurs des badges de sources** : `lib/sourceColors.ts` — approximations
  des identités visuelles réelles, à corriger au cas par cas si besoin.
  Pour le moment pas de maj prévue ; plus tard je compte récupérer les
  logos officiels.
- **Changer le nombre d'articles regardés par source** : `fetchNews.ts`,
  variable `.slice(0, 8)`.
- **Ajuster la fréquence de rafraîchissement** : `revalidate` dans
  `app/page.tsx`, `app/api/news/route.ts` et
  `app/sujet/[category]/[story]/page.tsx` (en secondes, garder les trois
  synchro).


 Dévelopement local

```bash
npm install
cp .env.example .env.local   # puis ajoute ta clé si tu veux tester le mode réel
npm run dev
```
