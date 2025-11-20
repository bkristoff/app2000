# Autentisering med Passport i Express

Denne filen forklarer hva som er gjort av endringer for å få Passport til å fungere med Express REST API-et.

## 1. Installere og kjøre

Det er lagt til flere nye biblioteker i package.json: bcrypt for å kryptere passord, express-session for å lage "sesjoner" (huske brukeren), passport som er autentiseringsbiblioteket og passport-local for å bruke "strategien" med brukernavn og passord. Passport støtter for øvrig mange andre strategier, f.eks. pålogging med tredjepartsbiblioteker som GitHub eller Facebook.

Alle først må du sørge for at en lokal MySQL-database kjører med databasen for nettbutikken, som forklart i leksjon 8.

Kjør så følgende skript for å lage krypterte passord:

```
node .\lag-kryptert-passord.js
```

Skriptet skriver ut en SQL-spørring som du må kjøre i MySQL-databasen

Vi installerer og kjører deretter serveren på vanlig måte:

```
npm install
npm start
```

## 2. Endringer i server.js

Vi bruker pakken cors for å tillate request-er fra localhost:5173, det vil si React-klienten (bygd med Vite).

```
app.use(cors({ origin: `http://localhost:5173`, credentials: true }));
```

Litt lenger ned legge vi til rette for "sesjoner" slik at vi "husker" brukeren gjennom ei arbeidsøkt:

```
app.use(session(...))
```

## 3. Filen passport.js

Vi konfigurerer Passport til "Local strategy", det vil pålogging med brukernavn og passord:

```
passport.use(new LocalStrategy(...));
```

Vi må fortelle Passport hvilke kolonner i databasen som inneholder "brukernavn" og "passord". I vårt tilfelle har vi en litt spesiell løsning:

- Tabellen Kunde har KNr som primærnøkkel.
- Men jeg ville la kundene logge på med epost, så brukernavn lagres i kolonnen EPost (se usernameField).
- Når vi får inn en pålogging med epost og passord, så finner vi først kunden i databasen (hentKunde).
- Deretter krypterer vi innleset passord og sammenligner med det krypterte passordet lagret i databasen.
- Merk at Passport er et eksempel på "mellomvare". Generelt kan vi plugge inn flere slike mellomvarekomponenter.
- Når innloggingssjekken er ferdig kaller vi på "done"; som generelt vil kalle på "neste" mellomvarekomponent.
- Metodene serializeUser og deserializeUser brukes for å sende data om brukeren (kunden) fram og tilbake mellom backend og frontend, her representerer vi kunden ved hjelp av kundenummeret. Dermed trenger vi en ekstra funksjon hentKundeFraKNr for å finne kunden basert på KNr.

Det ble litt ekstra koding av dette KNr/EPost-oppsettet, fordelen er kanskje at vi lærte litt ekstra om Passport på veien?

Funksjonen isAutheticated sjekker om brukeren (kunden) er logget inn.

## 4. Endring av rutene i routes/index.js

Deler av nettbutikken skal være synlig for alle, uten krav om innlogging. Dette gjelder f.eks. visning av varelageret.

Andre deler, f.eks. håndtering av varebestillinger, krever at brukeren først logger inn.

Teknisk løser vi det ved å "beskytte" noen ruter med Passport, f.eks. innsetting (POST) av nye ordrer:

```
app.post("/ordrer", isAuthenticated, async (req, res) => { ... })
```

Andre eksempler på beskyttede ruter:

- Endring, innsetting og sletting av varer (ikke i bruk fra klienten pr. nå, vil skal bare kunne gjøres av innloggede ansatte)
- Visning av én kunde

Nederst i routes/index.js ligger det tre ruter som er nye:

- POST mot /register: Oppretter en ny bruker (kunde)
- POST mot /login: Logger inn (og oppretter en sesjon, ei arbeidsøkt)
- POST mot /logout: Avslutter sesjonen

## 5 Testing med REST Client

Ikke all funksjonaliteten blir pr. nå brukt av React-klienten, men vi kan teste likevel.

Filen test-passport-ruter.http inneholder et antall eksempelkall (tilpasset utvidelsen REST Client) som vi kan kjøre etter hverandre for å simulere registrering, innlogging, bestilling og utlogging. Den første linjen er litt "magi" for å "huske" brukeren fra ett kall til neste, hvis jeg forsto rett. Prøv!
