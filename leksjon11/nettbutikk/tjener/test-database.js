import { config } from "./config/config.js";
import mysql from "mysql2/promise";

// De to neste testene sjekker at vi får kontakt med databasen.
// Sørg for at databasen er oppe og kjører før du kjører disse testene.

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
