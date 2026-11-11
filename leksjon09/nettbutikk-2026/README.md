# Nettbutikk (fullstack)

Vi kombinerer butikk-klient-4 (Vite-varianten) fra leksjon 6 med butikk-tjener-3 med database (MySQL-varianten) fra leksjon 8.

Utvidelsen blir å koble klienten til tjeneren med Fetch API:

- Hente varedata fra databasen med useEffect.
- Sjekke innlogging mot Kunde-tabellen.
- Lagre handlekurven som en ny ordre (med transaksjon i databasen).

Start i denne rekkefølgen: MySQL, deretter butikk-tjener (`node server.js`), og til slutt butikk-klient (`npm run dev`).

Se spesielt på `src/lib/api.js`, `src/pages/Butikk.jsx` og `src/components/Handlekurv.jsx` i klienten, og på `services/db.js` og `routes/index.js` i tjenerdelen.

## Flerspråklighet (i18n)

Klienten er flerspråklig (norsk og engelsk) med i18next, på samme måte som i `i18n-demo`:

- `src/i18n.js` setter opp i18next. Språket huskes i localStorage, og `lang` på `<html>` oppdateres ved språkbytte.
- Tekstene ligger i `public/locales/no/translation.json` og `public/locales/en/translation.json`, gruppert per komponent (f.eks. `nav.butikk`).
- Komponentene henter tekster med `const { t } = useTranslation();` og `t("nøkkel")`. Se eksempler på variabler (`{{brukernavn}}`) i `Handlekurv.jsx` og entall/flertall (`count`) i `Vareliste.jsx`.
- Språkknappen (EN/NO) ligger i `NavBar.jsx`.
- Utenfor komponenter (`lib/api.js`, `lib/hjelpere.js`) brukes `i18n.t(...)` og `i18n.language` direkte. Beløp formateres etter valgt språk.
- Feilmeldinger fra tjeneren (f.eks. ved feil innlogging) er fortsatt på norsk, siden de lages i butikk-tjener.

## Kart over butikkene (React Leaflet)

Lenken «Finn en butikk nær deg» i bunnteksten går til siden `/butikker`, som viser Hobbyhusets (tenkte) fysiske butikker i et kart. Løsningen bygger på `mapdemo/react-leaflet`:

- `src/lib/butikker.js` inneholder butikkene med posisjon `[breddegrad, lengdegrad]`. I en reell løsning ville de ligget i databasen og blitt hentet med fetch.
- `src/pages/Butikker.jsx` viser kartet med `MapContainer`, `TileLayer` (OpenStreetMap), `Marker` og `Popup`.
- Kartutsnittet tilpasses automatisk slik at alle butikkene vises (`bounds`).
- Klikk på en butikk i listen flytter kartet dit. Det gjøres via `useRef`, som gir tilgang til selve Leaflet-kartobjektet (`kartRef.current.flyTo(...)`).
- Merk fiksen for markørikonet øverst i `Butikker.jsx`: uten den vises ikke markørene etter `npm run build`, fordi Vite gir bildefilene nye navn.

## Interaktiv kodeforklaring

Åpne `../kodeforklaring.html` (på rotmappen til leksjon09) direkte i nettleseren (ingen installasjon). Siden forklarer samspillet mellom frontend og backend steg for steg, og teknikkene over (Tailwind, mørk modus, i18n og kart), med animasjoner og små quizer. Den består av én enkelt HTML-fil med HTML, CSS og JavaScript.
