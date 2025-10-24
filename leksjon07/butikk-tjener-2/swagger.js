// Kilde: https://www.npmjs.com/package/swagger-autogen#usage-basic

// Kjør følgende kommando for å auto-generere OpenAPI spesifikasjon:
// node swagger.js
// Resultatet blir lagret på fil swagger-output.json.

// Lim inn json-filen i editoren på:
// https://editor.swagger.io/

// API-et kan forbedres/bygges ut ved å legge inn kommentarer i koden (a la JavaDoc).

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
