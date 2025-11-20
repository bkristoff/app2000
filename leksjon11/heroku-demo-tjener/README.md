# Deployment av Express REST API til Heroku

Her er noen tips til hvordan du kan gå fram for å deploye en minimal Express-tjener på Heroku.

## Forutsetninger

Opprettet bruker på GitHub og Heroku + installert Node.js og Git.

## Installasjon

Enkleste variant:

```
npm install
```

Eventuelt starte fra skrætsj, der du angir server.js som navn på hovedfil:

```
npm init
npm install express
git init
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

Opprett fil server.js med innhold fra: https://expressjs.com/en/starter/hello-world.html

Endre fra port 3000 til port 3030.

Test at applikasjonen kjører lokalt:

```
npm start
```

Åpne deretter nettleseren på adresse: http://localhost:3030

## Synkronisering mot GitHub

Sørg for at appen er i Git hvis ikke allerede gjort:

```
git init
```

Synkroniser deretter mot nytt tomt repo på GitHub (se eventuelt leksjon 4).

- Sjekk at du kan pushe endringer fra VS Code.

## Utvid med lokal PostgreSQL-database

Last ned og installer PostgreSQL, som inkluderer database og klientverktøyet pgAdmin (a la MySQL Workbench).

- Under installasjonen velger du passord for admin-brukeren (postgres).
- Start pgAdmin og gå til Servers/PostgreSQL/Databases/postgres/Schemas/public/Tables.
- Høyreklikk Tables i venstremenyen og velg nytt query-vindu.
- Opprett en tabell demotab med en kolonne nr og en kolonne navn. Sett inn et par rader.

Installer pakken dotenv for å jobbe med miljøvariabler:

```
npm install -g dotenv-cli
```

Opprett en .env-fil som setter miljøvariabelen DATABASE_URL til korrekt connection string. Formatet ser slik ut:

```
postgres://BRUKERNAVN:PASSORD@SERVER:PORT/DATABASE
```

For å komme i gang på enkleste vis, så kan du bruke dette oppsettet i .env-filen - men bytt ut PASSORD med det du har valgt:

```
DATABASE_URL=postgres://postgres:PASSORD@localhost:5432/postgres
```

Seinere kan du opprette en egen bruker (i stedet for den innebygde) og en egen database (i stedet for postgres).

Opprett også en .gitignore-fil som sørger for at .env-filen og node-modules ikke blir tatt med til GitHub.

Installer deretter følgende PostgreSQL-pakker i VS Code for å jobbe med PostgreSQL fra JavaScript:

```
npm install pg
npm install --save-dev @types/pg
```

## Legg til kode som tester ut databasekoblingen (lokalt)

Se eksempelkode på server.js

## Start serveren lokalt

```
npm start
```

## Lag database på på Heroku

Gå til appen på Heroku og se under fanen Resources.

- Søk og legg til PostgreSQL under Add-ons.
- Jeg valgte abonnement (plan) Essential-0.
- Gå deretter inn på Data i hovedmenyen til Heroku og lag en ny database.

Ved å gå inn på databasen og så under fane Settings kan man velge Database Credentials.

- Her vil feltet URI vise "connection string" som kan brukes som verdi for DATABASE_URL i .env.
- Ved å oppdatere .env-filen kan du nå kjøre lokal Express-løsning mot Heroku-databasen.

Jeg måtte bruke litt forskjellig kode for oppkobling av PostgreSQL lokalt og på Heroku. Det finnes det sikkert en mer elegant løsning på, men for å bruke koden på server.js må man kommentere inn riktig kode for oppkobling i server.js før synkronisering mot Heroku.

## Opprett app på Heroku

Gå til Dashboard og opprett ny app: heroku-demo-klient

- Velg GitHub som Deployment method og koble til repoet du opprettet i forrige steg.
- Prøv først manuell deployment.
- Hvis alt går bra, skal du få opp en knapp for å vise applikasjonen.
- Typisk på adresse, der XXXXXXXXXX er en generert kode:

```
https://heroku-demo-tjener-XXXXXXXXXX.herokuapp.com/
```

Et problem er da at .env-filen ikke blir med til GitHub og heller ikke til Heroku.

- Løsning: Under fane Settings og seksjon Config Vars kan man legge til miljøvariabler.
- Legg til DATABASE_URL her. Og gjør det samme med PORT = 3030.
- Hvis du lager flere "demo-apper", så kan alle bruke samme PostgreSQL-database med samme connection string.
- Du trenger altså ikke å legge til PostgreSQL add-on til hver app (det vil føre til dobbel fakturering).

Huk deretter av for automatisk deploy.

- Gjør en liten endring, f.eks. i server.js
  Commit og synkroniser til GitHub.
- Sjekk deretter under fane Activity på Heroku at bygging gikk bra.
- Her kan det komme feilmeldinger som ikke blir oppdaget ved kjøring på lokal maskin, f.eks. ubrukt import.
- I så fall kan du friske opp nettleservinduet til applikasjonen.

## Alternativ: Bruke Heroku CLI (Command Line Interface)

Man kan alternativt bruke kommandolinjespråket til Heroku for å gjøre noen av oppgavene forklart over.

- Last først ned og installer Heroku CLI: https://devcenter.heroku.com/articles/heroku-cli

Deretter kan man gjøre noe a la dette for å lage en Heroku-app med tilhørende database:

```
heroku login
heroku create demo-app
heroku addons:create heroku-postgresql:demo-db
heroku config:get DATABASE_URL
```

Men her må du nok "forske" litt på egen hånd.
