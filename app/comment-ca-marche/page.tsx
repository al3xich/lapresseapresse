import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { CATEGORIES } from "@/lib/sources";
import styles from "./page.module.css";

export const metadata = {
  title: "Comment ça marche: La Presse à Presse",
};

export default function CommentCaMarche() {
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
        <h1 className={styles.title}>Comment ça marche ?</h1>

        <p className={styles.lead}>
          La Presse à Presse ne rédige aucun article. Le site va chercher les
          publications de plusieurs médias, repère celles qui parlent du même
          sujet, et en tire une synthèse neutre qui met en évidence les points
          de convergence et les divergences d&apos;angle entre les sources :
          à toi de te faire ta propre opinion.
        </p>

        <h2 className={styles.h2}>Les quatre étapes</h2>
        <ol className={styles.steps}>
          <li>
            <strong>Collecte</strong>: le site interroge les flux RSS de
            plusieurs médias par catégorie, avec des lignes éditoriales
            volontairement variées.
          </li>
          <li>
            <strong>Regroupement</strong>: une IA lit les articles récents et
            regroupe ceux qui traitent du même événement précis, en ignorant
            les sujets isolés.
          </li>
          <li>
            <strong>Synthèse</strong>: pour chaque sujet couvert par au moins
            deux sources, l&apos;IA rédige un résumé neutre de quelques
            phrases, en signalant explicitement quand les médias ne
            traitent pas l&apos;information sous le même angle.
          </li>
          <li>
            <strong>Mise à jour</strong>: ce calcul est refait automatiquement
            toutes les 4 heures maximum, pour limiter le coût des appels à
            l&apos;IA tout en gardant l&apos;actualité récente.
          </li>
        </ol>

        <h2 className={styles.h2}>Les catégories suivies</h2>
        <p className={styles.text}>
          {CATEGORIES.map((c) => c.label).join(" · ")}
        </p>

        <h2 className={styles.h2}>Sur la neutralité</h2>
        <p className={styles.text}>
          L&apos;IA reçoit pour consigne explicite de rester factuelle et de
          ne jamais trancher entre les versions des différentes sources: son
          rôle est de mettre les angles en regard les uns des autres, pas de
          désigner lequel a raison. Certaines catégories, comme Politique
          française et International, mélangent volontairement des lignes
          éditoriales très différentes (de Mediapart à Valeurs Actuelles) pour
          que la pluralité soit réelle, pas symbolique.
        </p>

        <h2 className={styles.h2}>Les limites, en toute transparence</h2>
        <p className={styles.text}>
          Le site n&apos;a pas de base de données : chaque page est recalculée
          à partir des flux RSS du moment. Les liens vers un sujet précis ne
          restent donc fiables que tant que ce sujet fait encore partie du
          calcul en cours: un vieux lien partagé peut cesser de fonctionner.
          Par ailleurs, certains flux RSS peuvent occasionnellement être
          indisponibles ou changer d&apos;adresse ; le site les ignore
          silencieusement plutôt que d&apos;afficher une erreur, dans ce cas
          je veillerai à les actualiser manuellement.
        </p>
      </article>
    </div>
  );
}
