# Butikk-klient-4 med Vite

Denne varianten bruker Vite som byggeverktøy og er basert på butikk-klient-4 fra leksjon 6.

Den kommuniserer med tjeneren ved hjelp av Axios og useEffect.

## 1. Kjøre løsningen

Installere:

```
npm install
```

Sørg for at database og webtjener kjører. Start klienten:

```
npm run dev
```

Åpne nettleser på adresse: http://localhost:3000

Logg inn med "epost=paaa@hh.no" og passord "laap".

# 2. Hva er endret for å hente varelageret

Lagt til i app/butikk/page.js etter useState-hook-ene:

- URL-en til vare-ressursen i REST APIet
- Bruk av useEffect/Axios get-kall

# 3. Hva er endret for å lagre ordre

Lagt til i components/handlekurv.js:

- URL-en til ordre-ressursen i REST APIet
- En teller for å aktivere useEffect for hver ordre
- Bruk av useEffect/Axios post-kall
