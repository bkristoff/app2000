# Butikk-klient-4 med Vite

Denne varianten bruker Vite som byggeverktøy og er basert på butikk-klient-4 fra leksjon 6.

Den kommuniserer med tjeneren (butikk-tjener) ved hjelp av Fetch API, som er innebygd i nettleseren.

## 1. Kjøre løsningen

Installere:

```
npm install
```

Sørg for at databasen og butikk-tjener kjører. Start klienten:

```
npm run dev
```

Åpne nettleseren på adressen Vite skriver ut, vanligvis http://localhost:5173

## 2. Logge inn

Innloggingen håndteres av Passport på tjeneren (se README i butikk-tjener). `npm run forbered-db` i butikk-tjener skriver ut noen e-poster med passord du kan teste med. Passordet er fornavnet skrevet baklengs med små bokstaver.

Du kan også registrere en ny kunde med lenken "Registrer deg her" under innloggingsskjemaet.

## 3. Kommunikasjon med tjeneren

Alle fetch-kall ligger samlet i `src/lib/api.js`:

- `hentVarer`: GET /varer
- `hentInnloggetBruker`: GET /bruker (gir `null` hvis ingen er innlogget)
- `loggInn`: POST /innlogging
- `loggUt`: POST /utlogging
- `registrer`: POST /registrering
- `lagreOrdre`: POST /ordrer

### Cookies og `credentials: "include"`

Klienten (http://localhost:5173) og tjeneren (http://localhost:3030) har ulik origin. Som standard sender `fetch` da ikke med cookies, og tjeneren "glemmer" hvem vi er mellom kallene. Derfor har `sendForespørsel` satt `credentials: "include"`. Tjeneren må på sin side svare med `Access-Control-Allow-Credentials: true` og en bestemt origin, ikke `*` (se `server.js`).

Åpne DevTools → Application → Cookies → http://localhost:3030 etter innlogging. Der ser du cookien `butikk.sid` med HttpOnly. Skriv `document.cookie` i konsollet, og du ser at JavaScript ikke kan lese den.

### Klienten bestemmer ikke hvem som bestiller

`lagreOrdre` sender bare handlekurven, ikke brukernavnet. Tjeneren finner kunden ut fra sesjonen. Generelt kan ingenting klienten sender stoles på.

Merk at `fetch` bare kaster unntak ved nettverksfeil. Svar med feilkode (f.eks. 401, 404 eller 500) må sjekkes med `res.ok`, se hjelpefunksjonen `sendForespørsel`.

## 4. Hente varelageret

I `src/pages/Butikk.jsx` hentes varene med `useEffect` når komponenten vises første gang. Effekten returnerer en oppryddingsfunksjon som avbryter kallet med `AbortController` hvis komponenten forsvinner før svaret kommer.

## 5. Innlogging, utlogging og registrering

`Butikk.jsx` holder på den innloggede brukeren i `bruker`, som er `null` når ingen er innlogget.

- **Ved oppstart** spør en `useEffect` tjeneren om noen allerede er innlogget (`hentInnloggetBruker`). Sesjonen lever på tjeneren, så brukeren forblir innlogget selv om siden lastes på nytt.
- **`sjekkInnlogging`** sender e-post og passord til tjeneren. Ved feil vises meldingen fra tjeneren på siden. Passordet tømmes fra state etter innlogging.
- **`loggUtBruker`** avslutter sesjonen på tjeneren.
- **`Registrering.jsx`** er et skjema for nye kunder. Det har ett state-objekt for alle feltene, og tjeneren logger inn den nye kunden direkte.
- **Hvis tjeneren svarer 401** ved lagring av ordre, for eksempel fordi sesjonen er utløpt eller tjeneren er startet på nytt, vises innloggingsskjemaet igjen.

## 6. Lagre ordre

I `src/components/Handlekurv.jsx` lagres ordren direkte i event-funksjonen `gåTilKasse`. Vi bruker ikke `useEffect` her: koden skal kjøres fordi brukeren klikket på en knapp, og hører derfor hjemme i event-funksjonen. Se https://react.dev/learn/you-might-not-need-an-effect

Etter lagring vises ordrenummeret, og handlekurven tømmes.

## 7. Mørk modus med useContext

Knappen 🌙/☀️ i menyen bytter mellom lys og mørk modus. Dette er et eksempel på `useContext`: temaet trengs av komponenter langt fra hverandre (`NavBar` med knappen og `Layout` som setter fargene), og vi vil slippe å sende det som props gjennom alle mellomliggende komponenter ("prop drilling").

- `src/lib/tema.js` oppretter konteksten med `createContext`.
- `src/components/TemaProvider.jsx` tar vare på temaet med `useState` og deler `{ tema, byttTema }` med alle komponenter inni seg.
- `src/App.jsx` legger `<TemaProvider>` ytterst rundt hele appen.
- `NavBar` og `Layout` henter verdiene med `useContext(TemaContext)`.

`Layout` gir det ytterste elementet klassen `dark` når mørk modus er valgt. I `index.css` er Tailwind satt opp (med `@custom-variant dark`) slik at alle klasser med prefikset `dark:` da slår inn, f.eks. `bg-white dark:bg-slate-800`.

Valget lagres i `localStorage` med nøkkelen `tema`, slik at det huskes når siden lastes på nytt. `TemaProvider` leser verdien med `localStorage.getItem` som startverdi for `useState` (gitt som en funksjon, så den bare leses én gang), og lagrer nytt valg med `localStorage.setItem` i `byttTema`. Du kan se og endre verdien i DevTools under Application → Local Storage.

## Øvelser

- Når ingenting er lagret ennå, starter appen alltid i lys modus. Bruk `window.matchMedia("(prefers-color-scheme: dark)").matches` til å velge startverdi ut fra innstillingen i operativsystemet.
- Bruk samme teknikk til å dele den innloggede brukeren (`bruker`) via en egen context (f.eks. `InnloggingContext`), i stedet for å ha den i `Butikk`. Da kan også `NavBar` vise hvem som er innlogget, med en utloggingsknapp.
- Prøv å skrive om `api.js` til å bruke biblioteket Axios, og sammenlign. Hva gjør Axios automatisk som vi må gjøre selv med Fetch?
