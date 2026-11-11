# Fetch API

Denne mappen vise demokode for bruk av Fetch API mot REST API-et til nettbutikken.

Start MySQL-databasen, deretter butikk-tjener og til slutt kjøres klientkoden på denne mappen.

Eksemplene kan kjøres via "preview" i VS Code, men se kommentarer i ajax-mappen.

Tjeneren må tillate kall fra andre "origins" (CORS). Dette er allerede slått på i nettbutikk/butikk-tjener/server.js.

- fetch_demo_1 henter alle varer og viser varenummer og betegnelse.
- fetch_demo_2 er en liten CRUD-app uten rammeverk: hent én, hent alle, hent en side, ny, oppdater og slett.

Merk at `fetch` bare kaster unntak ved nettverksfeil. Svar med feilkode (404, 500 osv.) må man sjekke selv med `res.ok`.

God øvelse:

- Se hvordan nettbutikken (butikk-klient) bruker Fetch i `src/lib/api.js`.
- Bygg ut med full CRUD-funksjonalitet for én eller flere tabeller, f.eks. Kunde.
