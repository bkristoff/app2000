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

export {
  hentVarer,
  hentVare,
  hentVarerPaginert,
  settInnVare,
  oppdaterVare,
  slettVare,
  hentKunde,
};
