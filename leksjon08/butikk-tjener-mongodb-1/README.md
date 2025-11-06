# Fra Express+MySQL til Express+MongoDB

Denne filen forklarer hvordan du kan kode om MySQL-butikk-tjeneren til MongoDB.

En alternativ måte å lære på, er å ta utgangspunkt i butikk-tjener-mongodb-2 og utvide denne med kode for en ny dokumentsamling (se README-fil i denne mappen).

## 1. Installer

Installer prosjektet med Node-modulene for express og mongodb:

```
npm install
```

## 2. Last ned MongoDB Community Server + MongoDB Compass

Last ned og installer MongoDB Community Server:

- https://www.mongodb.com/try/download/community

Last ned klientverktøyet MongoDB Compass:

- https://www.mongodb.com/try/download/compass

Man kan alternativt jobbe mot skyløsningen MongoDB Atlas (da må man lage seg en bruker her):

- https://www.mongodb.com/atlas

## 3. Lag MongoDB-database for nettbutikken

Opprett MongoDB-database for Hobbyhuset som forklart i SQL-skriptet: config/FraMySQLTilMongoDB.sql

Minimumsløsningen er kun å laste inn config/varer.json i MongoDB.

## 4. Rediger styrefilen config.js

Endre oppkoblingsparametre på config/config.js slik at det passer med ditt oppsett.

## 5. Start databasen og Express-tjeneren

Hvis du bruker en lokal MongoDB-database installert som en Windows-tjeneste (service):

- Fra Start-menyen søk etter Services, bla deg fram til MongoDB og sjekk at tjenesten kjører (eventuelt må du starte den).

Start deretter Express-tjenesten:

```
npm start
```

eller

```
node ./server.js
```

## 6. Kjør testskript

Se på koden i testMongoDB.js og kjør skriptet:

```
node ./testMongoDB.js
```

## 7. Lag CRUD-operasjoner

Bruk koden fra testMongoDB.js som utgangspunkt, og programmer ferdig CRUD-operasjonene mot Vare-tabellen.

Se denne nettsiden for tips:

- https://www.mongodb.com/docs/manual/crud/

## 8. Test løsningen

Restart Express-serveren og test løsningen ved å kjøre http-filene og REST-klienten (H. Mao) som tidligere.
