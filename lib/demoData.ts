import { Story } from "./types";

// Affiché tant que GEMINI_API_KEY n'est pas configurée sur Vercel, pour que
// le site ait un rendu concret dès le premier déploiement.
export const DEMO_STORIES: Record<string, Story[]> = {
  "politique-francaise": [
    {
      id: "demo-1",
      headline: "Exemple : débat budgétaire à l'Assemblée",
      synthesis:
        "Ceci est un exemple de synthèse croisée. Une fois ta clé API ajoutée, ce bloc sera remplacé par une vraie synthèse générée à partir des articles du jour, croisant plusieurs sources et signalant leurs divergences d'angle.",
      sources: ["Le Monde", "Le Figaro", "Libération"],
      articles: [],
    },
  ],
  technologie: [
    {
      id: "demo-2",
      headline: "Exemple : annonce d'un nouveau modèle d'IA",
      synthesis:
        "Exemple de synthèse multi-sources sur une actualité technologique. La vraie version comparera le traitement de plusieurs médias spécialisés.",
      sources: ["Numerama", "01net", "Clubic"],
      articles: [],
    },
  ],
};

export function getDemoStories(slug: string): Story[] {
  return (
    DEMO_STORIES[slug] || [
      {
        id: "demo-generic",
        headline: "Exemple d'article regroupé",
        synthesis:
          "Ajoute ta clé GEMINI_API_KEY dans les paramètres Vercel pour remplacer cet exemple par de vraies actualités regroupées et analysées automatiquement.",
        sources: ["Source A", "Source B"],
        articles: [],
      },
    ]
  );
}
