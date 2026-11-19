import bcrypt from "bcrypt";
import { rateLimit } from "express-rate-limit";
import { passport, isAuthenticated } from "../services/passport.js";
import {
  hentVarer,
  hentVare,
  hentVarerPaginert,
  settInnVare,
  oppdaterVare,
  slettVare,
  hentKundeFraKNr,
  settInnKunde,
  settInnOrdre,
} from "../services/db.js";

// Begrenser antall mislykkede innloggingsforsøk fra samme IP-adresse,
// for å gjøre det vanskelig å gjette passord (brute force).
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutter
  limit: 10,
  skipSuccessfulRequests: true,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: { error: "For mange innloggingsforsøk. Prøv igjen om 15 minutter." },
});

// Definerer rutene (routes) i REST-API'et.

// TODO Koden bør refaktoriseres - mye gjentakelser!

const routes = (app) => {
  // Leverer hele Vare-tabellen i Hobbyhuset på JSON-format
  app.get("/varer", async (req, res) => {
    try {
      const [rows, fields] = await hentVarer();
      res.status(200);
      res.set("Content-Type", "application/json");
      res.send(JSON.stringify(rows));
    } catch (error) {
      res.status(500);
      res.set("Content-Type", "application/json");
      res.send(
        JSON.stringify({
          "SQL Error Message": error.sqlMessage || error.message,
        })
      );
    }
  });

  // Leverer Vare-tabellen "paginert" på JSON-format
  app.get("/varer/paginert", async (req, res) => {
    try {
      let snr = Number(req.query.snr);
      let ant = Number(req.query.ant);
      const [rows, fields] = await hentVarerPaginert(snr, ant);
      res.status(200);
      res.set("Content-Type", "application/json");
      res.send(JSON.stringify(rows));
    } catch (error) {
      res.status(500);
      res.set("Content-Type", "application/json");
      res.send(
        JSON.stringify({
          "SQL Error Message": error.sqlMessage || error.message,
        })
      );
    }
  });

  // Leverer én rad fra Vare-tabellen i Hobbyhuset på JSON-format.
  app.get("/varer/:vnr", async (req, res) => {
    try {
      let VNr = req.params["vnr"];
      const [rows, fields] = await hentVare(VNr);
      res.status(200);
      res.set("Content-Type", "application/json");
      res.send(JSON.stringify(rows));
    } catch (error) {
      res.status(500);
      res.set("Content-Type", "application/json");
      res.send(
        JSON.stringify({
          "SQL Error Message": error.sqlMessage || error.message,
        })
      );
    }
  });

  // Setter inn én rad i Vare-tabellen.
  // Denne ruten er kun tilgjengelig for brukere som er logget inn.
  app.post("/varer", isAuthenticated, async (req, res) => {
    try {
      let { VNr, Betegnelse, Pris, KatNr, Antall, Hylle, Slettet, Bildefil } =
        req.body;
      const result = await settInnVare(
        VNr,
        Betegnelse,
        Pris,
        KatNr,
        Antall,
        Hylle,
        Slettet,
        Bildefil
      );
      res.status(201);
      res.set("Content-Type", "application/json");
      res.send(JSON.stringify(result));
    } catch (error) {
      res.status(500);
      res.set("Content-Type", "application/json");
      res.send(
        JSON.stringify({
          "SQL Error Message": error.sqlMessage || error.message,
        })
      );
    }
  });

  // Oppdaterer rad i Vare-tabellen med gitt VNr.
  // Denne ruten er kun tilgjengelig for brukere som er logget inn.
  app.put("/varer", isAuthenticated, async (req, res) => {
    try {
      let { VNr, Betegnelse, Pris, KatNr, Antall, Hylle, Slettet, Bildefil } =
        req.body;
      const result = await oppdaterVare(
        VNr,
        Betegnelse,
        Pris,
        KatNr,
        Antall,
        Hylle,
        Slettet,
        Bildefil
      );
      res.status(200);
      res.set("Content-Type", "application/json");
      res.send(JSON.stringify(result));
    } catch (error) {
      res.status(500);
      res.set("Content-Type", "application/json");
      res.send(
        JSON.stringify({
          "SQL Error Message": error.sqlMessage || error.message,
        })
      );
    }
  });

  // Slett rad i Vare-tabellen med gitt VNr.
  // Denne ruten er kun tilgjengelig for brukere som er logget inn.
  app.delete("/varer", isAuthenticated, async (req, res) => {
    try {
      let VNr = req.body?.VNr;
      const result = await slettVare(VNr);
      res.status(200);
      res.set("Content-Type", "application/json");
      res.send(JSON.stringify(result));
    } catch (error) {
      res.status(500);
      res.set("Content-Type", "application/json");
      res.send(
        JSON.stringify({
          "SQL Error Message": error.sqlMessage || error.message,
        })
      );
    }
  });

  // Leverer én rad fra Kunde-tabellen (uten passord). Krever innlogging.
  // Autentisering (hvem er du?) er ikke nok: en innlogget kunde skal bare få se
  // sine EGNE opplysninger (autorisasjon). Ellers svarer vi 403 Forbidden.
  app.get("/kunder/:brukernavn", isAuthenticated, async (req, res) => {
    try {
      if (req.params.brukernavn !== req.user.epost) {
        return res.status(403).json({ error: "Ingen tilgang til denne kunden" });
      }
      const [rows] = await hentKundeFraKNr(req.user.knr);
      res.status(200).json(rows);
    } catch (error) {
      res.status(500);
      res.set("Content-Type", "application/json");
      res.send(
        JSON.stringify({
          "SQL Error Message": error.sqlMessage || error.message,
        })
      );
    }
  });

  // Setter inn en ny ordre fra en gitt handlekurv.
  // Denne ruten er kun tilgjengelig for brukere som er logget inn.
  // Kundenummeret hentes fra den innloggede brukeren (req.user), IKKE fra
  // forespørselen. Ellers kunne en innlogget kunde bestilt i andres navn.
  app.post("/ordrer", isAuthenticated, async (req, res) => {
    try {
      let { kurv } = req.body ?? {};
      const result = await settInnOrdre(req.user.knr, kurv);
      res.status(201);
      res.set("Content-Type", "application/json");
      res.send(JSON.stringify(result));
    } catch (error) {
      // settInnOrdre setter error.status ved "kjente" feil (400: tom kurv,
      // ukjent vare, ugyldig antall). Alt annet er en uventet feil (500).
      res.status(error.status || 500);
      res.set("Content-Type", "application/json");
      res.send(
        JSON.stringify({
          error: error.sqlMessage || error.message,
        })
      );
    }
  });

  // Registrering av ny kunde.
  // Body: { fornavn, etternavn, epost, passord, adresse, postnr }.
  // Kundenummeret lages av databasen (høyeste KNr + 1), ikke av klienten.
  // Passordet hashes med bcrypt, og kunden blir logget inn med en gang.
  // TODO: Har ikke laget frontend-kode for dette (se passport-local-2026).
  app.post("/register", async (req, res, next) => {
    const { fornavn, etternavn, epost, passord, adresse, postnr } = req.body ?? {};

    // Validering på tjeneren – klienten kan aldri stoles på.
    if (![fornavn, etternavn, epost, passord, adresse, postnr].every(Boolean)) {
      return res.status(400).json({ error: "Alle feltene må fylles ut" });
    }
    if (passord.length < 8) {
      return res.status(400).json({ error: "Passordet må ha minst 8 tegn" });
    }

    try {
      const passwordHash = await bcrypt.hash(passord, 10);
      await settInnKunde(fornavn, etternavn, epost, passwordHash, adresse, postnr);
    } catch (error) {
      if (error.code === "ER_DUP_ENTRY") {
        return res.status(409).json({ error: "E-postadressen er allerede i bruk" });
      }
      console.log("Feil ved registrering: " + error);
      return res.status(400).json({ error: "Kunne ikke registrere kunden" });
    }

    // Logger inn den nye kunden via Passport-strategien (samme body: epost og passord).
    passport.authenticate("local", (err, user) => {
      if (err || !user) {
        return next(err || new Error("Kunne ikke logge inn ny kunde"));
      }
      req.logIn(user, (err) => {
        if (err) {
          return next(err);
        }
        res.status(201).json({ user });
      });
    })(req, res, next);
  });

  // Innlogging. Body: { epost, passord }.
  // Vi bruker passport.authenticate med en egen callback, slik at vi selv
  // kan svare med JSON (standard er redirect mellom HTML-sider).
  // NB! Aldri logg req.body her – den inneholder passordet i klartekst.
  app.post("/login", loginLimiter, (req, res, next) => {
    passport.authenticate(
      "local",
      { badRequestMessage: "Mangler e-post eller passord" },
      (err, user, info) => {
        if (err) {
          return next(err);
        }
        if (!user) {
          return res.status(401).json({ error: info?.message });
        }
        // req.logIn lagrer brukeren i sesjonen (via serializeUser).
        // Passport lager samtidig en ny sesjons-id, slik at en eventuell gammel
        // id ikke kan misbrukes ("session fixation").
        req.logIn(user, (err) => {
          if (err) {
            return next(err);
          }
          console.log("Vellykket innlogging:", user.epost);
          return res.json({ user });
        });
      }
    )(req, res, next);
  });

  // Utlogging. Fjerner brukeren fra sesjonen, sletter sesjonen og cookien.
  app.post("/logout", (req, res, next) => {
    req.logout((err) => {
      if (err) {
        return next(err);
      }
      req.session.destroy(() => {
        res.clearCookie("butikk.sid");
        res.json({ message: "Logget ut" });
      });
    });
  });

  // Sjekk innloggingsstatus. Klienten kaller denne når siden lastes, slik at
  // brukeren forblir innlogget selv om siden lastes på nytt.
  app.get("/user", (req, res) => {
    if (req.isAuthenticated()) {
      res.json({ user: req.user });
    } else {
      res.status(401).json({ error: "Ikke innlogget" });
    }
  });

  // Fanger alle andre request'er og leverer en feilmelding.
  app.use(async (req, res) => {
    res.status(404);
    res.set("Content-Type", "text/plain");
    res.send("Ukjent URL");
  });
};

export { routes };
