import { Article, Story } from "./types";

// Modèle Gemini gratuit : très large marge par rapport à notre usage réel
// (7 catégories × ~8 recalculs/jour max = ~56 appels/jour, contre 1500/jour
// permis par le niveau gratuit).
const GEMINI_MODEL = "gemini-2.5-flash";

const SYSTEM_PROMPT = `Tu es un assistant éditorial neutre. On te donne une liste d'articles
d'actualité de sources différentes, dans une même catégorie. Ta tâche :

1. Regrouper les articles qui parlent du MÊME événement ou du MÊME sujet précis
   (pas juste la même catégorie générale).
2. Ignorer les articles isolés qui ne partagent de sujet avec aucun autre (ne pas
   forcer un regroupement).
3. Pour chaque groupe contenant au moins 2 sources différentes, écrire :
   - un titre court et factuel (headline)
   - une synthèse neutre et RICHE en français (3 paragraphes, environ 280 à
     350 mots au total, séparés par un saut de ligne \\n\\n) :
     · Paragraphe 1 : ce qui s'est passé, avec le contexte nécessaire pour
       comprendre l'enjeu, en croisant les faits rapportés par chaque source.
     · Paragraphe 2 : les points de convergence entre les sources, puis leurs
       divergences de traitement ou d'angle si elles existent, formulées sans
       prendre parti (ex : "Le Figaro insiste sur X tandis que Libération met
       l'accent sur Y").
     · Paragraphe 3 : les suites attendues, réactions ou enjeux à venir
       mentionnés dans les articles (calendrier, prochaines étapes, réactions
       des parties concernées) — uniquement si les sources fournissent cette
       information, sans inventer de suite hypothétique.
   Reste factuel : n'invente aucun détail qui ne soit pas dans les articles
   fournis, et n'ajoute pas d'opinion personnelle.

Réponds UNIQUEMENT avec un objet JSON valide correspondant exactement au schéma
demandé. Où articleIndexes fait référence à l'index (0-based) des articles
fournis en entrée, dans l'ordre où ils t'ont été donnés.`;

const RESPONSE_SCHEMA = {
  type: "object",
  properties: {
    stories: {
      type: "array",
      items: {
        type: "object",
        properties: {
          headline: { type: "string" },
          synthesis: { type: "string" },
          articleIndexes: { type: "array", items: { type: "integer" } },
        },
        required: ["headline", "synthesis", "articleIndexes"],
      },
    },
  },
  required: ["stories"],
};

export async function groupArticlesByTheme(articles: Article[]): Promise<Story[]> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || articles.length === 0) return [];

  const numbered = articles
    .map((a, i) => `[${i}] (${a.source}) ${a.title} — ${a.contentSnippet}`)
    .join("\n");

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`;

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
      contents: [{ role: "user", parts: [{ text: numbered }] }],
      generationConfig: {
        maxOutputTokens: 8000,
        responseMimeType: "application/json",
        responseSchema: RESPONSE_SCHEMA,
      },
    }),
  });

  if (!response.ok) {
    console.error("Gemini API error", response.status, await response.text());
    return [];
  }

  const data = await response.json();
  const text: string | undefined = data.candidates?.[0]?.content?.parts?.[0]?.text;

  let parsed: { stories: { headline: string; synthesis: string; articleIndexes: number[] }[] };
  try {
    parsed = JSON.parse(text || "");
  } catch (err) {
    console.error("Réponse IA non parsable", err, text);
    return [];
  }

  return (parsed.stories || [])
    .map((s, i): Story | null => {
      const linkedArticles = s.articleIndexes
        .map((idx) => articles[idx])
        .filter(Boolean);
      const uniqueSources = Array.from(new Set(linkedArticles.map((a) => a.source)));
      if (uniqueSources.length < 2) return null; // on ne garde que le multi-sources
      return {
        id: `story-${i}`,
        headline: s.headline,
        synthesis: s.synthesis,
        sources: uniqueSources,
        articles: linkedArticles,
      };
    })
    .filter((s): s is Story => s !== null);
}
