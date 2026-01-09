# Deploye nettbutikk som monorepo til Heroku

Et monorepo i vår kontekst er et GitHub-repository som inneholder koden til både backend og frontend, her lagret på undermapper "klient" og "tjener".

Vi bruker MySQL som database og Vite som byggeverktøy.

## Tilrettelegging for flytting til Heroku

For at det skal være enkelt å flytte løsningen fra localhost til Heroku, er URL-er, brukernavn og passord til databasen og lignende, lagret i .env-filer. En .env-fil for klienten og en for tjeneren. Dette er allerede gjort i dette prosjektet.

Pakken dotenv er installert for å lese inn miljøvariabler fra .env-filene. Alle variablene blir lest inn i filen config/config.js.

Miljøvariablene skal ikke lastes opp til GitHub, og .env er derfor lagt til i .gitignore-filen. Fordi dette er et monorepo, har vi kun én .gitignore-fil, på rotmappen.

## Kjøre lokalt med database på itfag.usn.no

Løsningen kjører mot en ferdi satt opp en eksempeldatabase på itfag.usn.no. Hvis du vil kjøre mot din egen database, må du først opprette tabellene for nettbutikken. Se tidligere leksjoner, eller eksporter tabellene fra eksempeldatabasen som et SQL-skript og kjør det i din egen database.

For å installere/kjøre tjeneren lokalt:

```
cd tjener
npm install
npm start
```

Åpne et nytt terminalvindu for å installere/kjøre klienten lokalt:

```
cd tjener
npm install
npm run dev
```

## Opprett repo på GitHub

Opprett Git-repo på rotappen og synkroniser mot et nytt repo på GitHub.

Kombiner .gitignore-filen fra begge undermappene i rotmappen (allerede gjort her).

## Konfigurering på Heroku

Sørg først for å synkronisere koden mot GitHub, slik at GitHub-repoet er oppdatert.

Lag bruker på Heroku og logg inn.

Opprett deretter to apper på Heroku, en for klienten og en for tjeneren.

Sett GitHub som metode og koble til monorepoet (branch main) for hver app. Dette gjøres under fane Deploy.

Vi må deretter legge inn informasjonen fra .env-filene og fortelle Heroku på hvilke undermapper de to appene ligger.

For klient-appen må du gjøre:

- Under Setting → Buildpacks: Legg først til https://github.com/timanovsky/subdir-heroku-buildpack
- Under Settings → Buildpacks: Legg deretter til heroku/nodejs
- Under Settings → Config Vars:

```
PROJECT_PATH=klient
NPM_CONFIG_PRODUCTION=false
VITE_API_URL=<URL TIL TJENERAPPEN PÅ HEROKU>
VITE_CLIENT_URL=<URL TIL KLIENTAPPEN PÅ HEROKU>
```

URL til appene finner du under Settings → Domain.

For tjener-appen må du gjøre:

- Under Settings → Buildpacks: Legg til heroku/nodejs
- Under Settings → Config Vars:

```
PROJECT_PATH=tjener
NPM_CONFIG_PRODUCTION=false
CLIENT_URL=<URL TIL KLIENTAPPEN PÅ HEROKU>
DB_HOST=<SOM I .env-FILEN>
DB_NAME=<SOM I .env-FILEN>
DB_USER=<SOM I .env-FILEN>
DB_PASSWORD=<SOM I .env-FILEN>
PORT=<SOM I .env-FILEN>
SESSION_SECRET=<SOM I .env-FILEN>
```

Noen alternativer (som jeg ikke har testet ut):

- Det er mulig å få til deployment av monorepo (med undermapper) ved hjelp av et eget skript i stedet for å bruke subdir-heroku-buildpack.
- Man kan også få det til ved å legge klientdelen og tjenerdelen inn i hver sin branch i samme repo.

## Pluss en midlertidig (?) løsning for klienten

Sett inn både "localhost" og HOST NAME (altså URL UTEN HTTPS-delen og ikke skråstrek til slutt) til klienten i styrefilen vite.config.js under allowedHosts. Dette navnet burde det vel egentlig være mulig å hente fra en miljøvariabel (som kommentert i filen), men jeg fant ikke ut av dette.

## Deploy og kjør

Velg fane Deploy og klikk Deploy branch under "Manual deploy" (nederst).

Start deretter applikasjonene, tjeneren først og deretter klienten, med knappen "Open app" øverst til høyre.

Ved problemer: Les loggene!
