# Lagring i MySQL del 2 + autentisering med Passport

## Nytt i leksjon 10: Passport

Innloggingen er skrevet om til å bruke [Passport](https://www.passportjs.org/) med "local strategy" (e-post og passord), sesjoner (express-session) og bcrypt-hashede passord.

### Kom i gang

```
npm install
npm run forbered-db
npm start
```

`npm run forbered-db` (filen `forbered-passport-db.js`) må kjøres én gang. Skriptet gjør tre ting:

1. Tar sikkerhetskopi av Kunde-tabellen til `Kunde_backup`.
2. Gjør `EPost` unik og legger på en UNIQUE-indeks. `SettDummyEPostOgPassord.sql` lager nemlig duplikater, og dupliserte adresser får kundenummeret lagt inn, for eksempel `asho5123@xyz.com`.
3. Hasher alle passord med bcrypt.

Til slutt skriver skriptet ut noen e-poster med klartekstpassord som du kan teste med. Passordet er fortsatt fornavnet baklengs. Skriptet kan trygt kjøres flere ganger.

Kopier gjerne `.env.example` til `.env` og sett `SESSION_SECRET`. Uten den bruker tjeneren en utviklingsverdi og skriver ut en advarsel.

### Hvor er koden?

- **`services/passport.js`** setter opp Passport:
  - `LocalStrategy` henter kunden og sjekker passordet med `bcrypt.compare`.
  - `serializeUser` legger kundenummeret i sesjonen. `deserializeUser` henter kunden igjen ved hver forespørsel og legger den i `req.user`.
  - Mellomvaren `krevInnlogging` svarer 401 hvis ingen er innlogget.
- **`server.js`** setter opp CORS med `credentials: true`, `express-session` med sikre cookie-innstillinger og `passport.session()`.
- **`routes/index.js`** har de nye rutene:

| Rute | Hva | Svar |
| --- | --- | --- |
| `POST /innlogging` | `{ epost, passord }` | 200 + bruker, 401, 429 (for mange forsøk) |
| `POST /utlogging` | Avslutter sesjonen | 200 |
| `GET /bruker` | Hvem er innlogget? | 200 + bruker, 401 |
| `POST /registrering` | Ny kunde, logges inn | 201, 400, 409 (e-post i bruk) |

Disse rutene krever innlogging (`krevInnlogging`):

- `POST /ordrer`. Kunden hentes fra `req.user`, ikke fra forespørselen. Ellers kunne man bestilt i andres navn.
- `GET /kunder/:epost`. Gir bare innsyn i egne opplysninger, ellers 403. Svaret inneholder aldri passordet.
- `POST`/`PUT`/`DELETE /varer`.

### Sikkerhetstiltak i koden

- Passord lagres bare som bcrypt-hash, aldri i klartekst. Passordet logges heller aldri.
- Svaret er det samme ved feil e-post og feil passord ("Feil e-post eller passord."). For ukjente e-poster kjøres `bcrypt.compare` likevel mot en dummy-hash, slik at svartiden ikke avslører om e-posten er registrert.
- `express-rate-limit` tillater maks 10 mislykkede innlogginger per 15 minutter per IP.
- Passport lager en ny sesjons-id ved innlogging, som beskytter mot "session fixation".
- Sesjons-cookien har `httpOnly` (JavaScript kan ikke lese den) og `sameSite: "lax"` (beskytter mot CSRF).
- Tjeneren validerer input ved registrering, uavhengig av hva klienten sjekker.
- Ved bestilling hentes prisen fra Vare-tabellen, ikke fra klienten. Ellers kunne en "kreativ" kunde sendt `"pris": 0`. Antall må være et positivt heltall, og ukjente varer gir 400.

### Test med REST Client

`testInnlogging.http` går gjennom hele flyten: innlogging, `/bruker`, 403 på andres data, utlogging og registrering. `testNyOrdre.http` viser bestilling med og uten innlogging. REST Client husker cookies mellom kallene, akkurat som en nettleser.

### Øvelser

- **Autorisasjon:** Nå kan alle innloggede kunder endre varelageret. Legg til en rolle (f.eks. en tabell `Ansatt` eller en kolonne `Rolle`) og lag mellomvaren `krevAnsatt`.
- **Sesjonslagring:** Sesjonene ligger i minnet og forsvinner ved omstart. Prøv `express-mysql-session`.

---

**Nytt i leksjon 9:** Ruten `POST /innlogging` sjekker brukernavn og passord mot Kunde-tabellen (401 ved feil). `POST /ordrer` svarer nå 201 ved suksess, 400 ved tom handlekurv og 404 ved ukjent kunde. Se `testInnlogging.http` og `testNyOrdre.http`.

Kjør tjeneren med `npm start`. Den lytter på http://localhost:3030 og godtar kall fra React-klienten på http://localhost:5173 (CORS), se `server.js`.

Vi skal nå utvide løsningen med lagring av data om kunder.

Vi følger "mønsteret" for Vare-tabellen.

Du kan hoppe over punkt 1 til 3 hvis du gjorde dette i butikk-tjener-2.

## 1. Installere MySQL

```
npm install
npm install mysql2
```

## 2. Sett opp en MySQL-database for Hobbyhuset

Sørg for at en lokal MySQL server er installert og kjører.

Lag en tom database butikk med en "app-bruker" butikkapp, som kan jobbe med denne databasen:

```
CREATE DATABASE butikk;
CREATE USER 'butikkapp' IDENTIFIED BY 'hemmelig';
GRANT ALL PRIVILEGES ON butikk.* TO 'butikkapp';
GRANT SHOW DATABASES ON *.* TO 'butikkapp';
GRANT SHOW VIEW ON *.* TO 'butikkapp';
GRANT SELECT ON *.* TO 'butikkapp';
FLUSH PRIVILEGES;
```

Logg inn med bruker butikkapp og kjør SQL-skriptet for Hobbyhuset i butikk-databasen:

- https://dbsys.info/Databasesystemer/1_Datasett/sqlskript.html

Kjør deretter hjelpeskriptet som tilpasser databasen til vår webapp:

```
config/SettDummyEPostOgPassord.sql
```

## 3. Tilpass config.js

Endre parametre på styrefilen config/config.js slik at det passer med ditt oppsett.

Hvis du jobber med Git, så bør denne filen nevnes i .gitignore slik at den ikke blir med i repoet.

## 4. Lag nye ruter

Se på filen routes/index.js og ruter mot Vare-tabellen. Lag følgende Kunde-ruter:

- Hent alle kunder
- Hent en bestemt kunde
- Hent en "side" med kunder (paginering)
- Sett inn en ny kunde
- Endre opplysninger om en bestemt kunde
- Slett en bestemt kunde

## 5. Lag nye funksjoner på mappe services

Se på filen services/db.js og CRUD-funksjoner mot Vare-tabellen.

Lag følgende CRUD-funksjoner mot Kunde-tabellen:

- hentKunder
- hentKunde
- hentKunderPaginert
- settInnKunde
- oppdaterKunde
- slettKunde

## 6. Lag og kjør nye testfiler

Lag http-filer for å teste ut alle Kunde-rutene med REST Client.

Start med å kopiere tilsvarende Vare-filer.

Et testopplegg:

- Vis alle kunder
- Vis en bestemt kunde
- Sett inn en ny kunde
- Vis denne kunden
- Endre opplysninger om en bestemt kunde
- Vis denne kunden
- Slett den nye kunden du satt inn
- Vis alle kunder (og sjekk at den du slettet er borte)

Underveis kan du også inspisere databasen og sjekke at effekten er som forventet.

Det aller beste hadde jo vært om alt dette lot seg automatisere.
