// Test av cookies i Express.
// Start med: npm run cookie   og åpne http://localhost:3000/set-cookie

import express from "express";
import cookieParser from "cookie-parser";

const app = express();

app.use(cookieParser());

// Set cookie
app.get("/set-cookie", (req, res) => {
  res.cookie("bruker", "ola", { maxAge: 24 * 60 * 60 * 1000 }); // 1 døgn
  res.send("Cookie is set");
});

// Set cookie med sikkerhetsflagg. Se på forskjellen i nettleserens
// utviklerverktøy (Application/Lagring -> Cookies).
app.get("/set-secure-cookie", (req, res) => {
  res.cookie("sikker", "ola", {
    maxAge: 24 * 60 * 60 * 1000,
    httpOnly: true, // Kan ikke leses fra JavaScript (document.cookie) => beskytter mot tyveri via XSS
    secure: true, // Sendes kun over HTTPS (nettlesere gjør unntak for localhost)
    sameSite: "lax", // Sendes ikke med på forespørsler fra andre nettsteder (unntatt vanlige lenker) => beskytter mot CSRF
  });
  res.send("Secure cookie is set");
});

// Get cookie
app.get("/get-cookie", (req, res) => {
  res.send(`Cookie values: bruker=${req.cookies.bruker}, sikker=${req.cookies.sikker}`);
});

// Prøv dette i konsollet i nettleseren: document.cookie
// Du ser "bruker", men ikke "sikker" (pga. httpOnly).

// Delete cookie
app.get("/delete-cookie", (req, res) => {
  res.clearCookie("bruker");
  // Må bruke de samme flaggene som da cookien ble satt (unntatt maxAge/expires)
  res.clearCookie("sikker", { httpOnly: true, secure: true, sameSite: "lax" });
  res.send("Cookies are deleted");
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
