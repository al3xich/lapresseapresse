import Parser from "rss-parser";
import { Category } from "./sources";
import { Article } from "./types";

const parser = new Parser({
  timeout: 8000,
  headers: { "User-Agent": "Al3xinfoNewsBot/1.0 (+agregateur personnel)" },
});

// Va chercher chaque flux RSS de la catégorie et renvoie une liste plate d'articles récents, le script ignore silencieusement les flux qui échouent pour ne faire planter la page.
export async function fetchCategoryArticles(category: Category): Promise<Article[]> {
  const results = await Promise.allSettled(
    category.feeds.map(async (feed) => {
      const parsed = await parser.parseURL(feed.url);
      return (parsed.items || []).slice(0, 10).map((item): Article => ({
        title: item.title?.trim() || "(sans titre)",
        link: item.link || "",
        source: feed.name,
        publishedAt: item.isoDate || item.pubDate || null,
        contentSnippet: (item.contentSnippet || item.content || "").slice(0, 220),
      }));
    })
  );

  const articles: Article[] = [];
  for (const r of results) {
    if (r.status === "fulfilled") articles.push(...r.value);
  }

  // Les plus récents pop en 1er, je gtarde que les dernières 48h quand la date est connue.
  const cutoff = Date.now() - 48 * 60 * 60 * 1000;
  return articles
    .filter((a) => !a.publishedAt || new Date(a.publishedAt).getTime() > cutoff)
    .sort((a, b) => {
      const da = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
      const db = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
      return db - da;
    });
}
