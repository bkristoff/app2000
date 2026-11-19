# Autentisering med Passport i React+Vite

Denne varianten viser hvordan React-klienten til nettbutikken kan utvides med Passport-autentisering.

## 1. Kjøre løsningen

Installere:

```
npm install
```

Sørg for at database og webtjener kjører. Start klienten:

```
npm run dev
```

Åpne nettleser på adresse: http://localhost:5173

Logg inn med for eksempel e-post "paaa@abc.no" og passord "laap". `npm run forbered-db` i butikk-tjener skriver ut flere kunder du kan bruke. E-postdomenet er tilfeldig, så sjekk i din egen database.

## 3. Hva er endret?

Klienten kommuniserer med tjeneren ved å bruke Fetch API. Dette skjer på disse stedene:

- I Butikk.jsx blir varelageret hentet. Dette krever ikke innlogging og gjøres som før.
- I Butikk.jsx spør en `useEffect` tjeneren (`GET /user`) om brukeren allerede er innlogget. Sesjonen lever på tjeneren, så brukeren forblir innlogget når siden lastes på nytt.
- I Butikk.jsx ligger også koden for å sjekke innlogging. Her sender vi brukernavn (det vil si e-post) og passord til ruten /login med `credentials: "include"` (se under). Ved feil vises meldingen fra tjeneren.
- I Handlekurv.jsx er det kode for å legge inn en ny bestilling. Den sender bare handlekurven til ruten /ordrer. Tjeneren vet hvem kunden er ut fra sesjons-cookien, og derfor må vi igjen bruke `credentials: "include"`.
- I Handlekurv er det også kode som gjør utlogging ved å sende request til ruten /logout. Etter lagring av handlekurven vises en modal dialog med beskjed om at bestillingen er lagret. Brukeren logges først ut når hen klikker OK.

```
const response = await fetch("http://localhost:3030/login", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ epost: brukernavn, passord: passord }),
  credentials: "include",
});
```
