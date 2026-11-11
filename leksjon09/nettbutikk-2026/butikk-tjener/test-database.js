import { config } from "./config/config.js";
import mysql from "mysql2/promise";

// Tester en dummy-spørring uavhengig av både database og Express.
// Bare for å forstå hva promise/async er.

/*
async function hentVarerDummy() {
  let promise = new Promise(function (resolve, reject) {
    resolve([
      {
        // Egentlig noen flere kolonner i Vare-tabellen.
        data: [
          { VNr: "10820", Betegnelse: "Hakke", Pris: "55.50" },
          { VNr: "10830", Betegnelse: "Spett", Pris: "53.00" },
        ],
      },
      // Denne delen vil inneholde metadata, navn på kolonner, osv.
      { meta: {} },
    ]);
  });
  return promise;
}

hentVarerDummy().then(
  function ([rows, fields]) {
    console.log(rows);
  },
  function (error) {
    console.log(error);
  }
);
*/

// De to neste testene sjekker at vi får kontakt med databasen.
// Sørg for at databasen er oppe og kjører før du kjører disse testene.

/*
// Henter alle varer
async function hentVarer() {
  let sql = "SELECT * FROM Vare";
  let conn = await mysql.createConnection(config.db);
  let result = await conn.execute(sql, []);
  await conn.end();
  return result;
}

// Henter én vare basert på VNr.
async function hentVare(VNr) {
  let sql = "SELECT * FROM Vare WHERE VNr = ?";
  let conn = await mysql.createConnection(config.db);
  let result = await conn.execute(sql, [VNr]);
  await conn.end();
  return result;
}

// Tester hentVarer
hentVarer().then(
  function ([rows, fields]) {
    console.log(rows);
  },
  function (error) {
    console.log(error);
  }
);

// Prøv å sette inn await foran kall på hentVarer og hentVare,
// og se hva som skjer med følgende utskrift (med og uten await).
console.log("********************");

// Tester hentVare
hentVare("64510").then(
  function ([rows, fields]) {
    console.log(rows);
  },
  function (error) {
    console.log(error);
  }
);

*/
