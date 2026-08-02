import Link from "next/link";
import { notFound } from "next/navigation";
import { Landmark, Cpu, Globe, Trophy, TrendingUp, Gamepad2, Home as HomeIcon, HelpCircle, Rss } from "lucide-react";
import { CATEGORIES, Category, getCategory } from "@/lib/sources";
import { getCategoryStories } from "@/lib/getStories";
import CategoryNav from "@/components/CategoryNav";
import StoryCard from "@/components/StoryCard";
import Logo from "@/components/Logo";
import UpdateStatus from "@/components/UpdateStatus";
import styles from "./page.module.css";

const ICONS: Record<Category["icon"], typeof Landmark> = {
  landmark: Landmark,
  cpu: Cpu,
  globe: Globe,
  trophy: Trophy,
  "trending-up": TrendingUp,
  "gamepad-2": Gamepad2,
  home: HomeIcon,
};

// Recalculé au maximum toutes les 4h : contrôle des coûts d'appels IA.
// Fonctionne vraiment ici (contrairement à l'ancienne page basée sur
// ?category=... qui, en lisant un searchParam, forçait Next.js à tout
// recalculer à CHAQUE visite, sans jamais respecter ce cache).
export const revalidate = 14400;
const REVALIDATE_SECONDS = 14400;

// Pré-génère une page statique par catégorie connue ; une slug inconnue
// renvoie une vraie 404 plutôt que de déclencher un appel IA arbitraire.
export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ slug: c.slug }));
}
export const dynamicParams = false;

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  const category = getCategory(params.slug);
  if (!category) notFound();

  const Icon = ICONS[category.icon];
  const { stories, demo: isDemo } = await getCategoryStories(category.slug);
  // Evalué au moment du rendu serveur, donc au moment réel du dernier recalcul ISR.
  const generatedAt = new Date().toISOString();
  const [hero, ...rest] = stories;

  return (
    <div className={styles.shell}>
      <header className={styles.header}>
        <Logo />
        <UpdateStatus generatedAt={generatedAt} revalidateSeconds={REVALIDATE_SECONDS} />
      </header>

      <div className={styles.layout}>
        <aside className={styles.sidebar}>
          <CategoryNav active={category.slug} />
          <Link href="/comment-ca-marche" className={styles.howItWorks}>
            <HelpCircle size={15} strokeWidth={2} aria-hidden="true" />
            Comment ça marche ?
          </Link>
          <Link href="/liste-flux-rss" className={styles.rssList}>
            <Rss size={15} strokeWidth={2} aria-hidden="true" />
            Liste des flux RSS
          </Link>
        </aside>

        <main>
          {isDemo && (
            <div className={styles.demoBanner}>
              Mode démo — ajoute ta clé <code>GEMINI_API_KEY</code> sur Vercel
              pour afficher les vraies actualités regroupées automatiquement.
            </div>
          )}

          <div className={styles.titleRow}>
            <h1 className={styles.categoryTitle}>
              <Icon size={24} strokeWidth={2} className={styles.categoryIcon} aria-hidden="true" />
              {category.label}
            </h1>
          </div>

          {stories.length === 0 ? (
            <p className={styles.empty}>
              Aucun sujet croisé par plusieurs sources pour l&apos;instant. Reviens
              un peu plus tard.
            </p>
          ) : (
            <>
              <StoryCard story={hero} categorySlug={category.slug} variant="hero" />
              {rest.length > 0 && (
                <div className={styles.grid}>
                  {rest.map((story) => (
                    <StoryCard
                      key={story.id}
                      story={story}
                      categorySlug={category.slug}
                      variant="compact"
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}
