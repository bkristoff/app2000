import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";
import { hentKundeForInnlogging, hentKundeFraKNr } from "./db.js";

// Oppsett av Passport med "local strategy", dvs. innlogging med brukernavn og passord.
// I nettbutikken er kundens e-post brukernavnet.
//
// Flyten ved innlogging (POST /innlogging):
//   1. passport.authenticate("local") henter epost og passord fra req.body
//      og kaller verifiseringsfunksjonen under.
//   2. Verifiseringsfunksjonen svarer med done(null, bruker) eller done(null, false).
//   3. req.login(bruker) kaller serializeUser, som bestemmer hva som lagres i sesjonen
//      (her bare kundenummeret). Nettleseren får en sesjons-cookie.
// Ved hver senere forespørsel med cookien:
//   4. passport.session() leser kundenummeret fra sesjonen og kaller deserializeUser,
//      som henter kunden fra databasen og legger den i req.user.

// Hash av et tilfeldig passord. Brukes når e-posten ikke finnes, slik at vi kjører
// bcrypt.compare uansett. Ellers ville svaret kommet mye raskere for ukjente e-poster,
// og en angriper kunne målt seg fram til hvilke e-poster som er registrert.
const DUMMY_HASH = await bcrypt.hash("finnes-ikke", 10);

// Gjør en databaserad om til brukerobjektet vi bruker i req.user. Passordet tas IKKE med.
function tilBruker(rad) {
  return {
    knr: rad.KNr,
    epost: rad.EPost,
    navn: `${rad.Fornavn} ${rad.Etternavn}`,
  };
}

passport.use(
  new LocalStrategy(
    { usernameField: "epost", passwordField: "passord" },
    async (epost, passord, done) => {
      try {
        const [rows] = await hentKundeForInnlogging(epost);
        const kunde = rows[0];

        // Hasher innlest passord med saltet fra den lagrede hashen og sammenligner.
        const riktigPassord = await bcrypt.compare(
          passord,
          kunde ? kunde.Passord : DUMMY_HASH
        );

        if (!kunde || !riktigPassord) {
          // Samme melding i begge tilfeller: ikke fortell en angriper
          // om det var e-posten eller passordet som var feil.
          return done(null, false, { message: "Feil e-post eller passord." });
        }

        return done(null, tilBruker(kunde));
      } catch (error) {
        return done(error);
      }
    }
  )
);

// Lagrer bare kundenummeret i sesjonen (ikke hele kunden).
passport.serializeUser((bruker, done) => {
  done(null, bruker.knr);
});

// Henter kunden fra databasen basert på kundenummeret i sesjonen.
// Kjøres ved hver forespørsel fra en innlogget bruker.
passport.deserializeUser(async (knr, done) => {
  try {
    const [rows] = await hentKundeFraKNr(knr);
    // false betyr at kunden ikke finnes lenger (f.eks. slettet); da blir brukeren logget ut.
    done(null, rows.length > 0 ? tilBruker(rows[0]) : false);
  } catch (error) {
    done(error);
  }
});

// Mellomvare som slipper gjennom innloggede brukere og svarer 401 til alle andre.
// Brukes på ruter som krever innlogging: app.post("/ordrer", krevInnlogging, ...)
function krevInnlogging(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ melding: "Du må være innlogget." });
}

export { passport, krevInnlogging };
