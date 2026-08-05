export type Category = {
  slug: string;
  label: string;
  icon: "landmark" | "cpu" | "trophy" | "trending-up" | "gamepad-2" | "home" | "globe";
  feeds: { name: string; url: string }[];
};

export const CATEGORIES: Category[] = [
  {
    slug: "international",
    icon: "globe",
    label: "International",
    feeds: [
      { name: "France 24", url: "https://www.france24.com/fr/rss" },
      { name: "RFI", url: "https://www.rfi.fr/fr/rss" },
      { name: "Courrier International", url: "https://www.courrierinternational.com/feed/all/rss.xml" },
      { name: "Le Monde International", url: "https://www.lemonde.fr/international/rss_full.xml" },
      { name: "Le Figaro International", url: "https://www.lefigaro.fr/rss/figaro_international.xml" },
      { name: "France Info Monde", url: "https://www.francetvinfo.fr/monde.rss" },
      { name: "Valeurs Actuelles", url: "https://www.valeursactuelles.com/feed" },
      { name: "Boulevard Voltaire", url: "https://www.bvoltaire.fr/feed" },
      { name: "TV5Monde Info", url: "https://information.tv5monde.com/rss.xml" },
      { name: "Libération International", url: "https://www.liberation.fr/arc/outboundfeeds/rss-all/category/monde/?outputType=xml" },
      { name: "CNEWS", url: "https://www.cnews.fr/rss/categorie/monde" },
      { name: "BFM TV", url: "https://www.bfmtv.com/rss/international/" },
    ],
  },
  {
    slug: "politique-francaise",
    icon: "landmark",
    label: "Politique française",
    feeds: [
      { name: "Le Monde", url: "https://www.lemonde.fr/politique/rss_full.xml" },
      { name: "France Info", url: "https://www.francetvinfo.fr/politique.rss" },
      { name: "Libération", url: "https://www.liberation.fr/arc/outboundfeeds/rss-all/category/politique/?outputType=xml" },
      { name: "Le Figaro", url: "https://www.lefigaro.fr/rss/figaro_politique.xml" },
      { name: "Les Échos", url: "https://services.lesechos.fr/rss/les-echos-politique.xml" },
      { name: "Mediapart", url: "https://www.mediapart.fr/articles/feed" },
      { name: "Valeurs Actuelles", url: "https://www.valeursactuelles.com/feed" },
      { name: "Boulevard Voltaire", url: "https://www.bvoltaire.fr/feed" },
      { name: "Causeur", url: "https://www.causeur.fr/feed" },
      { name: "Marianne", url: "https://www.marianne.net/rss.xml" }, // captcha lock
      { name: "BFM TV", url: "https://www.bfmtv.com/rss/politique/" },
      { name: "CNEWS", url: "https://www.cnews.fr/rss/tag/politique" },
    ],
  },
  {
    slug: "economie",
    icon: "trending-up",
    label: "Économie",
    feeds: [
      { name: "Les Échos", url: "https://www.lesechos.fr/rss/rss_une.xml" },
      { name: "La Tribune", url: "https://www.latribune.fr/rss/rubriques/economie.html" },
      { name: "France Info", url: "https://www.francetvinfo.fr/economie.rss" },
      { name: "Le Monde", url: "https://www.lemonde.fr/economie/rss_full.xml" },
      { name: "Challenges", url: "https://www.challenges.fr/economie/rss.xml" },
      {
        name: "Capital",
        url: "https://feed.prismamediadigital.com/v1/cap/rss?sources=capital,polemik,xerfi,capital-avec-agence-france-presse,capital-avec-aof,capital-avec-reuters,capital-avec-optimaretraite&categories=entreprises-marches",
      },
      { name: "BFM Business", url: "https://www.bfmbusiness.com/rss/news.xml" },
      { name: "Boursorama", url: "https://www.boursorama.com/rss.xml" },
      { name: "Alternatives Économiques", url: "https://www.alternatives-economiques.fr/rss.xml" },
      { name: "Contrepoints", url: "https://www.contrepoints.org/feed" },
    ],
  },
  {
    slug: "technologie",
    icon: "cpu",
    label: "Technologie",
    feeds: [
      { name: "Numerama", url: "https://www.numerama.com/feed/" },
      { name: "01net", url: "https://www.01net.com/feed/" },
      { name: "Clubic", url: "https://www.clubic.com/feed/news.rss" },
      { name: "Next (Libération)", url: "https://next.ink/feed/" },
      { name: "Journal du Geek", url: "https://www.journaldugeek.com/feed/" },
      { name: "ZDNet France", url: "https://www.zdnet.fr/feed/" },
      { name: "Frandroid", url: "https://www.frandroid.com/feed" },
    ],
  },
  {
    slug: "immobilier",
    icon: "home",
    label: "Immobilier",
    feeds: [
      { name: "Le Figaro Immobilier", url: "https://www.lefigaro.fr/rss/figaro_immobilier.xml" },
      { name: "Les Échos Immobilier", url: "https://www.lesechos.fr/rss/rss_immobilier.xml" }, // a check
      { name: "SeLoger — L'immobilier décrypté", url: "https://edito.seloger.com/rss" }, // a check
      { name: "PAP", url: "https://actu.pap.fr/feed" }, // a check
      { name: "Economie Matin — Immobilier", url: "https://www.economiematin.fr/immobilier/feed" },
      {
        name: "Capital Immobilier",
        url: "https://feed.prismamediadigital.com/v1/cap/rss?sources=capital,polemik,xerfi,capital-avec-agence-france-presse,capital-avec-aof,capital-avec-reuters,capital-avec-optimaretraite&categories=immobilier",
      }, // a check
      { name: "Actu-Environnement — Bâtiment", url: "https://www.actu-environnement.com/flux/rss/batiment/" },
    ],
  },
  {
    slug: "sport",
    icon: "trophy",
    label: "Sport",
    feeds: [
      { name: "L'Équipe", url: "https://www.lequipe.fr/rss/actu_rss.xml" },
      { name: "France Info", url: "https://www.francetvinfo.fr/sports.rss" },
      { name: "RMC Sport", url: "https://rmcsport.bfmtv.com/rss/" },
      { name: "France Football", url: "https://www.francefootball.fr/rss" },
      { name: "Le Parisien Sport", url: "https://www.leparisien.fr/sports/rss.xml" }, 
    ],
  },
  {
    slug: "culture-jeux-video",
    icon: "gamepad-2",
    label: "Culture / Jeux vidéo",
    feeds: [
      { name: "Jeuxvideo.com", url: "https://www.jeuxvideo.com/rss/rss.xml" },
      { name: "Telerama", url: "https://www.telerama.fr/rss.xml" },
      { name: "IGN France", url: "https://fr.ign.com/feed.xml" },
      { name: "France Info", url: "https://www.francetvinfo.fr/culture.rss" },
      { name: "Le Monde Culture", url: "https://www.lemonde.fr/culture/rss_full.xml" },
      { name: "Gamekult", url: "https://www.gamekult.com/feed.xml" }, 
    ],
  },
];

export function getCategory(slug: string): Category | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}
