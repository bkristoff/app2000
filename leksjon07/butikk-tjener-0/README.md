# Minimalt REST API med Express.js

Vi skal nå bygge opp server-delen av nettbutikken til Hobbyhuset ved hjelp av JavaScript-rammeverket Express.js pluss noen hjelpebiblioteker.

Vi gjør det i flere steg, på samme måte som med klienten.

## 1. Opprette Express-prosjekt

Vi oppretter først et tomt npm-prosjekt. Start fra en mappe over der du vil opprette prosjektet og kjør:

```
npm init
```

Godta default-verdier nesten hele veien, men velg "server.js" som "entry point" i stedet for "index.js", og velg "module" som "type".

- Type = "module" sørger for at vi kan bruke "import" (i stedet for "require"). De gjør det samme, men import er nyere og vi har allerede brukt det på klientsiden.

```
package name: butikk-tjener-0
version: 1.0.0
description: REST API for nettbutikken til Hobbyhuset
entry point: server.js
test command:
git repository:
keywords:
author:
license: ISC
type: module
```

Prosjektet blir opprettet i mappe butikk-tjener-0. Gå ned i mappen, eller åpne denne mappen i VS Code.

## 2. Installere Express.js + nodemon

Last ned og installer Express.js med npm:

- Se gjerne npm-siden: https://www.npmjs.com/package/express
- Og dokumentasjonen til Express: https://expressjs.com/en/starter/installing.html

```
npm install express
```

Last også ned og installer hjelpebiblioteket Nodemon på samme måte:

- Nodemon er et hjelpebibliotek som starter Node-apper automatisk ved endringer i kildekoden.

```
npm install nodemon
```

Man kan også installere Express og Nodemon med samme kommando.

## 3. Lage minimal Express-app med hjelpepakker

Lim følgende inn i server.js:

```
import express from "express";

const app = express();
const port = 3030;

app.get("/", (req, res) => {
  res.send("Hei verden!");
});

app.listen(port, () => {
console.log(`Serveren lytter på port ${port}`);
});
```

Merk at vi her bruker port 3030, i stedet for 3000 som brukes i standard oppsett:

- Dette skyldes at vi vil la klientdelen (React) lytte på port 3000.
- Se: https://expressjs.com/en/starter/hello-world.html

Start serveren:

- Avsluttes med CTRL-C i terminalvinduet.

```
npm start
```

Alternativt kan du også kjøre en konkret JS-fil (kanskje en annen fil enn server.js) med:

```
node ./server.js
```

## 4. Teste GET-forespørsler

Åpne nettleseren (mens serveren kjører) på adresse:

- http://localhost:3030

Sørg for å installere følgende VS Code extension: REST Client av Huachao Mao

Lag fil testServer.http med følgende innhold:

```
GET http://localhost:3030 HTTP/1.1
Content-Type: application/json
```

Åpne filen og klikk "Send request" rett over kodevinduet.

Man kan alternativt opprette tilsvarende REST-kall i egne "REST-verktøy", f.eks. Postman.

- For enkle GET-forespørsler kan vi altså teste rett i nettleseren, men generelt trenger vi verktøy som REST Client, Postman eller lignende.

## 7. Starte serveren med nodemon

For å få til "live" oppdatering av serveren etter endring (og lagring) av kildekode, kan man starte serveren via nodemon:

```
nodemon ./server.js
```

Prøv å endre litt på testutskriften i server.js, lagre, og se at serveren gjør automatisk omstart.

Lurer du på hvordan man bør uttale nodemon? Det gjorde jeg.

https://github.com/remy/nodemon#pronunciation
