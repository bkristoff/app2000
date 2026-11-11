# Nettbutikk (fullstack)

Vi kombinerer butikk-klient-4 (Vite-varianten) fra leksjon 6 med butikk-tjener-3 med database (MySQL-varianten) fra leksjon 8.

Utvidelsen blir å koble klienten til tjeneren med Fetch API:

- Hente varedata fra databasen med useEffect.
- Sjekke innlogging mot Kunde-tabellen.
- Lagre handlekurven som en ny ordre (med transaksjon i databasen).

Start i denne rekkefølgen: MySQL, deretter butikk-tjener (`node server.js`), og til slutt butikk-klient (`npm run dev`).

Se spesielt på `src/lib/api.js`, `src/pages/Butikk.jsx` og `src/components/Handlekurv.jsx` i klienten, og på `services/db.js` og `routes/index.js` i tjenerdelen.
