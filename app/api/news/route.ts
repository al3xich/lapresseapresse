import { NextRequest, NextResponse } from "next/server";
import { getCategory } from "@/lib/sources";
import { getCategoryStories } from "@/lib/getStories";

// Recalculé au maximum toutes les 4h et mis en cache par Next.js :
// ça évite de rappeler l'IA à chaque visite et garde le coût sous contrôle.
export const revalidate = 14400;

export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get("category");
  const category = slug ? getCategory(slug) : undefined;

  if (!category) {
    return NextResponse.json({ error: "Catégorie inconnue" }, { status: 404 });
  }

  const { stories, demo } = await getCategoryStories(category);
  return NextResponse.json({ stories, demo });
}
