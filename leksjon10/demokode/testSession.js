// Test av sessions i Express.
// Start med: npm run session   og åpne http://localhost:3000/set-session

import express from "express";
import session from "express-session";

// Hemmeligheten brukes til å signere sesjons-cookien. Den skal IKKE stå i koden
// (og dermed i Git), men hentes fra en miljøvariabel. Lag en .env-fil (se .env.example);
// npm-scriptet starter node med --env-file-if-exists=.env.
const secret = process.env.SESSION_SECRET;
if (!secret) {
  console.error("Mangler SESSION_SECRET. Kopier .env.example til .env og start med: npm run session");
  process.exit(1);
}

const app = express();

app.use(
  session({
    secret,
    resave: false, // Ikke lagre sesjonen på nytt hvis den ikke er endret
    saveUninitialized: false, // Ikke lag sesjon (og cookie) før vi faktisk lagrer noe i den (GDPR-vennlig)
    cookie: {
      httpOnly: true, // Standard i express-session, men greit å være eksplisitt
      secure: false, // Sett til true i produksjon (krever HTTPS)
      sameSite: "lax",
      maxAge: 30 * 60 * 1000, // 30 minutter
    },
    // NB! Standard er å lagre sesjoner i minnet (MemoryStore). De forsvinner når
    // serveren startes på nytt, og det er ikke ment for produksjon.
  })
);

// Set session variable
app.get("/set-session", (req, res) => {
  req.session.bruker = "ola";
  res.send("Session variable is set");
});

// Get session variable
app.get("/get-session", (req, res) => {
  res.send(`Session variable value: ${req.session.bruker} (session id: ${req.sessionID})`);
});

// Check and unset session variable
app.get("/unset-session", (req, res) => {
  if (req.session.bruker) {
    delete req.session.bruker;
    res.send("Session variable is unset");
  } else {
    res.send("No session variable to unset");
  }
});

// Ved utlogging bør hele sesjonen slettes, ikke bare én variabel.
// (Ved innlogging bør man tilsvarende lage ny sesjons-id med req.session.regenerate(),
// for å hindre "session fixation". Passport gjør dette for oss.)
app.get("/destroy-session", (req, res) => {
  req.session.destroy(() => {
    res.clearCookie("connect.sid");
    res.send("Session destroyed");
  });
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
