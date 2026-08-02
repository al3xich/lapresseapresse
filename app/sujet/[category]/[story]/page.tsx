import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getCategory } from "@/lib/sources";
import { getCategoryStories } from "@/lib/getStories";
import { slugify } from "@/lib/slug";
import SourceBadges from "@/components/SourceBadges";
import styles from "./page.module.css";

// Même fenêtre de cache que la page catégorie, pour rester cohérent.
export const revalidate = 14400;

export default async function StoryDetail({
  params,
}: {
  params: { category: string; story: string };
}) {
  const category = getCategory(params.category);
  if (!category) notFound();

  const { stories } = await getCategoryStories(category.slug);
  const story = stories.find((s) => slugify(s.headline) === params.story);
  if (!story) notFound();

  return (
    <div className={styles.shell}>
      <div className={styles.topRow}>
        <span className={styles.siteName}>
          LA PRESSE <span className={styles.siteNameAccent}>À PRESSE</span>
        </span>
      </div>

      <Link href={`/categorie/${category.slug}`} className={styles.back}>
        <ArrowLeft size={16} strokeWidth={2} aria-hidden="true" />
        Retour à {category.label}
      </Link>

      <article className={styles.article}>
        <span className={styles.categoryTag}>{category.label}</span>
        <h1 className={styles.headline}>{story.headline}</h1>
        {story.synthesis.split("\n\n").map((paragraph, i) => (
          <p key={i} className={styles.synthesis}>
            {paragraph}
          </p>
        ))}
        <SourceBadges sources={story.sources} />

        {story.articles.length > 0 && (
          <div className={styles.sourceList}>
            <div className={styles.sourceListTitle}>Lire l&apos;article original sur chaque source</div>
            <ul>
              {story.articles.map((a) => (
                <li key={a.link}>
                  <a href={a.link} target="_blank" rel="noopener noreferrer">
                    {a.source}
                  </a>
                  {a.title && <span className={styles.articleTitle}> — {a.title}</span>}
                </li>
              ))}
            </ul>
          </div>
        )}
      </article>
    </div>
  );
}
