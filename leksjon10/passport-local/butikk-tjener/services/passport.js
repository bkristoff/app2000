import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";
import { hentKunde, hentKundeFraKNr } from "./db.js";

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ error: "Må være innlogget" });
}

// Oppsett av Passport med "local strategY",
// dvs. innlogging med brukernavn og passord,
// bare at i vårt eksempel fungerer kundens epost som brukernavn.
passport.use(
  new LocalStrategy(
    { usernameField: "epost", passwordField: "passord" },
    async (epost, passord, done) => {
      try {
        let [rows, meta] = await hentKunde(epost);

        if (rows.length === 0) {
          // Ikke fortell eventuelle hackere mer enn nødvendig
          return done(null, false, { message: "Feil e-post eller passord" });
        }

        const kunde = rows[0];

        // Krypterer innlest passord og sammenligner med det som er hentet fra databasen
        const isValid = await bcrypt.compare(passord, kunde.Passord);

        if (!isValid) {
          // Ikke fortell eventuelle hackere mer enn nødvendig
          return done(null, false, { message: "Feil e-post eller passord" });
        }

        return done(null, {
          knr: kunde.KNr,
          epost: kunde.EPost,
          navn: kunde.Fornavn + kunde.Etternavn,
        });
      } catch (error) {
        return done(error);
      }
    }
  )
);

// Tar vare på data om brukeren (kunden) i form av kundenummeret.
passport.serializeUser((kunde, done) => {
  console.log("serializeUser kalles med:", kunde);
  done(null, kunde.knr);
});

// For å "deserialisere", henter vi kundedata fra databasen
// basert på kundenummeret.
passport.deserializeUser(async (knr, done) => {
  console.log("deserializeUser kalles med knr:", knr);
  try {
    let [rows, meta] = await hentKundeFraKNr(knr);
    if (rows.length > 0) {
      const kunde = {
        knr: rows[0].KNr,
        epost: rows[0].EPost,
        navn: rows[0].Fornavn + rows[0].Etternavn,
      };
      console.log("deserializeUser returnerer:", kunde);
      done(null, kunde);
    } else {
      done(null, null);
    }
  } catch (error) {
    done(error);
  }
});

export { passport, isAuthenticated };
