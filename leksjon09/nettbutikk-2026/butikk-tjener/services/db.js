import { config } from "../config/config.js";
import mysql from "mysql2/promise";

/*  Hjelpefunksjoner som kommuniserer med MySQL-databasen.
 *
 *  Basert på mysql2 sin "promise wrapper" med bruk av async/await
 *  Metodene returnerer et såkalt Promise-objekt (se routes/index.js).
 *
 */

// Åpner forbindelse, utfører SQL-spørring og lukker forbindelsen igjen.
// TODO: Det er mer effektivt å gjenbruke databaseforbindelser til flere
// spørringer (connection pooling). se https://www.npmjs.com/package/mysql2
async function doQuery(sql, params) {
  let conn = await mysql.createConnection(config.db);
  let result = await conn.execute(sql, params);
  await conn.end();
  return result;
}

// Henter alle varer
async function hentVarer() {
  let sql = "SELECT * FROM Vare";
  return doQuery(sql, []);
}

// Henter varer på en "side". Med spørreparametre snr=3 og ant=10
// får vi side 3, altså vare 31 -40 i forhold til sortering på VNr.
async function hentVarerPaginert(snr, ant) {
  let start = snr * ant;
  let sql = "SELECT * FROM Vare ORDER BY VNr LIMIT ?,?";

  // Bruk av toString under burde egentlig ikke være nødvendig;
  // en "work-around" av feilmelding som dukket opp ellers.
  // https://github.com/sidorares/node-mysql2/issues/1239

  return doQuery(sql, [start.toString(), ant.toString()]);
}

// Henter én vare basert på VNr.
async function hentVare(VNr) {
  let sql = "SELECT * FROM Vare WHERE VNr = ?";
  return doQuery(sql, [VNr]);
}

// Setter inn en ny vare.
async function settInnVare(
  VNr,
  Betegnelse,
  Pris,
  KatNr,
  Antall,
  Hylle,
  Slettet,
  Bildefil
) {
  let sql = "INSERT INTO Vare VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
  return doQuery(sql, [
    VNr,
    Betegnelse,
    Pris,
    KatNr,
    Antall,
    Hylle,
    Slettet,
    Bildefil,
  ]);
}

// Oppdaterer en vare med gitt VNr.
async function oppdaterVare(
  VNr,
  Betegnelse,
  Pris,
  KatNr,
  Antall,
  Hylle,
  Slettet,
  Bildefil
) {
  let sql =
    "UPDATE Vare SET Betegnelse=?, Pris=?, KatNr=?, Antall=?, Hylle=?, Slettet=?, Bildefil=? WHERE VNr=?";

  // Merk rekkefølgen av parametre: VNr skal inn for siste plassholder!
  return doQuery(sql, [
    Betegnelse,
    Pris,
    KatNr,
    Antall,
    Hylle,
    Slettet,
    Bildefil,
    VNr,
  ]);
}

// Sletter vare med gitt VNr.
async function slettVare(VNr) {
  let sql = "DELETE FROM Vare WHERE VNr = ?";
  return doQuery(sql, [VNr]);
}

// Henter alle kunder med gitt brukernavn, dvs. epost.
// Ettersom Epost er unik, så får vi enten 0 eller 1 rader i retur.
async function hentKunde(brukernavn) {
  let sql = "SELECT * FROM Kunde WHERE Epost = ?";
  return doQuery(sql, [brukernavn]);
}

// Sjekker innlogging: henter kunden med gitt brukernavn (epost) og passord.
// Vi får enten 0 eller 1 rader i retur. Merk at vi IKKE henter ut passordet,
// slik at det aldri blir sendt tilbake til klienten.
// NB! Passord lagret i klartekst er kun for demo. Seinere skal vi se på
// hashing av passord og autentisering med Passport.
async function sjekkInnlogging(brukernavn, passord) {
  let sql =
    "SELECT KNr, Fornavn, Etternavn, EPost FROM Kunde WHERE EPost = ? AND Passord = ?";
  return doQuery(sql, [brukernavn, passord]);
}

// Lager en feil med HTTP-statuskode, slik at ruten kan svare med riktig kode.
function lagFeil(status, melding) {
  let error = new Error(melding);
  error.status = status;
  return error;
}

// Setter inn en ny ordre fra en gitt handlekurv.
// Merk at vi her må utføre flere spørringer og at vi derfor ikke kan bruke
// hjelpefunksjonen doQuery. Vi åpner og lukker forbindelsen manuelt.
async function settInnOrdre(brukernavn, kurv) {
  // Debugging - sjekk hva vi har fått fra klienten
  console.log(
    "settInnordre - Brukernavn: " +
      brukernavn +
      ", kurv: " +
      JSON.stringify(kurv)
  );

  // SQL-spørringer som skal utføres.
  let sqlHentKunde = "SELECT KNr FROM Kunde WHERE EPost = ?";
  let sqlInsertOrdre =
    "INSERT INTO Ordre(OrdreDato, KNr) VALUES (CURRENT_DATE(), ?)";
  let sqlHentSisteId = "SELECT LAST_INSERT_ID() AS Id";
  let sqlInsertOrdrelinje =
    "INSERT INTO Ordrelinje(OrdreNr, VNr, PrisPrEnhet, Antall) VALUES (?, ?, ?, ?)";

  // Enkel validering før vi går til databasen.
  if (!Array.isArray(kurv) || kurv.length === 0) {
    throw lagFeil(400, "Handlekurven er tom.");
  }

  // Åpner forbindelse til databasen.
  let conn = await mysql.createConnection(config.db);
  let ordrenr;

  try {
    // Start en transaksjon
    await conn.beginTransaction();

    // Henter kundenummeret til kunden med gitt brukernavn.
    let [rows, meta] = await conn.execute(sqlHentKunde, [brukernavn]);
    if (rows.length === 0) {
      throw lagFeil(404, `Fant ingen kunde med brukernavn ${brukernavn}.`);
    }
    let knr = rows[0].KNr;

    // Debugging - sjekk hva vi har fått fra databasen
    console.log("Kundenummer: " + knr);

    // Setter inn en ny ordre og henter ordrenummeret.
    let result1 = await conn.execute(sqlInsertOrdre, [knr]);

    console.log("Kvittering 1: " + JSON.stringify(result1, null, 2));

    let [rows2, meta2] = await conn.execute(sqlHentSisteId, []);
    ordrenr = rows2[0].Id;

    // Debugging - sjekk hva vi har fått fra databasen
    console.log("Ordrenummer: " + ordrenr);

    // Setter inn ordrelinjer for alle varene i handlekurven.
    for (let linje of kurv) {
      let vnr = linje.vnr;
      let pris = linje.pris;
      let antall = linje.antall;
      console.log(
        "Ordrenr: " +
          ordrenr +
          ", VNr: " +
          vnr +
          ", Pris: " +
          pris +
          ", Antall: " +
          antall
      );
      let result2 = await conn.execute(sqlInsertOrdrelinje, [
        ordrenr,
        vnr,
        pris,
        antall,
      ]);

      // Debugging - sjekk hva vi har fått fra databasen
      console.log("Kvittering 2: " + JSON.stringify(result2, null, 2));
    }

    // Commit transaksjonen
    await conn.commit();
    console.log("Transaksjon committet");
  } catch (error) {
    // Rollback ved feil
    await conn.rollback();
    console.error("Feil ved innsetting av ordre:", error);
    throw error;
  } finally {
    // Lukker forbindelsen til databasen.
    await conn.end();
  }

  return { melding: "1 ordre satt inn.", ordrenr: ordrenr };
}

export {
  hentVarer,
  hentVare,
  hentVarerPaginert,
  settInnVare,
  oppdaterVare,
  slettVare,
  hentKunde,
  sjekkInnlogging,
  settInnOrdre,
};
