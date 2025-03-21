export default function getTimeAgo(pastDate, language = "fr") {
  // Vérifier si la date passée est valide
  const date = new Date(pastDate);
  if (isNaN(date)) {
    throw new Error("La date fournie est invalide.");
  }
  console.log(date);
  const difference = Date.now() - date.getTime();

  // Vérifier si la différence est un nombre valide
  if (!isFinite(difference) || difference < 0) {
    throw new Error("La date fournie est dans le futur ou non valide.");
  }

  // Convertir la différence en unités de temps
  const seconds = Math.floor(difference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30); // Approximation
  const years = Math.floor(months / 12);

  // Utiliser Intl.RelativeTimeFormat pour formater le résultat
  const formatter = new Intl.RelativeTimeFormat(language, { numeric: "auto" });

  if (years > 0) return formatter.format(-years, "year");
  if (months > 0) return formatter.format(-months, "month");
  if (days > 0) return formatter.format(-days, "day");
  if (hours > 0) return formatter.format(-hours, "hour");
  if (minutes > 0) return formatter.format(-minutes, "minute");
  return formatter.format(-seconds, "second");
}
