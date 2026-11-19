import i18n from "../i18n.js";

// Et eksempel på en hjelpefunksjon vi trenger i flere komponenter.

// Presentasjon av beløp i norske kroner. Formatet følger valgt språk:
// norsk gir "1 234,50 kr", engelsk gir "NOK 1,234.50".
// i18n.language leses ved hvert kall, så formatet endres når språket byttes.
const prisInklMva = (p) => p * 1.25;

const visBeløp = (pris) =>
  new Intl.NumberFormat(i18n.language, {
    style: "currency",
    currency: "NOK",
  }).format(prisInklMva(pris));

export { visBeløp };
