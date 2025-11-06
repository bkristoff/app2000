// En enkel Express-app som henter data fra en MySQL-database.

// FORUTSETTER: MySQL-databasen til Hobbyhuset er opprettet:
// http://dbsys.info/Databasesystemer/1_Datasett/sqlskript.html
// Og tilpasset ved å kjøre SQL-skript på config-mappe.
// Endre dessuten oppkoblingsparametre på config/config.js.

// Installere prosjektet med pakker for express, mysql2,
// cors og swagger-autogen:
// npm install

// Starte tjeneren:
// node server.js

// Vi skal etter hvert bruke dette REST-API'et fra en React-app,
// men den kan også testes med cURL, eller Postman/Insomnia/Swagger.
// GET-kall kan testes rett i nettleseren. Prøv f.eks. å åpne
// nettleser på: localhost:3030/varer

import express, { urlencoded, json } from "express";
import cors from "cors";
import { config } from "./config/config.js";
import { routes } from "./routes/index.js";

const app = express();

// CORS (Cross Origin Resource Sharing) er en teknikk for å styre hvilke
// klienter som kan bruke et API. Etter hvert skal vi bruke dette API'et
// fra React, som typisk kjører på port 3000. Da kan vi bruke:
// app.use(cors({ origin: `http://localhost:3000` }));

app.use(cors({ origin: `*` })); // Godtar alle
app.use(urlencoded({ extended: true }));
app.use(express.json());

routes(app);

app.listen(config.port, () => {
  console.log(`Lytter på http://localhost:${config.port}`);
});
