import { Category } from "./sources";
import { fetchCategoryArticles } from "./fetchNews";
import { groupArticlesByTheme } from "./groupWithAI";
import { getDemoStories } from "./demoData";
import { Story } from "./types";

// Point d'entrée unique pour "quels sont les sujets de cette catégorie" —
// utilisé par la page catégorie, la route API et la page de détail d'un
// sujet, pour ne jamais dupliquer la logique démo / RSS+IA à trois endroits.
export async function getCategoryStories(
  category: Category
): Promise<{ stories: Story[]; demo: boolean }> {
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
}
