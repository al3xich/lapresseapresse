export type Article = {
  title: string;
  link: string;
  source: string;
  publishedAt: string | null;
  contentSnippet: string;
};

export type Story = {
  id: string;
  headline: string;
  synthesis: string;
  sources: string[];
  articles: Article[];
};
