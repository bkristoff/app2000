// Hjelpefunksjon som sletter kundene (og ordrene deres) som ende-til-ende-testene
// har registrert. Testkundene kjennes igjen på e-posten: e2e-<tall>@eksempel.no
//
// Bruker samme databaseoppsett som tjeneren (butikk-tjener/config/config.js),
// og leser derfor butikk-tjener/.env hvis den finnes.

import { existsSync } from "node:fs";
import mysql from "mysql2/promise";

const ENV_FIL = new URL("../butikk-tjener/.env", import.meta.url);

export async function slettTestkunder() {
  if (existsSync(ENV_FIL)) {
    process.loadEnvFile(ENV_FIL);
  }
  // Importeres først nå, etter at miljøvariablene er lest inn.
  const { config } = await import("../butikk-tjener/config/config.js");

  const conn = await mysql.createConnection(config.db);
  try {
    const testkunder = "SELECT KNr FROM Kunde WHERE EPost LIKE 'e2e-%@eksempel.no'";
    await conn.query(
      `DELETE FROM Ordrelinje WHERE OrdreNr IN
         (SELECT OrdreNr FROM Ordre WHERE KNr IN (${testkunder}))`
    );
    await conn.query(`DELETE FROM Ordre WHERE KNr IN (${testkunder})`);
    await conn.query("DELETE FROM Kunde WHERE EPost LIKE 'e2e-%@eksempel.no'");
  } finally {
    await conn.end();
  }
}
