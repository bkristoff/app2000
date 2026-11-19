import { config } from "./config/config.js";
import { lagApp } from "./app.js";

// Starter tjeneren. Selve Express-appen (mellomvare og ruter) lages i app.js,
// slik at testene kan bruke den uten å starte tjeneren (se mappe test).
//
// Lokalt lytter vi på port 3030. På Heroku bestemmer Heroku porten
// og gir oss den i miljøvariabelen PORT (se config.js).
const app = lagApp();

app.listen(config.port, () => {
  console.log(`Lytter på http://localhost:${config.port}`);
});
