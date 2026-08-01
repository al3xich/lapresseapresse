import styles from "./Logo.module.css";

// Le symbole (presse hydraulique + liasse de journaux) est partagé avec le
// favicon (app/icon.svg) — seule la version ici ajoute le texte, pensée pour
// le header. Voir app/icon.svg pour la version symbole seul.
export default function Logo() {
  return (
    <div className={styles.wrap}>
      <svg width="46" height="46" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M 30 100 A 70 70 0 0 1 100 30" fill="none" stroke="#1E1E1E" strokeWidth="3" />
        <path d="M 100 30 A 70 70 0 0 1 165 95" fill="none" stroke="#2563EB" strokeWidth="3" />

        <rect x="55" y="28" width="90" height="18" rx="2" fill="#26272B" />
        <circle cx="66" cy="37" r="3" fill="#0F0F10" />
        <circle cx="134" cy="37" r="3" fill="#0F0F10" />

        <rect x="60" y="46" width="10" height="34" fill="#3A3B40" />
        <rect x="95" y="46" width="10" height="34" fill="#3A3B40" />
        <rect x="130" y="46" width="10" height="34" fill="#3A3B40" />

        <rect x="50" y="80" width="100" height="14" rx="2" fill="#26272B" />

        <rect x="48" y="97" width="104" height="13" fill="#F0B429" />
        <path d="M48 97 L61 110 L48 110 Z" fill="#1E1E1E" />
        <path d="M74 97 L87 110 L74 110 Z" fill="#1E1E1E" />
        <path d="M100 97 L113 110 L100 110 Z" fill="#1E1E1E" />
        <path d="M126 97 L139 110 L126 110 Z" fill="#1E1E1E" />
        <path d="M152 97 L152 110 L145 110 L145 97 Z" fill="#1E1E1E" />

        <rect x="52" y="112" width="96" height="42" rx="2" fill="#EDE3D3" stroke="#C9BB9F" strokeWidth="1" />
        <line x1="56" y1="120" x2="120" y2="120" stroke="#8A7F6E" strokeWidth="1.4" />
        <line x1="56" y1="127" x2="140" y2="127" stroke="#8A7F6E" strokeWidth="1.4" />
        <line x1="56" y1="134" x2="115" y2="134" stroke="#8A7F6E" strokeWidth="1.4" />
        <line x1="56" y1="141" x2="130" y2="141" stroke="#8A7F6E" strokeWidth="1.4" />
        <line x1="56" y1="148" x2="100" y2="148" stroke="#8A7F6E" strokeWidth="1.4" />
        <rect x="60" y="112" width="6" height="42" fill="#2563EB" />
        <rect x="128" y="112" width="6" height="42" fill="#2563EB" />

        <rect x="42" y="158" width="116" height="10" rx="2" fill="#1E1E1E" />
      </svg>

      <div className={styles.text}>
        <span className={styles.line}>
          LA PRESSE <span className={styles.red}>À PRESSE</span>
        </span>
        <span className={styles.tagline}>un même sujet, plusieurs sources, ton opinion</span>
      </div>
    </div>
  );
}
