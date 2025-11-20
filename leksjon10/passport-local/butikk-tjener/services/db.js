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
async function hentKunde(epost) {
  let sql = "SELECT * FROM Kunde WHERE Epost = ?";
  return doQuery(sql, [epost]);
}

// Henter alle kunder med gitt knr.
// Ettersom KNr er unik, så får vi enten 0 eller 1 rader i retur.
async function hentKundeFraKNr(knr) {
  let sql = "SELECT * FROM Kunde WHERE KNr = ?";
  return doQuery(sql, [knr]);
}

// Setter inn en ny kunde.
async function settInnKunde(
  KNr,
  Fornavn,
  Etternavn,
  EPost,
  Passord,
  Adresse,
  PostNr
) {
  let sql = "INSERT INTO Kunde VALUES (?, ?, ?, ?, ?, ?, ?)";
  return doQuery(sql, [
    KNr,
    Fornavn,
    Etternavn,
    EPost,
    Passord,
    Adresse,
    PostNr,
  ]);
}

// Setter inn en ny ordre fra en gitt handlekurv.
// For enkel løsning som forutsetter at alt går bra, ingen feilsjekking.
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

  // Åpner forbindelse til databasen.
  let conn = await mysql.createConnection(config.db);

  try {
    // Start en transaksjon
    await conn.beginTransaction();

    // Henter kundenummeret til kunden med gitt brukernavn.
    let [rows, meta] = await conn.execute(sqlHentKunde, [brukernavn]);
    let knr = rows[0].KNr;

    // Debugging - sjekk hva vi har fått fra databasen
    console.log("Kundenummer: " + knr);

    // Setter inn en ny ordre og henter ordrenummeret.
    let result1 = await conn.execute(sqlInsertOrdre, [knr]);

    console.log("Kvittering 1: " + JSON.stringify(result1, null, 2));

    let [rows2, meta2] = await conn.execute(sqlHentSisteId, []);
    let ordrenr = rows2[0].Id;

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

  return { melding: "1 ordre satt inn." };
}

export {
  hentVarer,
  hentVare,
  hentVarerPaginert,
  settInnVare,
  oppdaterVare,
  slettVare,
  hentKunde,
  hentKundeFraKNr,
  settInnKunde,
  settInnOrdre,
};
