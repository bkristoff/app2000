import express, { urlencoded, json } from "express";
import cors from "cors";
import { config } from "./config/config.js";
import { routes } from "./routes/index.js";

const app = express();

// CORS (Cross Origin Resource Sharing) er en teknikk for å styre hvilke
// klienter som kan bruke et API. Vi skal bruke dette API'et fra React,
// som typisk kjører på port 3000. Vi ønsker derfor å tillate dette:
//app.use(cors({ origin: `http://localhost:3000` }));

// Godta kall fra alle klienter:
app.use(cors({ origin: `*` }));

app.use(urlencoded({ extended: true }));
app.use(express.json());

routes(app);

app.listen(config.port, () => {
  console.log(`Lytter på http://localhost:${config.port}`);
});
