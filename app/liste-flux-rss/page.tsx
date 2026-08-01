import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { CATEGORIES } from "@/lib/sources";
import styles from "./page.module.css";

export const metadata = {
  title: "Liste des flux RSS: La Presse à Presse",
};

const ALL_SOURCES = Array.from(
  new Set(CATEGORIES.flatMap((c) => c.feeds.map((f) => f.name)))
).sort((a, b) => a.localeCompare(b, "fr"));

export default function ListeFluxRSS() {
  return (
    <div className={styles.shell}>
      <div className={styles.topRow}>
        <span className={styles.siteName}>
          LA PRESSE <span className={styles.siteNameAccent}>À PRESSE</span>
        </span>
      </div>

      <Link href="/" className={styles.back}>
        <ArrowLeft size={16} strokeWidth={2} aria-hidden="true" />
        Retour à l&apos;accueil
      </Link>

      <article className={styles.article}>
        <h1 className={styles.title}>Liste des flux RSS</h1>

        <p className={styles.lead}>
          Voici l&apos;ensemble des médias dont les flux RSS sont suivis par
          le site, tous groupes de catégories confondus.
        </p>

        {CATEGORIES.map((category) => (
          <div key={category.slug} className={styles.categoryBlock}>
            <h2 className={styles.h2}>{category.label}</h2>
            <p className={styles.text}>
              {category.feeds.map((f) => f.name).join(" · ")}
            </p>
          </div>
        ))}

        <h2 className={styles.h2}>Tous les médias, sans doublon</h2>
        <p className={styles.text}>{ALL_SOURCES.join(" · ")}</p>
      </article>
    </div>
  );
}
