import passport from "passport";
import bcrypt from "bcrypt";
import { isAuthenticated } from "../services/passport.js";
import {
  hentVarer,
  hentVare,
  hentVarerPaginert,
  settInnVare,
  oppdaterVare,
  slettVare,
  hentKunde,
  settInnKunde,
  settInnOrdre,
} from "../services/db.js";

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
      let VNr = req.body.VNr;
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

  // Leverer én rad fra Kunde-tabellen i Hobbyhuset på JSON-format.
  // Denne ruten er kun tilgjengelig for brukere som er logget inn.
  app.get("/kunder/:brukernavn", isAuthenticated, async (req, res) => {
    try {
      let brukernavn = req.params["brukernavn"];
      const [rows, fields] = await hentKunde(brukernavn);
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

  // Setter inn en ny ordre fra en gitt handlekurv.
  // Denne ruten er kun tilgjengelig for brukere som er logget inn.
  app.post("/ordrer", isAuthenticated, async (req, res) => {
    try {
      let { brukernavn, kurv } = req.body;
      const result = await settInnOrdre(brukernavn, kurv);
      // Debugging - sjekk hva vi har fått fra klienten
      // console.log(brukernavn);
      // console.log(JSON.stringify(kurv, null, 2));
      // Og hva vi sender til klienten
      // console.log(JSON.stringify(response, null, 2));
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

  // Registrering
  // TODO: Har ikke laget frontend-kode for dette,
  // det er altså kun mulig å logge inn med en eksisterende bruker.
  // Backend-koden under bør nok også modifiseres litt.
  // Det er blant annet naturlig å la knr være autonummerert i databasen,
  // og i så fall ikke kreve at kunden finner på sitt eget kundenummer.
  app.post("/register", async (req, res) => {
    try {
      const { knr, fornavn, etternavn, epost, passord, adresse, postnr } =
        req.body;
      const passwordHash = await bcrypt.hash(passord, 10);

      const result = await settInnKunde(
        knr,
        fornavn,
        etternavn,
        epost,
        passwordHash,
        adresse,
        postnr
      );
      res.status(201);
      res.set("Content-Type", "application/json");
      res.send(JSON.stringify(result));
    } catch (error) {
      console.log("Feil: " + error);
      res.status(400).json({
        error:
          "En feil oppsto på serveren, kan f.eks. skyldes at e-post allerede er i bruk.",
      });
    }
  });

  // Innlogging
  app.post("/login", (req, res, next) => {
    console.log("Login-forsøk:", req.body);

    passport.authenticate("local", (err, user, info) => {
      if (err) {
        console.error("Feil ved autentisering:", err);
        return res.status(500).json({ error: "Serverfeil" });
      }

      if (!user) {
        console.log("Autentisering feilet:", info);
        return res
          .status(401)
          .json({ error: info?.message || "Feil e-post eller passord" });
      }

      req.logIn(user, (err) => {
        if (err) {
          console.error("Feil ved req.logIn:", err);
          return res.status(500).json({ error: "Kunne ikke logge inn" });
        }

        console.log("Vellykket innlogging:", user);
        return res.json({ user: req.user });
      });
    })(req, res, next);

    //res.json({ user: req.user });
  });

  // Utlogging
  // TODO: Har ikke laget frontend-kode for dette.
  // Tips: Lag en knapp som gjør en POST-request med useEffect.
  app.post("/logout", (req, res) => {
    req.logout(() => {
      res.json({ message: "Logget ut" });
    });
  });

  // Sjekk innloggingsstatus
  // TODO: Brukes heller ikke i frontend pr. nå.
  app.get("/user", (req, res) => {
    console.log("Session ID:", req.sessionID);
    console.log("Session:", req.session);
    console.log("isAuthenticated:", req.isAuthenticated());
    console.log("User:", req.user);

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
