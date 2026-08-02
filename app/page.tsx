import { redirect } from "next/navigation";
import { CATEGORIES } from "@/lib/sources";

// La page d'accueil ne fait qu'aiguiller vers la première catégorie : toute
// la vraie logique vit maintenant dans /categorie/[slug], une vraie route
// statique où le cache de 4h fonctionne réellement (voir ce fichier pour
// le pourquoi).
export default function Home() {
  redirect(`/categorie/${CATEGORIES[0].slug}`);
}
