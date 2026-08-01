// Couleurs approximatives de l'identité visuelle réelle de chaque média —
// reconstituées à l'œil à partir de leurs logos publics, pas extraites d'une
// charte graphique officielle. Si une couleur te semble fausse (comme
// Libération, qui n'est pas vert mais rouge), dis-le et on la corrige.
// L'ordre compte : les entrées les plus spécifiques doivent être vérifiées
// avant les plus génériques (ex. "Next (Libération)" avant "Libération").
const BRAND_COLORS: [string, string][] = [
  ["Next (Libération)", "#5EA500"],
  ["Le Monde", "#111111"],
  ["Le Figaro", "#0B3D91"],
  ["Libération", "#E10600"],
  ["France Info", "#FF7900"],
  ["Les Échos", "#00485F"],
  ["Mediapart", "#8A6D1F"],
  ["Valeurs Actuelles", "#1B3B6F"],
  ["Boulevard Voltaire", "#7A1F1F"],
  ["Causeur", "#2B2B2B"],
  ["Numerama", "#7B2FF7"],
  ["01net", "#FF6600"],
  ["Clubic", "#0091D5"],
  ["Journal du Geek", "#6C3FC5"],
  ["ZDNet", "#CC0000"],
  ["Frandroid", "#00BCD4"],
  ["Sciences et Avenir", "#1565C0"],
  ["CNRS", "#0055A4"],
  ["Futura Sciences", "#00A99D"],
  ["Pour la Science", "#2E7D32"],
  ["L'Équipe", "#003DA5"],
  ["RMC Sport", "#E2001A"],
  ["Eurosport", "#00A3E0"],
  ["France Football", "#D50032"],
  ["Le Parisien", "#E4002B"],
  ["La Tribune", "#F26522"],
  ["Challenges", "#B0102D"],
  ["Capital", "#E2001A"],
  ["SeLoger", "#FF5A00"],
  ["PAP", "#4CAF50"],
  ["Economie Matin", "#37474F"],
  ["Actu-Environnement", "#2E8B57"],
  ["Jeuxvideo.com", "#FF8200"],
  ["Telerama", "#F26D21"],
  ["IGN", "#CC0000"],
  ["Gamekult", "#8B0000"],
];

const FALLBACK = "#6B7280";

export function getSourceColor(name: string): string {
  const match = BRAND_COLORS.find(([key]) => name.includes(key));
  return match ? match[1] : FALLBACK;
}

// Fond pastel dérivé de la couleur de marque, pour garder les badges lisibles
// sur fond clair tout en respectant la teinte réelle de chaque source.
export function getSourceTint(name: string): string {
  const hex = getSourceColor(name).replace("#", "");
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, 0.12)`;
}
