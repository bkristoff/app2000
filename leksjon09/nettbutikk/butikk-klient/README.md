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

Innloggingen sjekkes mot Kunde-tabellen i databasen. Hjelpeskriptet `SettDummyEPostOgPassord.sql` lager e-postadresser med et tilfeldig domene (@abc.no, @xyz.com eller @hh.no), så du må slå opp en gyldig kunde i din egen database:

```
SELECT EPost, Passord FROM Kunde LIMIT 5;
```

Passordet er fornavnet skrevet baklengs med små bokstaver.

## 3. Kommunikasjon med tjeneren

Alle fetch-kall ligger samlet i `src/lib/api.js`:

- `hentVarer` - GET /varer
- `loggInn` - POST /innlogging
- `lagreOrdre` - POST /ordrer

Merk at `fetch` bare kaster unntak ved nettverksfeil. Svar med feilkode (f.eks. 401, 404 eller 500) må sjekkes med `res.ok`, se hjelpefunksjonen `sendForespørsel`.

## 4. Hente varelageret

I `src/pages/Butikk.jsx` hentes varene med `useEffect` når komponenten vises første gang. Effekten returnerer en oppryddingsfunksjon som avbryter kallet med `AbortController` hvis komponenten forsvinner før svaret kommer.

## 5. Innlogging

`sjekkInnlogging` i `Butikk.jsx` sender brukernavn og passord til tjeneren. Ved feil vises meldingen fra tjeneren på siden.

## 6. Lagre ordre

I `src/components/Handlekurv.jsx` lagres ordren direkte i event-funksjonen `gåTilKasse`. Vi bruker ikke `useEffect` her: koden skal kjøres fordi brukeren klikket på en knapp, og hører derfor hjemme i event-funksjonen. Se https://react.dev/learn/you-might-not-need-an-effect

Etter lagring vises ordrenummeret, og handlekurven tømmes.

## Øvelse

Prøv å skrive om `api.js` til å bruke biblioteket Axios, og sammenlign. Hva gjør Axios automatisk som vi må gjøre selv med Fetch?
