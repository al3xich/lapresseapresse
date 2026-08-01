# La Presse à Presse

Agrégateur d'actualités françaises : regroupe les articles par thème et croise
plusieurs sources dans une synthèse neutre, catégorie par catégorie.

## Comment ça marche

1. `lib/sources.ts` liste les flux RSS suivis par catégorie (7 catégories,
   40+ flux au total).
2. `lib/fetchNews.ts` récupère les articles récents (48h) de tous ces flux.
3. `lib/groupWithAI.ts` envoie ces articles à l'API Gemini (gratuite), qui les regroupe
   par sujet et écrit une synthèse multi-sources neutre.
4. `lib/getStories.ts` centralise cette logique pour la page catégorie, la
   route API et la page de détail d'un sujet.
5. La page se recalcule au maximum **toutes les 4h** (`revalidate = 14400`)
   — pas à chaque visite — pour garder le coût des appels IA minime.
6. Tant qu'aucune clé API n'est configurée, le site affiche des exemples fixes
   (mode démo) au lieu de planter.

Une version plus détaillée et grand public de ce fonctionnement est présentée
sur la page `/comment-ca-marche` du site lui-même.

## Pages du site

- `/` — page catégorie (sujet principal + grille des autres sujets)
- `/sujet/[category]/[story]` — détail d'un sujet, généré à la volée (pas de
  base de données : un vieux lien peut cesser de fonctionner si le sujet ne
  fait plus partie du calcul en cours)
- `/comment-ca-marche` — explication du fonctionnement pour les visiteurs

## Déployer (gratuit)

### 1. Mettre le code sur GitHub
Crée un nouveau repository sur ton compte GitHub et pousse ce dossier dedans :

```bash
git init
git add .
git commit -m "Premier déploiement de La Presse à Presse"
git branch -M main
git remote add origin https://github.com/TON-COMPTE/la-presse-a-presse.git
git push -u origin main
```

### 2. Connecter Vercel
- Va sur [vercel.com](https://vercel.com), connecte-toi avec GitHub.
- "Add New Project" → sélectionne le repository.
- Framework détecté automatiquement : Next.js. Clique sur **Deploy**.
- Ton site est en ligne en ~2 minutes.

À ce stade, le site fonctionne déjà, en **mode démo**.

### 3. Ajouter la clé API (quand tu es prêt)
- Crée une clé gratuite sur [aistudio.google.com](https://aistudio.google.com)
  (connexion avec un compte Google normal, pas besoin de carte bancaire).
- Dans Vercel : Project → Settings → Environment Variables →
  ajoute `GEMINI_API_KEY` avec ta clé, pour l'environnement "Production".
- Redéploie (Vercel le fait automatiquement, ou clique "Redeploy").
- Le site bascule automatiquement en mode réel.

## Coût une fois en place
- **Hébergement Vercel** : gratuit (plan Hobby), tant que l'usage reste
  personnel et raisonnable.
- **API Gemini** : gratuite au niveau utilisé ici (modèle Flash, ~56 appels/jour
  max contre 1500/jour permis par le niveau gratuit) — aucun coût récurrent
  tant que le trafic reste personnel.
- **Mise à jour** : automatique via le cache de la page (pas besoin de cron
  job).

## Personnaliser

- **Ajouter/retirer des sources** : édite `lib/sources.ts`. Vérifie l'URL du
  flux RSS avant de l'ajouter (certains sites changent leurs flux, plusieurs
  sont marqués `// à vérifier`) — le site ignore silencieusement un flux
  cassé plutôt que de planter.
- **Couleurs des badges de sources** : `lib/sourceColors.ts` — approximations
  des identités visuelles réelles, à corriger au cas par cas si besoin.
- **Changer le nombre d'articles regardés par source** : `fetchNews.ts`,
  variable `.slice(0, 8)`.
- **Ajuster la fréquence de rafraîchissement** : `revalidate` dans
  `app/page.tsx`, `app/api/news/route.ts` et
  `app/sujet/[category]/[story]/page.tsx` (en secondes, garder les trois
  synchronisés).

## Développement local

```bash
npm install
cp .env.example .env.local   # puis ajoute ta clé si tu veux tester le mode réel
npm run dev
```
