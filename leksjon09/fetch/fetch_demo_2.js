// Enkel CRUD-app mot REST API-et til nettbutikken med Fetch API.
// Inspirert av: https://betterprogramming.pub/build-a-crud-js-app-with-fetches-f82143a48b6d

// For at dette skal fungere må butikk-tjener kjøre (node server.js),
// og tjeneren må tillate kall fra andre "origins" (CORS). Det er allerede
// gjort i server.js med: app.use(cors({ origin: "*" }));

// URL til alle varer
const URL_VARER = "http://localhost:3030/varer/";

// URL til en bestemt vare, med varenummer fra HTML-skjemaet.
function urlAktivVare() {
  return URL_VARER + document.querySelector("#VNr").value;
}

// URL til et utvalg av varer med spørreparametre for paginering
function urlVarerSide(snr, ant) {
  return URL_VARER + "paginert?snr=" + snr + "&ant=" + ant;
}

// Sender en forespørsel og returnerer JSON-svaret.
// NB! fetch kaster bare unntak ved nettverksfeil (f.eks. at tjeneren ikke
// kjører). Ved feilkode som 404 eller 500 må vi selv sjekke res.ok.
async function sendForespørsel(url, method = "GET", data = null) {
  let valg = {
    method: method,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };
  if (data) {
    valg.body = JSON.stringify(data);
  }

  let res = await fetch(url, valg);
  if (!res.ok) {
    throw new Error(`HTTP-feil ${res.status}`);
  }
  return await res.json();
}

// JSON-representasjon av vare-info fra HTML-skjemaet,
// utvidet med standardverdier for noen av kolonnene.
function skjemadata() {
  let formData = new FormData(document.getElementById("form"));
  formData.append("Antall", 0);
  formData.append("Hylle", "");
  formData.append("Slettet", 0);
  formData.append("Bildefil", "");

  // Konverterer formData til et vanlig objekt
  return Object.fromEntries(formData);
}

// Fyller ut HTML-skjemaet med data om én vare.
function visVareISkjema(vare) {
  for (let felt of ["VNr", "Betegnelse", "Pris", "KatNr"]) {
    document.getElementById(felt).value = vare[felt];
  }
}

// Konverterer en JSON "databasetabell" til HTML-presentasjon.
function lagHTMLTabell(tab) {
  if (tab.length === 0) {
    return "<p>Ingen varer funnet.</p>";
  }

  let str = '<table class="table table-sm">';

  // Bruker nøklene i første rad som overskrifter
  str += "<tr>";
  for (let kol in tab[0]) {
    str += `<th>${kol}</th>`;
  }
  str += "</tr>";

  // Lager radene
  for (let rad of tab) {
    str += "<tr>";
    for (let attributt in rad) {
      str += `<td>${rad[attributt]}</td>`;
    }
    str += "</tr>";
  }

  str += "</table>";
  return str;
}

// Viser en samling av varer som HTML-tabell
function visVarer(varer) {
  document.querySelector("#datadiv").innerHTML = lagHTMLTabell(varer);
}

// Viser en melding til brukeren (i stedet for bare i konsollet).
function visMelding(tekst, erFeil = false) {
  let melding = document.querySelector("#melding");
  melding.textContent = tekst;
  melding.className = erFeil ? "alert alert-danger" : "alert alert-success";
}

// Henter alle varer
async function hentAlleVarer() {
  try {
    let varer = await sendForespørsel(URL_VARER);
    visVarer(varer);
    visMelding(`Hentet ${varer.length} varer.`);
  } catch (error) {
    visMelding(error.message, true);
  }
}

// Henter én vare og viser den i skjemaet.
// Tjeneren svarer med en tabell (array) med 0 eller 1 rad.
async function hent1Vare() {
  try {
    let varer = await sendForespørsel(urlAktivVare());
    if (varer.length === 0) {
      visMelding("Fant ingen vare med dette varenummeret.", true);
    } else {
      visVareISkjema(varer[0]);
      visMelding(`Hentet vare ${varer[0].VNr}.`);
    }
  } catch (error) {
    visMelding(error.message, true);
  }
}

// Henter en "side" med varer.
async function side3Varer() {
  try {
    visVarer(await sendForespørsel(urlVarerSide(3, 10)));
    visMelding("Hentet side 3.");
  } catch (error) {
    visMelding(error.message, true);
  }
}

// Setter inn ny vare basert på data fra HTML-skjema
async function nyVare() {
  try {
    let svar = await sendForespørsel(URL_VARER, "POST", skjemadata());
    visMelding(`Satt inn ${svar[0].affectedRows} vare.`);
  } catch (error) {
    visMelding(error.message, true);
  }
}

// Oppdaterer vare med gitt VNr basert på data fra HTML-skjema
async function oppdaterVare() {
  try {
    let svar = await sendForespørsel(URL_VARER, "PUT", skjemadata());
    visMelding(`Oppdatert ${svar[0].affectedRows} vare.`);
  } catch (error) {
    visMelding(error.message, true);
  }
}

// Sletter vare med gitt VNr
async function slettVare() {
  try {
    let VNr = document.querySelector("#VNr").value;
    let svar = await sendForespørsel(URL_VARER, "DELETE", { VNr: VNr });
    visMelding(`Slettet ${svar[0].affectedRows} vare.`);
  } catch (error) {
    visMelding(error.message, true);
  }
}

// Registrering av knappelyttere
document.getElementById("btnHent1").addEventListener("click", hent1Vare);
document.getElementById("btnHentAlle").addEventListener("click", hentAlleVarer);
document.getElementById("btnSide3").addEventListener("click", side3Varer);
document.getElementById("btnNy").addEventListener("click", nyVare);
document.getElementById("btnOppdater").addEventListener("click", oppdaterVare);
document.getElementById("btnSlett").addEventListener("click", slettVare);
