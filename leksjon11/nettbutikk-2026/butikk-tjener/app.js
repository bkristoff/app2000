import express, { urlencoded } from "express";
import cors from "cors";
import session from "express-session";
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { config } from "./config/config.js";
import { routes } from "./routes/index.js";
import { passport } from "./services/passport.js";

// Selve Express-applikasjonen lages i denne filen, mens server.js starter den
// (app.listen). Med denne oppdelingen kan testene (mappe test) lage en app og
// sende forespørsler til den med Supertest, uten å starte en "ekte" tjener.
//
// lagApp er en funksjon, slik at hver test kan få sin egen, "ferske" app
// (f.eks. med en tom teller for innloggingsforsøk).

// Mappen der Vite legger den ferdigbygde React-klienten (npm run build).
const KLIENT_DIST = fileURLToPath(new URL("../butikk-klient/dist", import.meta.url));

export function lagApp() {
  const app = express();

  // På Heroku går alle forespørsler gjennom en "proxy" (en ruter foran appen),
  // som tar seg av HTTPS. Uten denne linjen tror Express at forespørselen kom
  // over vanlig HTTP fra proxyens IP-adresse. Da ville sikre cookies (secure)
  // ikke blitt sendt, og alle brukere hadde delt samme grense for innloggingsforsøk.
  if (config.produksjon) {
    app.set("trust proxy", 1);
  }

  // CORS (Cross Origin Resource Sharing) er en teknikk for å styre hvilke
  // klienter som kan bruke et API. Under utvikling kjører React-klienten (Vite)
  // på en annen port (5173) enn API-et (3030), og regnes derfor som en annen "origin".
  //
  // Med innlogging må nettleseren sende med sesjons-cookien. Da kreves:
  //   - credentials: true her, og credentials: "include" i fetch-kallene i klienten
  //   - en bestemt origin. origin: "*" er IKKE lov sammen med credentials.
  //
  // I produksjon (Heroku) leveres klienten fra samme tjener som API-et,
  // og da er CORS ikke i bruk i det hele tatt.
  app.use(cors({ origin: config.klientUrl, credentials: true }));

  app.use(urlencoded({ extended: true }));
  app.use(express.json());

  // Sesjoner: tjeneren "husker" brukeren mellom forespørsler. Nettleseren får en cookie
  // med en tilfeldig sesjons-id; selve dataene (kundenummeret) ligger på tjeneren.
  if (!config.sessionSecret) {
    if (config.produksjon) {
      // I produksjon nekter vi å starte uten en ordentlig hemmelighet.
      throw new Error("SESSION_SECRET må være satt i produksjon (se README).");
    }
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
        secure: config.produksjon, // Bare over HTTPS i produksjon (Heroku har HTTPS)
        maxAge: 2 * 60 * 60 * 1000, // 2 timer
      },
      // NB! Sesjonene lagres i minnet (MemoryStore) og forsvinner når tjeneren
      // startes på nytt. I produksjon bruker man f.eks. en database til dette.
    })
  );

  // Initialiserer Passport og kobler det til sesjonen (gir oss req.user og req.isAuthenticated()).
  app.use(passport.initialize());
  app.use(passport.session());

  // Den ferdigbygde React-klienten (index.html, JavaScript, CSS, språkfiler).
  // Finnes bare etter npm run build, typisk på Heroku.
  const harKlient = existsSync(KLIENT_DIST);
  if (harKlient) {
    app.use(express.static(KLIENT_DIST));
  }

  // REST API-et
  routes(app);

  // React Router bestemmer selv hvilken side som vises ut fra adressen
  // (f.eks. /butikk eller /om). Hvis brukeren åpner en slik adresse direkte
  // (eller trykker F5), må tjeneren svare med index.html, så tar React over.
  // Gjelder bare GET-forespørsler fra en nettleser som vil ha HTML.
  if (harKlient) {
    app.use((req, res, next) => {
      if (req.method === "GET" && req.accepts("html")) {
        return res.sendFile("index.html", { root: KLIENT_DIST });
      }
      next();
    });
  }

  // Fanger alle andre request'er og leverer en feilmelding.
  app.use((req, res) => {
    res.status(404);
    res.set("Content-Type", "text/plain");
    res.send("Ukjent URL");
  });

  // Feilhåndtering: fanger feil som sendes videre med next(error).
  // Detaljene logges på tjeneren, men sendes ikke til klienten.
  app.use((error, req, res, next) => {
    console.error(error);
    res.status(500).json({ melding: "En feil oppsto på tjeneren." });
  });

  return app;
}
