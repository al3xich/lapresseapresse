import { Story } from "./types";

// Encode/décode un sujet directement dans l'URL de sa page de détail.
// Pourquoi : sans base de données, la page de détail n'a aucun autre moyen
// fiable de retrouver EXACTEMENT le même sujet que celui affiché sur la
// carte — un second appel à l'IA reformule parfois légèrement le texte, ce
// qui cassait le lien. En encodant les données du sujet dans l'URL elle-même,
// ce qu'on clique est garanti être ce qu'on obtient, sans dépendre d'aucun
// cache.
type EncodedStory = {
  h: string; // headline
  s: string; // synthesis
  src: string[]; // sources
  a: { t: string; l: string; s: string }[]; // articles (title, link, source)
};

export function encodeStory(story: Story): string {
  const payload: EncodedStory = {
    h: story.headline,
    s: story.synthesis,
    src: story.sources,
    a: story.articles.map((art) => ({ t: art.title, l: art.link, s: art.source })),
  };
  const json = JSON.stringify(payload);
  return Buffer.from(json, "utf-8").toString("base64url");
}

export function decodeStory(encoded: string): Story | null {
  try {
    const json = Buffer.from(encoded, "base64url").toString("utf-8");
    const payload: EncodedStory = JSON.parse(json);
    return {
      id: "from-url",
      headline: payload.h,
      synthesis: payload.s,
      sources: payload.src,
      articles: payload.a.map((art) => ({
        title: art.t,
        link: art.l,
        source: art.s,
        publishedAt: null,
        contentSnippet: "",
      })),
    };
  } catch {
    return null;
  }
}
