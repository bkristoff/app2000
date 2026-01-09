import express, { urlencoded, json } from "express";
import cors from "cors";
import { config } from "./config/config.js";
import { routes } from "./routes/index.js";
import session from "express-session";
import { passport } from "./services/passport.js";

const app = express();

// Logg hvilken klient som sender hver forespørsel (for testing)
/*
app.use((req, res, next) => {
  console.log("Request Origin:", req.headers.origin);
  next();
});
*/

const corsOptions = {
  origin: config.clientUrl,
  optionsSuccessStatus: 200,
  credentials: true,
};
app.use(cors(corsOptions));

// Godta kall fra alle klienter (for testing):
// app.use(cors({ origin: `*` }));

app.use(urlencoded({ extended: true }));
app.use(express.json());
app.use(
  session({
    secret: config.sessionSecret,
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
