import express, { urlencoded } from "express";
import cors from "cors";
import session from "express-session";
import { config } from "./config/config.js";
import { routes } from "./routes/index.js";
import { passport } from "./services/passport.js";

const app = express();

// CORS (Cross Origin Resource Sharing) er en teknikk for å styre hvilke
// klienter som kan bruke et API. Vi skal bruke dette API'et fra React,
// som typisk kjører på port 5173 med Vite som byggeverktøy.
// For at nettleseren skal sende med sesjons-cookien trengs credentials: true,
// og da må vi oppgi en bestemt origin (origin: "*" er ikke lov sammen med credentials).
app.use(cors({ origin: config.klientUrl, credentials: true }));

app.use(urlencoded({ extended: true }));
app.use(express.json());

if (!config.sessionSecret) {
  console.warn(
    "ADVARSEL: SESSION_SECRET er ikke satt (se .env.example). Bruker en hemmelighet som kun er for utvikling."
  );
}
app.use(
  session({
    secret: config.sessionSecret || "kun-for-utvikling-bytt-meg",
    name: "butikk.sid", // Standardnavnet connect.sid avslører at vi bruker Express
    resave: false,
    saveUninitialized: false, // Ikke lag sesjon (og cookie) før noen logger inn
    cookie: {
      httpOnly: true, // JavaScript i nettleseren kan ikke lese cookien
      sameSite: "lax", // Sendes ikke med på POST fra andre nettsteder (CSRF)
      secure: false, // Sett til true i produksjon med HTTPS
      maxAge: 2 * 60 * 60 * 1000, // 2 timer
    },
  })
);

// Initialiserer Passport
app.use(passport.initialize());
app.use(passport.session());

routes(app);

// Feilhåndtering: detaljer logges på tjeneren, men sendes ikke til klienten.
app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({ error: "Serverfeil" });
});

app.listen(config.port, () => {
  console.log(`Lytter på http://localhost:${config.port}`);
});
