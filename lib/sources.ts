export type Category = {
  slug: string;
  label: string;
  icon: "landmark" | "cpu" | "trophy" | "trending-up" | "gamepad-2" | "home" | "globe";
  feeds: { name: string; url: string }[];
};

// Chaque catégorie mélange volontairement des lignes éditoriales différentes,
// pour que l'agrégation par thème montre des angles variés sur un même sujet.
// Les flux marqués "à vérifier" suivent le format standard du CMS du site
// mais n'ont pas été testés individuellement — si une catégorie semble vide,
// commence par ceux-là.
export const CATEGORIES: Category[] = [
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
      { name: "Valeurs Actuelles", url: "https://www.valeursactuelles.com/feed" }, // à vérifier
      { name: "Boulevard Voltaire", url: "https://www.bvoltaire.fr/feed" }, // à vérifier
      { name: "Causeur", url: "https://www.causeur.fr/feed" }, // à vérifier
      { name: "Marianne", url: "https://www.marianne.net/rss.xml" }, // à vérifier
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
      { name: "BFM Business", url: "https://www.bfmbusiness.com/rss/news.xml" }, // à vérifier
      { name: "Boursorama", url: "https://www.boursorama.com/rss.xml" }, // à vérifier
      { name: "Alternatives Économiques", url: "https://www.alternatives-economiques.fr/rss.xml" }, // à vérifier
      { name: "Contrepoints", url: "https://www.contrepoints.org/feed" }, // à vérifier
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
      { name: "Frandroid", url: "https://www.frandroid.com/feed" }, // à vérifier
    ],
  },
  {
    slug: "immobilier",
    icon: "home",
    label: "Immobilier",
    feeds: [
      { name: "Le Figaro Immobilier", url: "https://www.lefigaro.fr/rss/figaro_immobilier.xml" }, // à vérifier
      { name: "Les Échos Immobilier", url: "https://www.lesechos.fr/rss/rss_immobilier.xml" }, // à vérifier
      { name: "SeLoger — L'immobilier décrypté", url: "https://edito.seloger.com/rss" }, // à vérifier
      { name: "PAP", url: "https://actu.pap.fr/feed" }, // à vérifier
      { name: "Economie Matin — Immobilier", url: "https://www.economiematin.fr/immobilier/feed" },
      {
        name: "Capital Immobilier",
        url: "https://feed.prismamediadigital.com/v1/cap/rss?sources=capital,polemik,xerfi,capital-avec-agence-france-presse,capital-avec-aof,capital-avec-reuters,capital-avec-optimaretraite&categories=immobilier",
      }, // à vérifier
      { name: "Actu-Environnement — Bâtiment", url: "https://www.actu-environnement.com/flux/rss/batiment/" },
    ],
  },
  {
    slug: "international",
    icon: "globe",
    label: "International",
    feeds: [
      { name: "France 24", url: "https://www.france24.com/fr/rss" }, // à vérifier
      { name: "RFI", url: "https://www.rfi.fr/fr/rss" }, // à vérifier
      { name: "Courrier International", url: "https://www.courrierinternational.com/feed/all/rss.xml" }, // à vérifier
      { name: "Le Monde International", url: "https://www.lemonde.fr/international/rss_full.xml" },
      { name: "Le Figaro International", url: "https://www.lefigaro.fr/rss/figaro_international.xml" }, // à vérifier
      { name: "France Info Monde", url: "https://www.francetvinfo.fr/monde.rss" },
      { name: "Valeurs Actuelles", url: "https://www.valeursactuelles.com/feed" }, // à vérifier
      { name: "Boulevard Voltaire", url: "https://www.bvoltaire.fr/feed" }, // à vérifier
      { name: "TV5Monde Info", url: "https://information.tv5monde.com/rss.xml" }, // à vérifier
      { name: "Libération International", url: "https://www.liberation.fr/arc/outboundfeeds/rss-all/category/monde/?outputType=xml" }, // à vérifier
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
      { name: "Eurosport", url: "https://www.eurosport.fr/rss.xml" }, // à vérifier
      { name: "France Football", url: "https://www.francefootball.fr/rss" }, // à vérifier
      { name: "Le Parisien Sport", url: "https://www.leparisien.fr/sports/rss.xml" }, // à vérifier
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
      { name: "Gamekult", url: "https://www.gamekult.com/feed.xml" }, // à vérifier
    ],
  },
];

export function getCategory(slug: string): Category | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}
