import bcrypt from "bcrypt";
import { rateLimit } from "express-rate-limit";
import { passport, krevInnlogging } from "../services/passport.js";
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

// Definerer rutene (routes) i REST-API'et.
//
// Noen ruter er åpne for alle (f.eks. visning av varer). Andre krever innlogging:
// de har mellomvaren krevInnlogging foran selve rutefunksjonen, f.eks.
//   app.post("/ordrer", krevInnlogging, async (req, res) => { ... })
// krevInnlogging svarer 401 hvis brukeren ikke er innlogget, ellers går
// forespørselen videre, og den innloggede kunden ligger i req.user.

// TODO Koden bør refaktoriseres - mye gjentakelser!

const routes = (app) => {
  // Begrenser antall innloggingsforsøk fra samme IP-adresse, for å gjøre det
  // vanskelig å gjette passord (brute force). Her: maks 10 mislykkede forsøk per 15 minutter.
  // Telleren lages her inne, slik at hver app (se lagApp i app.js) får sin egen.
  // Det gjør det mulig å teste grensen uten at testene påvirker hverandre.
  const innloggingsGrense = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 10,
    skipSuccessfulRequests: true, // Vellykkede innlogginger teller ikke

    standardHeaders: "draft-8",
    legacyHeaders: false,
    message: { melding: "For mange innloggingsforsøk. Prøv igjen om 15 minutter." },
  });

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

  // Setter inn én rad i Vare-tabellen. Krever innlogging.
  // NB! Egentlig skal bare ansatte kunne endre varelageret, ikke alle innloggede
  // kunder. Det krever autorisasjon (roller), ikke bare autentisering. Se øvelser i README.
  app.post("/varer", krevInnlogging, async (req, res) => {
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

  // Oppdaterer rad i Vare-tabellen med gitt VNr. Krever innlogging.
  app.put("/varer", krevInnlogging, async (req, res) => {
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

  // Slett rad i Vare-tabellen med gitt VNr. Krever innlogging.
  app.delete("/varer", krevInnlogging, async (req, res) => {
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

  // Leverer opplysninger om én kunde (uten passord). Krever innlogging.
  // Autentisering (hvem er du?) er ikke nok: en innlogget kunde skal bare få se
  // sine EGNE opplysninger (autorisasjon). Ellers svarer vi 403 Forbidden.
  app.get("/kunder/:epost", krevInnlogging, async (req, res) => {
    try {
      if (req.params.epost !== req.user.epost) {
        return res.status(403).json({ melding: "Du har ikke tilgang til denne kunden." });
      }
      const [rows] = await hentKundeFraKNr(req.user.knr);
      res.status(200).json(rows);
    } catch (error) {
      res.status(500).json({ melding: error.sqlMessage || error.message });
    }
  });

  // ---------------------------------------------------------------------------
  // Autentisering med Passport
  // ---------------------------------------------------------------------------

  // Innlogging. Body: { epost, passord }.
  // Svarer 200 med brukeren (uten passord) og setter en sesjons-cookie, eller 401 ved feil.
  //
  // Vi bruker passport.authenticate med en egen callback-funksjon, slik at vi selv
  // bestemmer svaret (JSON). Standardoppførselen er laget for redirect mellom HTML-sider.
  // NB! Aldri logg req.body her – den inneholder passordet i klartekst.
  app.post("/innlogging", innloggingsGrense, (req, res, next) => {
    passport.authenticate(
      "local",
      { badRequestMessage: "Mangler e-post eller passord." },
      (error, bruker, info) => {
        if (error) {
          return next(error);
        }
        if (!bruker) {
          return res.status(401).json({ melding: info?.message });
        }
        // req.login lagrer brukeren i sesjonen (via serializeUser). Passport lager
        // samtidig en ny sesjons-id, slik at en eventuell gammel id ikke kan
        // misbrukes ("session fixation").
        req.login(bruker, (error) => {
          if (error) {
            return next(error);
          }
          console.log(`Innlogget: ${bruker.epost} (KNr ${bruker.knr})`);
          res.status(200).json(bruker);
        });
      }
    )(req, res, next);
  });

  // Utlogging. Fjerner brukeren fra sesjonen, sletter sesjonen og cookien.
  app.post("/utlogging", (req, res, next) => {
    req.logout((error) => {
      if (error) {
        return next(error);
      }
      req.session.destroy(() => {
        res.clearCookie("butikk.sid");
        res.status(200).json({ melding: "Logget ut." });
      });
    });
  });

  // Hvem er innlogget? Klienten kaller denne når siden lastes, slik at
  // brukeren forblir innlogget selv om man laster siden på nytt (F5).
  app.get("/bruker", (req, res) => {
    if (req.isAuthenticated()) {
      res.status(200).json(req.user);
    } else {
      res.status(401).json({ melding: "Ikke innlogget." });
    }
  });

  // Registrering av ny kunde. Body: { fornavn, etternavn, epost, passord, adresse, postnr }.
  // Passordet hashes med bcrypt før det lagres. Kunden blir logget inn med en gang.
  app.post("/registrering", async (req, res, next) => {
    const { fornavn, etternavn, epost, passord, adresse, postnr } = req.body ?? {};

    // Validering på tjeneren. Klienten kan sjekke det samme, men tjeneren kan
    // aldri stole på at det er gjort (hvem som helst kan sende forespørsler direkte).
    if (![fornavn, etternavn, epost, passord, adresse, postnr].every(Boolean)) {
      return res.status(400).json({ melding: "Alle feltene må fylles ut." });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(epost)) {
      return res.status(400).json({ melding: "Ugyldig e-postadresse." });
    }
    if (passord.length < 8) {
      return res.status(400).json({ melding: "Passordet må ha minst 8 tegn." });
    }
    if (!/^\d{4}$/.test(postnr)) {
      return res.status(400).json({ melding: "Postnummer må være fire siffer." });
    }

    try {
      const passordHash = await bcrypt.hash(passord, 10);
      await settInnKunde(fornavn, etternavn, epost, passordHash, adresse, postnr);
    } catch (error) {
      if (error.code === "ER_DUP_ENTRY") {
        return res.status(409).json({ melding: "E-postadressen er allerede registrert." });
      }
      if (error.code === "ER_NO_REFERENCED_ROW_2") {
        return res.status(400).json({ melding: "Ukjent postnummer." });
      }
      return next(error);
    }

    // Logger inn den nye kunden. Vi henter kunden via Passport-strategien
    // for å få samme brukerobjekt som ved vanlig innlogging.
    passport.authenticate("local", (error, bruker) => {
      if (error || !bruker) {
        return next(error || new Error("Kunne ikke logge inn ny kunde."));
      }
      req.login(bruker, (error) => {
        if (error) {
          return next(error);
        }
        res.status(201).json(bruker);
      });
    })(req, res, next);
  });

  // Setter inn en ny ordre fra en gitt handlekurv. Krever innlogging.
  // Kundenummeret hentes fra den innloggede brukeren (req.user), IKKE fra
  // forespørselen. Ellers kunne en innlogget kunde bestilt i andres navn.
  app.post("/ordrer", krevInnlogging, async (req, res) => {
    try {
      let { kurv } = req.body ?? {};
      const result = await settInnOrdre(req.user.knr, kurv);
      res.status(201); // 201 Created: en ny ressurs (ordre) er opprettet
      res.set("Content-Type", "application/json");
      res.send(JSON.stringify(result));
    } catch (error) {
      // settInnOrdre setter error.status ved "kjente" feil (400 tom kurv).
      // Alt annet er en uventet feil på tjeneren (500).
      res.status(error.status || 500);
      res.set("Content-Type", "application/json");
      res.send(
        JSON.stringify({
          melding: error.sqlMessage || error.message,
        })
      );
    }
  });

  // NB! "Ukjent URL" (404) og feilhåndtering ligger i app.js, etter rutene.
  // Der ligger også leveringen av React-klienten i produksjon.
};

export { routes };
