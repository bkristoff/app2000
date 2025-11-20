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

Logg inn med epost="paaa@hh.no" og passord "laap".

## 3. Hva er endret?

Klienten kommuniserer med tjeneren ved å bruke Fetch API. Dette skjer tre steder:

- I Butikk.jsx blir varelageret hentet. Dette krever ikke innlogging og gjøres som før.
- I Butikk.jsx ligger også koden for å sjekke innlogging. Her sender vi brukernavn (det vil si epost) og passord til ruten /innlogging og gir beskjed om credentials: true (se under).
- I Handlekurv.jsx er det kode for å legge inn en ny bestilling. Den sender brukernavn (epost) og handlekurv til ruten /ordre. Igjen må vi bruke credentials: true (fordi dette er en Passport-beskyttet rute).
- I Handlekurv er det også kode som gjør utlogging ved å sende request til ruten /logout. Etter lagring av handlekurv blir det vist en modal dialog med beskjed om at bestilling er lagret, og det er først når brukeren klikker i den at brukeren blir logget ut.

```
const response = await fetch("http://localhost:3030/login", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ epost: brukernavn, passord: passord }),
  credentials: "include",
});
```
