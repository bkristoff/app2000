// Hentet fra: https://react.i18next.com/guides/quick-start

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpBackend from "i18next-http-backend";

// Tips for å bruke egne filer: https://react.i18next.com/guides/multiple-translation-files
/*
// Enkel løsning uten egne oversettelsesfiler.
// For å bruke denne varianten må man også kommentere inn resources lenger ned.
const resources = {
  en: {
    translation: {
      Welcome: "Welcome to React and react-i18next",
    },
  },
  no: {
    translation: {
      Welcome: "Velkommen til React og react-i18next",
    },
  },
};
*/

i18n
  .use(HttpBackend)
  .use(initReactI18next)
  .init({
    //resources,
    lng: "en",
    fallbackLng: "en",
    ns: ["translation"],
    defaultNS: "translation",
    backend: {
      loadPath: `${import.meta.env.BASE_URL}locales/{{lng}}/{{ns}}.json`,
    },
    interpolation: { escapeValue: false },
    react: { useSuspense: false },
    debug: true,
  });

// Debug:
// i18n.on("languageChanged", (lng) => console.log("i18n languageChanged:", lng));

export default i18n;
