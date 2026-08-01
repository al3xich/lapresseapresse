"use client";

import { useEffect, useState } from "react";
import styles from "./UpdateStatus.module.css";

function formatElapsed(ms: number): string {
  const min = Math.floor(ms / 60000);
  if (min < 1) return "à l'instant";
  if (min < 60) return `il y a ${min} min`;
  const h = Math.floor(min / 60);
  const rem = min % 60;
  return `il y a ${h}h${rem > 0 ? String(rem).padStart(2, "0") : ""}`;
}

function formatRemaining(ms: number): string {
  if (ms <= 0) return "imminente";
  const min = Math.floor(ms / 60000);
  const h = Math.floor(min / 60);
  const rem = min % 60;
  if (h < 1) return `dans ${rem} min`;
  return `dans ${h}h${rem > 0 ? String(rem).padStart(2, "0") : ""}`;
}

// generatedAt correspond au moment où Next.js a effectivement recalculé la
// page (rendu serveur au dernier revalidate). revalidateSeconds doit
// correspondre à la valeur `export const revalidate` de la page.
export default function UpdateStatus({
  generatedAt,
  revalidateSeconds,
}: {
  generatedAt: string;
  revalidateSeconds: number;
}) {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 30000);
    return () => clearInterval(id);
  }, []);

  if (now === null) return null; // évite un décalage entre rendu serveur et client

  const generated = new Date(generatedAt).getTime();
  const elapsed = now - generated;
  const remaining = generated + revalidateSeconds * 1000 - now;

  return (
    <div className={styles.wrap}>
      <div className={styles.badge}>
        <span className={`${styles.dot} ${styles.dotGreen}`} />
        Mis à jour {formatElapsed(elapsed)}
      </div>
      <div className={styles.badge}>
        <span className={`${styles.dot} ${styles.dotOrange}`} />
        Prochaine mise à jour {formatRemaining(remaining)}
      </div>
    </div>
  );
}
