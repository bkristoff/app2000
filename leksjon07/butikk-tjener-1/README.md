# Dummy CRUD REST API med Express.js

Vi skal nå bygge REST API-et for nettbutikken med dummy-versjoner av CRUD-operasjoner mot vare-tabellen, det vil si operasjoner for Create (innsetting = INSERT), Read (lesing = SELECT), Update (oppdatering = UPDATE) og Delete (sletting = DELETE).

Etter hvert vil hver CRUD-operasjon medføre en SQL-kommando mot databasen. I retur fra databasen vil det komme JSON, enten i form av et spørreresultat (SELECT), eller en statusmelding (gikk det bra eller ikke).

Men i første omgang simulerer vi databasen med hardkoding av JSON-data.

## 1. Installer prosjektet og start serveren

Start fra butikk-tjener-1 og installer Express og hjelpepakker:

```
npm install
```

Start serveren, enten slik:

```
npm start
```

Eller med Nodemon hvis du vil ha automatisk omstart ved endringer:

```
nodemon ./server.js
```

## 2. Utvid med rute for å levere hele varelageret (som foreløpig er tomt)

Utvid server.js med kode for å håndtere GET mot /varer, altså "hent alle varer":

```
app.get("/varer", (req, res) => {
  res.status(200);
  res.set("Content-Type", "text/json");
  res.send("[]");
  res.end();
});
```

Hva skjer her? Et API-kall består av en forespørsel (en request = req) og en response (res). Ofte vil vi hente ut verdier fra req (data som kommer fra brukeren) og skrive resultater til res. Her gjør vi kun det siste.

Hvis en HTTP-request er vellykket blir statuskoden 200 returnert, sammen med innholdet. Data som skal tilbake til klienten setter vi inn i respons-objektet (res) ved å kalle på passende metoder (som status, set, send og end). I første omgang lar vi varelageret være tomt, en tom array [].

Test den nye ruten rett i nettleseren:

- http://localhost:3030/varer

## 3. Lag mappe routes

Før vi bygger ut koden mer skal vi reorganisere litt.

Mappen routes vil inneholde kode som håndterer de ulike API-kallene. I vårt prosjekt samler vi alt i én fil routes/index.js (i et større prosjekt er det aktuelt å dele opp i flere filer). Flytt koden som håndterer routing fra server.js og inn i denne filen, omtrent slik (merk at dette ikke er hele koden og at det er lagt til noe "rundt"):

```
const routes = (app) => {
  app.get("/varer", (req, res) => { /_ sett inn kode fra server.js _/ });
  app.get("/", (req, res) => { /_ sett inn kode fra server.js _/ });
};
export { routes };
```

I server.js legger vi inn kall på routes-funksjonen like før vi starter serveren (med app.listen):

```
routes(app);
```

For at det skal fungere må man også importere routes, men det er Copilot'en god på...

## 4. Legg til mellomvare for JSON-håndtering

Vi ønsker å sende varedata på JSON-format med hvert API-kall. For å få til det bruker vi to "mellomvare"-funksjoner urlencoded og json i hovedfilen server.js. De må først importeres:

```
import express, { urlencoded, json } from "express";
```

Og deretter brukes etter at app-objektet er laget:

```
app.use(urlencoded({ extended: true }));
app.use(json());
```

"Mellomvare"-ideen vil for øvrig bli brukt i en seinere leksjon for å implementere autentisering (innlogging). Da skal vi "plugge inn" en komponent som tar seg av dette.

## 5. Lag mappe services

Mappen services vil inneholde kode som inneholder logikk og kommuniserer med databasen. Igjen nøyer vi oss med én fil db.js og litt dummy-kode. Først hardkoder vi et varelager med 3 varer:

```
let varer = [
{
  VNr: "10820",
  Betegnelse: "Dukkehår, hvitt",
  Pris: "53.50",
  KatNr: 13,
  Antall: 106,
  Hylle: "E12",
  Slettet: 0,
  Bildefil: "steve-johnson-B2_zWEdpLlo-unsplash.jpg",
},
{
  VNr: "10822",
  Betegnelse: "Dukkehår, lys brunt",
  Pris: "53.50",
  KatNr: 13,
  Antall: 0,
  Hylle: "E12",
  Slettet: 0,
  Bildefil: "steve-johnson-B2_zWEdpLlo-unsplash.jpg",
},
{
  VNr: "10830",
  Betegnelse: "Nisseskjegg, 30 cm",
  Pris: "66.50",
  KatNr: 13,
  Antall: 42,
  Hylle: "",
  Slettet: 0,
  Bildefil: "steve-johnson-B2_zWEdpLlo-unsplash.jpg",
}];
```

Så skriver vi ut en kvittering i konsollet at funksjonen hentVarer blir utført og returnerer hele varelageret:

```
const hentVarer = () => {
  console.log("hentVarer");
  return varer;
};
```

Funksjonen hentVarer må eksporteres:

```
export { hentVarer };
```

Så må vi kalle denne funksjonen fra routes/index.js og gjøre om datastrukturen til JSON med stringify-metoden. De to nye kodelinjene blir:

```
let varer = hentVarer();
res.send(JSON.stringify(varer));
```

For at det skal fungere må man også legge på import av hentVarer.

Sjekk at løsningen fortsatt fungerer ved åpne nettleseren på riktig adresse!

Det er for øvrig flere måter å lage mappestruktur på. Noen lager undermapper for models, controllers og views (MVC-mønsteret).

## 6. Lag HTTP-request-er for CRUD mot Vare

GET-forespørsler kan testes rett i nettleseren, men for POST, PUT og DELETE trenger vi et testverktøy. Det enkleste er kanskje å bruke REST Client rett fra VS Code som vist i versjon 0.

For å hente alle varer, lager vi testHentVarer.http (altså en GET):

```
GET http://localhost:3030/varer HTTP/1.1
Content-Type: application/json
```

For denne har vi allerede laget koden, så velg filen og klikk "Send request" knappen rett over kodevinduet. Responsen skal dukke opp i et eget vindu, forhåpentligvis med kode 200 = OK.

De neste request'ene kan vi foreløpig ikke teste, men vi lager de ferdig.

For å hente 1 vare gjør vi nesten det samme som over, men URL'en blir (for vare med VNr = 10820):

```
http://localhost:3030/varer/10820
```

Filen kan hete testHentVare.http (altså éntall, ikke flertall).

For å sette inn en ny vare bruker vi POST. Vi må legge til headere som sier at vi kommuniserer med JSON, og vi må fylle inn data for den nye varen i request-body'en. Vi kaller filen testNyVare.http:

```
POST http://localhost:3030/varer HTTP/1.1
Accept: application/json
Content-Type: application/json

{
  "VNr":"99980",
  "Betegnelse":"Dukkehår, hvitt",
  "Pris":"55.50",
  "KatNr":"13",
  "Antall":"106",
  "Hylle":"E12",
  "Slettet":"0",
  "Bildefil":"steve-johnson-B2_zWEdpLlo-unsplash.jpg"
}
```

For å endre på en eksisterende vare, bruker vi PUT. Denne blir nesten lik innsetting. Vi sender med nye verdier for alle kolonner. Primærnøkkelverdien brukes for å finne den ene varen (raden) som skal endres. Igjen bruk varenummer 99980.

For å slette en vare bruker vi DELETE. Igjen omtrent som for innsetting og oppdatering, men nå trenger vi kun å sende med varenummeret (primærnøkkelen). Nok en gang bruk varenummer 99980.

## 7. Tenk ut en teststrategi

Når vi får på plass koden "bak" (inkludert kobling til databasen), kan vi teste som følger:

```
testHentVarer => Sjekk at du får ut hele varelageret
testHentVare => Sjekk at du får den ene varen
testSettInnVare => Sjekk at du får respons OK
testHentVarer => Sjekk at ny vare er med i varelageret
testOppdaterVare => Sjekk at du får respons OK
testHentVarer => Sjekk at varen faktisk er oppdatert
testSlettVare => Sjekk at du får respons OK
testHentVarer => Sjekk at varen ikke lenger er med i varelageret
```

Men dette må altså vente litt...

## 8. Lag dummy-versjoner for de øvrige CRUD-operasjonene

Hent én vare kan gjøres på denne måten (i routes/index.js):

```
app.get("/varer/:vnr", (req, res) => {
  let VNr = req.params["vnr"];
  let vare = hentVare(VNr);
  res.status(200);
  res.set("Content-Type", "text/json");
  res.send(JSON.stringify(vare));
  res.end();
});
```

Legg merke til at vi nå får inn en parameter i URL'en, f.eks. /varer/10830. Vi henter ut varenummeret, kaller på en funksjon hentVare (som vi også må lage) og returnerer JSON-representasjonen av varen (ved bruk av stringify). Funksjonen hentVare lager vi i services/db.js, men den kan i første omgang bare returnere en tilfeldig vare, f.eks. varer[0].

Neste operasjon er innsetting av ny vare. Da vil request'en inneholde alle opplysningene om den nye varen (kolonne = verdi, kolonne = verdi). Igjen må vi også legge til en ny dummy-funksjon i services/db.js.

```
app.post("/varer", (req, res) => {
  let { VNr, Betegnelse, Pris, KatNr, Antall, Hylle, Slettet, Bildefil } = req.body;
  settInnVare(req.body);
  res.status(200);
  res.set("Content-Type", "text/json");
  res.send(req.body); // Sender bare request'en tilbake
  res.end();
});
```

Oppdatering og sletting kan gjøres på omtrent samme måte (kall på riktig funksjon i services/db.js og bare send req.body tilbake som en kvittering). De starter slik:

```
app.put("/varer", (req, res) => { ... });
app.delete("/varer", (req, res) => { ... });
```

## 9. Lag en "catch all"-rute som leverer 404

Nederst i routes/index.js kan vi legge en route som blir utført hvis ingen av de andre slår til. Da bruker vi "\*" som "url":

```
app.use((req, res) => { ... }
```

I dette tilfellet har klienten forsøkt å kalle på en URL som API'et ikke støtter, så vi sender bare ut kode 404 og en feilmelding. Når vi har denne kan den første hei-verden-ruten vi laget (med URL /) bare fjernes, den gjorde uansett ikke noe fornuftig.

## 10. Lag dokumentasjon med swagger-autogen

swagger-autogen er en npm-pakke som kan auto-generere dokumentasjon av REST API'er. Installere:
npm install swagger-autogen

Lag en fil swagger.js på topp-nivå:

```
import swaggerAutogen from "swagger-autogen";
const doc = {
  info: {
  title: "Butikk API",
  description: "Swagger dokumentasjon av nettbutikken.",
  },
  host: "localhost:3030",
  schemes: ["http"],
};
const outputFile = "./swagger-output.json";
const endpointsFiles = ["./routes/index.js"];
swaggerAutogen(outputFile, endpointsFiles, doc);
```

Kjør denne for å auto-generere en OpenAPI spesifikasjon av REST-API'et:

```
node ./swagger.js
```

Spesifikasjonen blir lagret på fil swagger-output.json.

Lim inn innholdet på denne JSON-filen i Swagger-editoren til SmartBear:

- https://editor.swagger.io/ (Fjern innholdet i venstre vindu og lim inn.)

API'et kan forbedres/bygges ut ved å legge inn kommentarer i koden (a la JavaDoc). Eksempel:

```
app.get("/varer", (req, res) => {
  // #swagger.description = 'Henter alle varene i nettbutikken.'
  ...
}
```

## 11. Kjør testkall fra nettleseren

Start serveren:

```
npm start
```

Kjør testkall fra Swagger-dokumentasjonen (Try it out + Execute).

## 12. Generering av Swagger-dokumentasjon a la JavaDoc

For at dette skal fungere, så kan det se ut til at "catch-all" ruten definert i punkt 9 må kommenteres ut (det finnes sikkert en løsning på dette). For å unngå å ødelegge fungerende kode, så kan vi lage alternative versjoner av filene:

```
server.js => server-with-swagger.js
routes/index.js => routes/index-with-swagger.js
```

Endre importen i server-with-swagger.js slik at den bruker routes/index-with-swagger.js.

Installer så et par ekstra pakker som tar seg av dokumentasjons-genereringen:

```
npm install swagger-jsdoc swagger-ui-express
```

Legg til importer i toppen av server-with-swagger.js:

```
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
```

Legg til i server-with-swagger.js rett før serveren startes:

```
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Butikk API",
      description: "Swagger dokumentasjon av nettbutikken.",
      contact: {
        name: "NN",
      },
      servers: [`http://localhost:3030`],
    },
  },
  apis: ["./routes/*.js"],
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
```

Åpne så nettleseren på http://localhost:3030/api-docs

Foreløpig en ganske tom side, men se denne siden for tips til hvordan å skrive JSDoc-kommentarer, som da vil dukke opp på api-docs-nettsiden:

- https://www.npmjs.com/package/swagger-jsdoc

Prøv f.eks. å legge til en JSDOC-kommentar før get/varer etter mønsteret her:

- https://github.com/Surnet/swagger-jsdoc/blob/v7/examples/app/routes.js

Som i den auto-genererte løsningen får man både dokumentasjon og mulighet for å kjøre testkall rett fra nettleseren.
