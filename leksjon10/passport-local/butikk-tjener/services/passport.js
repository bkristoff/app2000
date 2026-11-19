import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";
import { hentKundeForInnlogging, hentKundeFraKNr } from "./db.js";

// Oppsett av Passport med "local strategy", dvs. innlogging med brukernavn og passord.
// I nettbutikken er kundens e-post brukernavnet.
//
// Flyten ved innlogging (POST /login):
//   1. passport.authenticate("local") henter epost og passord fra req.body
//      og kaller verifiseringsfunksjonen under.
//   2. Verifiseringsfunksjonen svarer med done(null, kunde) eller done(null, false).
//   3. req.logIn(kunde) kaller serializeUser, som bestemmer hva som lagres i sesjonen
//      (her bare kundenummeret). Nettleseren får en sesjons-cookie.
// Ved hver senere forespørsel med cookien:
//   4. passport.session() leser kundenummeret fra sesjonen og kaller deserializeUser,
//      som henter kunden fra databasen og legger den i req.user.

// Hash av et tilfeldig passord. Brukes når e-posten ikke finnes, slik at vi kjører
// bcrypt.compare uansett. Ellers ville svaret kommet mye raskere for ukjente e-poster,
// og en angriper kunne målt seg fram til hvilke e-poster som er registrert.
const DUMMY_HASH = await bcrypt.hash("finnes-ikke", 10);

// Gjør en databaserad om til objektet vi bruker i req.user. Passordet tas IKKE med.
function tilKunde(rad) {
  return {
    knr: rad.KNr,
    epost: rad.EPost,
    navn: `${rad.Fornavn} ${rad.Etternavn}`,
  };
}

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ error: "Må være innlogget" });
}

passport.use(
  new LocalStrategy(
    { usernameField: "epost", passwordField: "passord" },
    async (epost, passord, done) => {
      try {
        const [rows] = await hentKundeForInnlogging(epost);
        const kunde = rows[0];

        // Hasher innlest passord med saltet fra den lagrede hashen og sammenligner.
        const isValid = await bcrypt.compare(
          passord,
          kunde ? kunde.Passord : DUMMY_HASH
        );

        if (!kunde || !isValid) {
          // Ikke fortell eventuelle hackere om det var e-post eller passord som var feil
          return done(null, false, { message: "Feil e-post eller passord" });
        }

        return done(null, tilKunde(kunde));
      } catch (error) {
        return done(error);
      }
    }
  )
);

// Tar vare på data om brukeren (kunden) i sesjonen i form av kundenummeret.
passport.serializeUser((kunde, done) => {
  console.log("serializeUser kalles med:", kunde);
  done(null, kunde.knr);
});

// For å "deserialisere", henter vi kundedata fra databasen basert på kundenummeret.
// Kjøres ved hver forespørsel fra en innlogget bruker.
passport.deserializeUser(async (knr, done) => {
  try {
    const [rows] = await hentKundeFraKNr(knr);
    // false betyr at kunden ikke finnes lenger; da blir brukeren logget ut.
    done(null, rows.length > 0 ? tilKunde(rows[0]) : false);
  } catch (error) {
    done(error);
  }
});

export { passport, isAuthenticated };
