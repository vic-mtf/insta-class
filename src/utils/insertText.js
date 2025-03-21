export default function insertText(textarea, texteAInserer) {
  if (textarea.tagName !== "TEXTAREA") {
    console.error("L'élément fourni n'est pas un textarea.");
    return;
  }
  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;

  const texteActuel = textarea.value;
  const nouveauTexte =
    texteActuel.substring(0, start) +
    texteAInserer +
    texteActuel.substring(end);
  textarea.value = nouveauTexte;
  textarea.selectionStart = textarea.selectionEnd =
    start + texteAInserer.length;

  textarea.focus();
}
