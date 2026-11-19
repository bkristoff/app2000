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

// Henter kunden med gitt e-post, MED passord-hash. Brukes kun av Passport
// ved innlogging (services/passport.js) – skal aldri sendes til klienten.
// EPost er unik (se forbered-passport-db.js), så vi får 0 eller 1 rader.
async function hentKundeForInnlogging(epost) {
  let sql =
    "SELECT KNr, Fornavn, Etternavn, EPost, Passord FROM Kunde WHERE EPost = ?";
  return doQuery(sql, [epost]);
}

// Henter kunden med gitt kundenummer, UTEN passord.
async function hentKundeFraKNr(knr) {
  let sql =
    "SELECT KNr, Fornavn, Etternavn, EPost, Adresse, PostNr FROM Kunde WHERE KNr = ?";
  return doQuery(sql, [knr]);
}

// Setter inn en ny kunde. Passordet må være hashet på forhånd (se /registrering).
// KNr er ikke autonummerert i Hobbyhuset-databasen, så vi bruker høyeste KNr + 1.
// Finnes e-posten fra før, feiler spørringen med ER_DUP_ENTRY (UNIQUE-indeksen på EPost).
async function settInnKunde(fornavn, etternavn, epost, passordHash, adresse, postnr) {
  let sql = `INSERT INTO Kunde (KNr, Fornavn, Etternavn, EPost, Passord, Adresse, PostNr)
             SELECT COALESCE(MAX(KNr), 0) + 1, ?, ?, ?, ?, ?, ? FROM Kunde`;
  return doQuery(sql, [fornavn, etternavn, epost, passordHash, adresse, postnr]);
}

// Lager en feil med HTTP-statuskode, slik at ruten kan svare med riktig kode.
function lagFeil(status, melding) {
  let error = new Error(melding);
  error.status = status;
  return error;
}

// Setter inn en ny ordre fra en gitt handlekurv for kunden med gitt kundenummer.
// Kundenummeret kommer fra den innloggede brukeren (req.user.knr), ikke fra klienten.
// Merk at vi her må utføre flere spørringer og at vi derfor ikke kan bruke
// hjelpefunksjonen doQuery. Vi åpner og lukker forbindelsen manuelt.
async function settInnOrdre(knr, kurv) {
  // Debugging - sjekk hva vi har fått fra klienten
  console.log("settInnordre - KNr: " + knr + ", kurv: " + JSON.stringify(kurv));

  // SQL-spørringer som skal utføres.
  let sqlInsertOrdre =
    "INSERT INTO Ordre(OrdreDato, KNr) VALUES (CURRENT_DATE(), ?)";
  let sqlHentSisteId = "SELECT LAST_INSERT_ID() AS Id";
  let sqlHentPris = "SELECT Pris FROM Vare WHERE VNr = ?";
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
      let antall = linje.antall;

      // Klienten kan sende hva som helst, så vi sjekker antall og henter
      // prisen fra databasen. linje.pris fra klienten blir IKKE brukt –
      // ellers kunne en "kreativ" kunde satt sin egen pris (f.eks. 0 kr).
      if (!Number.isInteger(antall) || antall < 1) {
        throw lagFeil(400, `Ugyldig antall for vare ${vnr}.`);
      }
      let [vareRader] = await conn.execute(sqlHentPris, [vnr]);
      if (vareRader.length === 0) {
        throw lagFeil(400, `Ukjent vare ${vnr}.`);
      }
      let pris = vareRader[0].Pris;

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
  hentKundeForInnlogging,
  hentKundeFraKNr,
  settInnKunde,
  settInnOrdre,
};
