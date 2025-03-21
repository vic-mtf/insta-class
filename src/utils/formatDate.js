export default function formatDate(dateInput) {
  const date = new Date(dateInput);
  const maintenant = new Date();

  function estMemeJour(date1, date2) {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }

  function estHier(date) {
    const hier = new Date(maintenant);
    hier.setDate(maintenant.getDate() - 1);
    return estMemeJour(date, hier);
  }

  function estMemeSemaine(date1, date2) {
    const debutSemaine1 = new Date(date1);
    debutSemaine1.setHours(0, 0, 0, 0);
    debutSemaine1.setDate(date1.getDate() - date1.getDay());

    const debutSemaine2 = new Date(date2);
    debutSemaine2.setHours(0, 0, 0, 0);
    debutSemaine2.setDate(date2.getDate() - date2.getDay());

    return debutSemaine1.getTime() === debutSemaine2.getTime();
  }

  function formaterHier(langue) {
    const formatter = new Intl.RelativeTimeFormat(langue, { numeric: "auto" });
    return formatter.format(-1, "day");
  }

  const langue = navigator.language || "fr-FR";

  if (estMemeJour(date, maintenant))
    return date.toLocaleTimeString(langue, {
      hour: "2-digit",
      minute: "2-digit",
    });
  else if (estHier(date)) return formaterHier(langue);
  else if (estMemeSemaine(date, maintenant))
    return date.toLocaleDateString(langue, { weekday: "long" });
  else
    return date.toLocaleDateString(langue, {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    });
}
