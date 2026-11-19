// Oppsett av flerspråklighet med i18next, på samme måte som i i18n-demo.
// Se: https://react.i18next.com/guides/quick-start
//
// Oversettelsene ligger i public/locales/{språk}/translation.json og lastes
// ned fra webtjeneren med HttpBackend når de trengs (se Network-fanen i DevTools).
// Nøklene er gruppert per komponent, f.eks. "nav.butikk" eller "handlekurv.tittel".

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpBackend from "i18next-http-backend";

// Valgt språk lagres i localStorage (som temaet), slik at det huskes
// når siden lastes på nytt. Norsk er standard.
const lagretSpråk = localStorage.getItem("språk") ?? "no";

i18n
  .use(HttpBackend)
  .use(initReactI18next)
  .init({
    lng: lagretSpråk,
    fallbackLng: "no", // Brukes hvis en tekst mangler i valgt språk
    supportedLngs: ["no", "en"],
    ns: ["translation"],
    defaultNS: "translation",
    backend: {
      loadPath: `${import.meta.env.BASE_URL}locales/{{lng}}/{{ns}}.json`,
    },
    interpolation: { escapeValue: false }, // React beskytter allerede mot XSS
    react: { useSuspense: false },
    debug: false, // Sett til true for å se hva i18next gjør i konsollen
  });

// Hver gang språket byttes: husk valget og oppdater lang-attributtet
// på <html> (viktig for skjermlesere og orddeling).
i18n.on("languageChanged", (lng) => {
  localStorage.setItem("språk", lng);
  document.documentElement.lang = lng;
});

export default i18n;
