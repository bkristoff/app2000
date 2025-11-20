# Deployment av React-klient til Heroku

Her er noen tips til hvordan du kan gå fram for å deploye en minimal React (Next) applikasjon på Heroku.

## Forutsetninger

Opprettet bruker på GitHub og Heroku + installert Node.js og Git.

## Installasjon

Enkleste variant:

```
npm install
```

Eventuelt starte fra skrætsj:

```
npx create-next-app@latest heroku-demo-klient
```

Og så redigere package.json. Legg til versjon av Node.js:

```
"engines": {
  "node": "22.x"
}
```

Og støtte for ES6:

```
"type": "module"
```

Test at applikasjonen kjører lokalt:

```
npm run dev
```

Åpne deretter nettleseren på adresse: http://localhost:3000

## Synkronisering mot GitHub

Sørg for at appen er i Git hvis ikke allerede gjort:

```
git init
```

Synkroniser deretter mot nytt tomt repo på GitHub (se eventuelt leksjon 4).

- Sjekk at du kan pushe endringer fra VS Code.

## Opprett app på Heroku

Gå til Dashboard og opprett ny app: heroku-demo-klient

- Velg GitHub som Deployment method og koble til repoet du opprettet i forrige steg.

Prøv først manuell deployment.

- Hvis alt går bra, skal du få opp en knapp for å vise applikasjonen.
- Typisk på adresse, der XXXXXXXXXX er en generert kode:

```
https://heroku-demo-klient-XXXXXXXXXX.herokuapp.com/
```

Huk deretter av for automatisk deploy.

- Gjør en liten endring, f.eks. i app/page.tsx.
- Commit og synkroniser til GitHub.
- Sjekk deretter under fane Activity på Heroku at bygging gikk bra.
- Her kan det komme feilmeldinger som ikke blir oppdaget ved kjøring på lokal maskin, f.eks. ubrukt import.
- I så fall kan du bare friske opp nettleservinduet til applikasjonen.
