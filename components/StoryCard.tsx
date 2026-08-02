import Link from "next/link";
import { Story } from "@/lib/types";
import { slugify } from "@/lib/slug";
import { encodeStory } from "@/lib/storyEncoding";
import SourceBadges from "./SourceBadges";
import styles from "./StoryCard.module.css";

export default function StoryCard({
  story,
  categorySlug,
  variant = "compact",
}: {
  story: Story;
  categorySlug: string;
  variant?: "hero" | "compact";
}) {
  const wrapClass = variant === "hero" ? styles.heroWrap : styles.compactWrap;
  const cardClass = variant === "hero" ? styles.heroCard : styles.card;
  const headlineClass = variant === "hero" ? styles.heroHeadline : styles.headline;
  const synthesisClass = variant === "hero" ? styles.heroSynthesis : styles.synthesis;
  const excerpt = story.synthesis.split("\n\n")[0]; // premier paragraphe seulement sur les cartes
  const href = `/sujet/${categorySlug}/${slugify(story.headline)}?d=${encodeStory(story)}`;

  return (
    <div className={wrapClass}>
      <article className={cardClass}>
        <Link href={href} className={styles.link}>
          <h2 className={headlineClass}>{story.headline}</h2>
          <p className={synthesisClass}>{excerpt}</p>
        </Link>
        <SourceBadges sources={story.sources} />
      </article>
    </div>
  );
}
