import { getSourceColor, getSourceTint } from "@/lib/sourceColors";
import styles from "./SourceBadges.module.css";

export default function SourceBadges({ sources }: { sources: string[] }) {
  return (
    <div className={styles.row}>
      {sources.map((source) => (
        <span
          key={source}
          className={styles.badge}
          style={{ color: getSourceColor(source), background: getSourceTint(source) }}
        >
          {source}
        </span>
      ))}
    </div>
  );
}
