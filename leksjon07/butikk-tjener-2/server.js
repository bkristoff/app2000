import express, { urlencoded, json } from "express";
import { routes } from "./routes/index.js";

const app = express();
const port = 3030;

app.use(urlencoded({ extended: true }));
app.use(json());
routes(app);

app.listen(port, () => {
  console.log(`Serveren lytter på port ${port}`);
});
