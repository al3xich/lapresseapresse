import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getCategory } from "@/lib/sources";
import { decodeStory } from "@/lib/storyEncoding";
import SourceBadges from "@/components/SourceBadges";
import styles from "./page.module.css";

// Cette page ne redemande plus rien à l'IA : elle lit directement le sujet
// encodé dans le paramètre ?d= du lien cliqué (voir StoryCard.tsx et
// lib/storyEncoding.ts). Ce qu'on clique est donc garanti être ce qu'on
// obtient, sans dépendre d'un cache qui pourrait diverger entre deux appels
// à l'IA. Contrepartie : un lien copié sans son paramètre ?d= (ou une vieille
// carte de résultats de recherche) ne pourra pas afficher le sujet.
export default function StoryDetail({
  params,
  searchParams,
}: {
  params: { category: string; story: string };
  searchParams: { d?: string };
}) {
  const category = getCategory(params.category);
  if (!category) notFound();

  const story = searchParams.d ? decodeStory(searchParams.d) : null;
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
