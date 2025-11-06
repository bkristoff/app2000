// En enkel Express-app som henter data fra en MongoDB-database.

import express, { urlencoded, json } from "express";
import { config } from "./config/config.js";
import { routes } from "./routes/index.js";

const app = express();
app.use(urlencoded({ extended: true }));
app.use(express.json());

routes(app);

app.listen(config.port, () => {
  console.log(`Lytter på http://localhost:${config.port}`);
});
