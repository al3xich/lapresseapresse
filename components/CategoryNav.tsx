import Link from "next/link";
import { Landmark, Cpu, Globe, Trophy, TrendingUp, Gamepad2, Home } from "lucide-react";
import { CATEGORIES, Category } from "@/lib/sources";
import styles from "./CategoryNav.module.css";

const ICONS: Record<Category["icon"], typeof Landmark> = {
  landmark: Landmark,
  cpu: Cpu,
  globe: Globe,
  trophy: Trophy,
  "trending-up": TrendingUp,
  "gamepad-2": Gamepad2,
  home: Home,
};

export default function CategoryNav({ active }: { active: string }) {
  return (
    <div>
      <div className={styles.label}>Catégories</div>
      <nav className={styles.nav} aria-label="Catégories">
        {CATEGORIES.map((cat) => {
          const Icon = ICONS[cat.icon];
          const isActive = cat.slug === active;
          return (
            <Link
              key={cat.slug}
              href={`/categorie/${cat.slug}`}
              className={`${styles.item} ${isActive ? styles.active : ""}`}
            >
              <Icon size={16} strokeWidth={2} className={styles.icon} aria-hidden="true" />
              {cat.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
