// Demo av CSRF (Cross-Site Request Forgery) og mottiltakene SameSite-cookies og CSRF-token.
//
// Programmet starter TO servere:
//   - "Nettbanken":       http://localhost:3000
//   - "Ondsinnet side":   http://127.0.0.1:4000
// NB! localhost og 127.0.0.1 regnes som ULIKE nettsteder av nettleseren. Det gjør ikke
// localhost:3000 og localhost:4000 – port teller ikke med i SameSite-reglene.
//
// Start med én av disse (SameSite-verdien til sesjons-cookien):
//   npm run csrf               (lax – standard, angrepet stoppes av nettleseren)
//   npm run csrf -- none       (none – cookien sendes med overalt, angrepet virker)
//   npm run csrf -- strict     (strict – cookien sendes kun fra eget nettsted)
//
// Fremgangsmåte:
//   1. Gå til http://localhost:3000 og logg inn i nettbanken.
//   2. Gå til http://127.0.0.1:4000 (den ondsinnede siden) og klikk på knappene.
//   3. Gå tilbake til nettbanken og se om pengene er borte.
//
// For å gjøre koden oversiktlig lager vi en minimal sesjonsløsning selv (en Map og en
// cookie), i stedet for express-session. Prinsippet er det samme.

import express from "express";
import cookieParser from "cookie-parser";
import crypto from "crypto";

const sameSite = (process.argv[2] || "lax").toLowerCase();
if (!["lax", "strict", "none"].includes(sameSite)) {
  console.error("Bruk: node testCsrf.js [lax|strict|none]");
  process.exit(1);
}

// ---------------------------------------------------------------------------
// Nettbanken
// ---------------------------------------------------------------------------
const bank = express();
bank.use(cookieParser());
bank.use(express.urlencoded({ extended: false }));

const sesjoner = new Map(); // sesjons-id -> { bruker, saldo, csrfToken, logg }

function hentSesjon(req) {
  return sesjoner.get(req.cookies.bankSesjon);
}

const side = (innhold) => `<!DOCTYPE html><html lang="no"><head><meta charset="UTF-8">
  <title>Nettbanken</title></head><body style="font-family:sans-serif;max-width:700px;margin:2rem auto">
  <h1>🏦 Nettbanken</h1><p><small>Sesjons-cookie: SameSite=${sameSite}</small></p>${innhold}</body></html>`;

bank.get("/", (req, res) => {
  const s = hentSesjon(req);
  if (!s) {
    return res.send(side(`<form method="post" action="/login">
      <button>Logg inn som ola</button></form>`));
  }
  res.send(side(`<p>Innlogget som <b>${s.bruker}</b>. Saldo: <b>${s.saldo} kr</b></p>
    <h2>Overfør penger</h2>
    <form method="post" action="/overfor-sikker">
      <!-- Skjult CSRF-token. Den ondsinnede siden kan ikke lese denne verdien. -->
      <input type="hidden" name="_csrf" value="${s.csrfToken}">
      Mottaker: <input name="mottaker" value="kari"> Beløp: <input name="belop" value="100" size="5">
      <button>Overfør</button>
    </form>
    <h2>Logg</h2><ul>${s.logg.map((l) => `<li>${l}</li>`).join("")}</ul>
    <form method="post" action="/logout"><button>Logg ut</button></form>`));
});

bank.post("/login", (req, res) => {
  const id = crypto.randomBytes(32).toString("hex");
  sesjoner.set(id, {
    bruker: "ola",
    saldo: 1000,
    csrfToken: crypto.randomBytes(32).toString("hex"), // Ett tilfeldig token per sesjon
    logg: [],
  });
  res.cookie("bankSesjon", id, {
    httpOnly: true,
    sameSite,
    // SameSite=None krever Secure. Nettlesere godtar Secure-cookies på http://localhost.
    secure: sameSite === "none",
  });
  res.redirect("/");
});

bank.post("/logout", (req, res) => {
  sesjoner.delete(req.cookies.bankSesjon);
  res.clearCookie("bankSesjon", { httpOnly: true, sameSite, secure: sameSite === "none" });
  res.redirect("/");
});

// Escaper tekst fra brukeren før den settes inn i HTML (ellers har vi et XSS-hull!)
const esc = (t) =>
  String(t).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

function overfor(s, req, res, endepunkt) {
  const belop = Number(req.body.belop);
  const mottaker = esc(req.body.mottaker);
  if (!Number.isInteger(belop) || belop <= 0) {
    return res.status(400).send(side(`<p>❌ Ugyldig beløp. <a href="/">Tilbake</a></p>`));
  }
  s.saldo -= belop;
  s.logg.push(`${new Date().toLocaleTimeString()}: ${belop} kr til ${mottaker} (via ${endepunkt})`);
  console.log(`[bank] ${endepunkt}: overførte ${belop} kr til ${req.body.mottaker}, Origin: ${req.get("origin")}`);
  res.send(side(`<p>✅ Overførte ${belop} kr til ${mottaker}. <a href="/">Tilbake</a></p>`));
}

// SÅRBAR: sjekker bare at brukeren er innlogget (dvs. at cookien ble sendt med).
bank.post("/overfor", (req, res) => {
  const s = hentSesjon(req);
  if (!s) {
    console.log(`[bank] /overfor: AVVIST, ingen sesjons-cookie (Origin: ${req.get("origin")})`);
    return res.status(401).send(side("<p>❌ Ikke innlogget (ingen sesjons-cookie mottatt).</p>"));
  }
  overfor(s, req, res, "/overfor");
});

// SIKKER: krever i tillegg at skjemaet inneholder riktig CSRF-token.
bank.post("/overfor-sikker", (req, res) => {
  const s = hentSesjon(req);
  if (!s) {
    console.log(`[bank] /overfor-sikker: AVVIST, ingen sesjons-cookie`);
    return res.status(401).send(side("<p>❌ Ikke innlogget (ingen sesjons-cookie mottatt).</p>"));
  }
  if (req.body._csrf !== s.csrfToken) {
    console.log(`[bank] /overfor-sikker: AVVIST, feil CSRF-token (Origin: ${req.get("origin")})`);
    return res.status(403).send(side("<p>❌ Ugyldig CSRF-token. Forespørselen kom ikke fra vårt skjema.</p>"));
  }
  overfor(s, req, res, "/overfor-sikker");
});

bank.listen(3000, () => console.log(`Nettbanken:      http://localhost:3000  (SameSite=${sameSite})`));

// ---------------------------------------------------------------------------
// Den ondsinnede siden
// ---------------------------------------------------------------------------
const ond = express();

ond.get("/", (req, res) => {
  res.send(`<!DOCTYPE html><html lang="no"><head><meta charset="UTF-8"><title>Gratis iPhone!</title></head>
  <body style="font-family:sans-serif;max-width:700px;margin:2rem auto;background:#fffbe6">
  <h1>🎉 Gratulerer! Du har vunnet en iPhone!</h1>
  <p>Klikk for å hente premien. (I et ekte angrep sendes skjemaet automatisk med JavaScript
     så snart siden lastes, og i en usynlig iframe, så offeret merker ingenting.)</p>

  <!-- Skjemaet sender en POST til nettbanken. Nettleseren legger selv ved bankens
       cookie – hvis SameSite tillater det. Angriperen trenger ikke kjenne cookien. -->
  <form method="post" action="http://localhost:3000/overfor">
    <input type="hidden" name="mottaker" value="hacker">
    <input type="hidden" name="belop" value="500">
    <button>Hent premie (angrep mot /overfor)</button>
  </form>
  <br>
  <form method="post" action="http://localhost:3000/overfor-sikker">
    <input type="hidden" name="mottaker" value="hacker">
    <input type="hidden" name="belop" value="500">
    <!-- Angriperen vet ikke hva CSRF-tokenet er, og kan ikke lese det fra banken
         (same-origin policy hindrer det). Prøver med et gjett: -->
    <input type="hidden" name="_csrf" value="gjetter-bare">
    <button>Hent premie (angrep mot /overfor-sikker)</button>
  </form>
  </body></html>`);
});

ond.listen(4000, "127.0.0.1", () => console.log("Ondsinnet side:  http://127.0.0.1:4000"));
