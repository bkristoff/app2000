import express, { urlencoded, json } from "express";
import cors from "cors";
import { config } from "./config/config.js";
import { routes } from "./routes/index.js";
import session from "express-session";
import { passport } from "./services/passport.js";

const app = express();

// CORS (Cross Origin Resource Sharing) er en teknikk for å styre hvilke
// klienter som kan bruke et API. Vi skal bruke dette API'et fra React,
// som typisk kjører på port 6173 med Vite som byggeverktøy.
// Vi ønsker derfor å tillate dette:
app.use(cors({ origin: `http://localhost:5173`, credentials: true }));

// Godta kall fra alle klienter:
// app.use(cors({ origin: `*` }));

app.use(urlencoded({ extended: true }));
app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET || "en-hemmelig-tekststreng",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // Sett til true i produksjon med HTTPS
      maxAge: 24 * 60 * 60 * 1000, // 24 timer
    },
  })
);

// Initialiserer Passport
app.use(passport.initialize());
app.use(passport.session());

routes(app);

app.listen(config.port, () => {
  console.log(`Lytter på http://localhost:${config.port}`);
});
