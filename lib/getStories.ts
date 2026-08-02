import { unstable_cache } from "next/cache";
import { getCategory } from "./sources";
import { fetchCategoryArticles } from "./fetchNews";
import { groupArticlesByTheme } from "./groupWithAI";
import { getDemoStories } from "./demoData";
import { Story } from "./types";

// Point d'entrée unique pour "quels sont les sujets de cette catégorie" —
// utilisé par la page catégorie, la route API et la page de détail d'un
// sujet. Mis en cache via unstable_cache (clé = slug de la catégorie) pour
// que ces trois appelants partagent EXACTEMENT le même résultat pendant les
// 4h de fraîcheur : sans ça, la page de détail relançait son propre appel
// à l'IA à chaque clic, qui reformulait parfois légèrement les titres,
// cassant le lien entre la carte (titre A) et sa page de détail (titre B
// introuvable → 404).
export const getCategoryStories = unstable_cache(
  async (categorySlug: string): Promise<{ stories: Story[]; demo: boolean }> => {
    const category = getCategory(categorySlug);
    if (!category) return { stories: [], demo: true };

    if (!process.env.GEMINI_API_KEY) {
      return { stories: getDemoStories(category.slug), demo: true };
    }

    try {
      const articles = await fetchCategoryArticles(category);
      const stories = await groupArticlesByTheme(articles);
      return { stories, demo: false };
    } catch (err) {
      console.error("Erreur getCategoryStories", err);
      return { stories: getDemoStories(category.slug), demo: true };
    }
  },
  ["category-stories"],
  { revalidate: 14400 }
);
