import express, { urlencoded } from "express";
import cors from "cors";
import session from "express-session";
import { config } from "./config/config.js";
import { routes } from "./routes/index.js";
import { passport } from "./services/passport.js";

const app = express();

// CORS (Cross Origin Resource Sharing) er en teknikk for å styre hvilke
// klienter som kan bruke et API. React-klienten (Vite) kjører på en annen port
// (5173) enn API-et (3030), og regnes derfor som en annen "origin".
//
// Med innlogging må nettleseren sende med sesjons-cookien. Da kreves:
//   - credentials: true her, og credentials: "include" i fetch-kallene i klienten
//   - en bestemt origin. origin: "*" er IKKE lov sammen med credentials.
app.use(cors({ origin: config.klientUrl, credentials: true }));

app.use(urlencoded({ extended: true }));
app.use(express.json());

// Sesjoner: tjeneren "husker" brukeren mellom forespørsler. Nettleseren får en cookie
// med en tilfeldig sesjons-id; selve dataene (kundenummeret) ligger på tjeneren.
if (!config.sessionSecret) {
  console.warn(
    "ADVARSEL: SESSION_SECRET er ikke satt (se .env.example). Bruker en hemmelighet som kun er for utvikling."
  );
}
app.use(
  session({
    secret: config.sessionSecret || "kun-for-utvikling-bytt-meg",
    name: "butikk.sid", // Standardnavnet connect.sid avslører at vi bruker Express
    resave: false, // Ikke lagre sesjonen på nytt hvis den ikke er endret
    saveUninitialized: false, // Ikke lag sesjon (og cookie) før noen logger inn
    cookie: {
      httpOnly: true, // JavaScript i nettleseren kan ikke lese cookien (beskytter mot XSS-tyveri)
      sameSite: "lax", // Sendes ikke med på POST fra andre nettsteder (beskytter mot CSRF)
      secure: false, // Sett til true i produksjon (krever HTTPS)
      maxAge: 2 * 60 * 60 * 1000, // 2 timer
    },
    // NB! Sesjonene lagres i minnet (MemoryStore) og forsvinner når tjeneren
    // startes på nytt. I produksjon bruker man f.eks. en database til dette.
  })
);

// Initialiserer Passport og kobler det til sesjonen (gir oss req.user og req.isAuthenticated()).
app.use(passport.initialize());
app.use(passport.session());

routes(app);

// Feilhåndtering: fanger feil som sendes videre med next(error).
// Detaljene logges på tjeneren, men sendes ikke til klienten.
app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({ melding: "En feil oppsto på tjeneren." });
});

app.listen(config.port, () => {
  console.log(`Lytter på http://localhost:${config.port}`);
});
