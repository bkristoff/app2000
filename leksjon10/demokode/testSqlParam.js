// Mottiltak mot SQL injection: parametriserte spørringer (prepared statements).
// Fortsettelse av testSqlInjection.js.
//
// Del 1 kjører uten database. Del 2 kobler til nettbutikk-databasen (samme
// innstillinger som butikk-tjener, kan overstyres i .env) og hopper over seg selv
// hvis databasen ikke er tilgjengelig.
//
// Kjør med: npm run sql-param

import mysql from "mysql2/promise";

// Den samme farlige input-en som i testSqlInjection.js
const hackerEpost = "' OR 1=1; -- ";
const hackerPassord = "";

// SQL-koden har ? som plassholdere i stedet for verdier.
// Brukerens input blir ALDRI en del av selve SQL-koden.
const sql = "SELECT KNr, Fornavn, Etternavn FROM Kunde WHERE EPost = ? AND Passord = ?";

// ---------- Del 1: Hva skjer med input-en? ----------
// mysql.format() viser hvordan verdiene ville blitt escapet og satt inn.
// Legg merke til at ' i hackerens input blir til \' – den avslutter ikke lenger strengen.
console.log("Del 1: Escaping av hackerens input");
console.log(mysql.format(sql, [hackerEpost, hackerPassord]));
// SELECT ... WHERE EPost = '\' OR 1=1; -- ' AND Passord = ''
// => MySQL leter etter en kunde med e-postadressen  ' OR 1=1; --  og finner ingen.

// ---------- Del 2: Mot ekte database ----------
// Med conn.execute() sendes SQL-koden og verdiene HELT SEPARAT til MySQL-serveren
// (et ekte "prepared statement"). Da finnes det ingen streng å "bryte ut av".
const dbConfig = {
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "butikkapp",
  password: process.env.DB_PASSWORD || "hemmelig",
  database: process.env.DB_NAME || "butikk",
};

console.log("\nDel 2: Mot databasen", `${dbConfig.user}@${dbConfig.host}/${dbConfig.database}`);
let conn;
try {
  conn = await mysql.createConnection(dbConfig);
} catch (err) {
  console.log("Fikk ikke koblet til databasen (" + err.code + "). Hopper over del 2.");
  console.log("Start MySQL med nettbutikk-databasen, eller sett DB_* i .env.");
  process.exit(0);
}

try {
  // Vanlig innlogging. E-post/passord er tilfeldig generert i hver database
  // (SettDummyEPostOgPassord.sql), så vi henter en ekte kunde først.
  const [[kunde]] = await conn.query("SELECT EPost, Passord FROM Kunde LIMIT 1");
  let [rader] = await conn.execute(sql, [kunde.EPost, kunde.Passord]);
  console.log(`Vanlig innlogging (${kunde.EPost}), antall rader:`, rader.length);

  // Hackerens forsøk
  [rader] = await conn.execute(sql, [hackerEpost, hackerPassord]);
  console.log("Hackerens innlogging, antall rader:", rader.length, "(skal være 0)");

  // Til sammenligning: den FARLIGE måten, med strengkonkatenering
  const farligSql =
    "SELECT KNr, Fornavn, Etternavn FROM Kunde WHERE EPost = '" +
    hackerEpost + "' AND Passord = '" + hackerPassord + "'";
  [rader] = await conn.query(farligSql);
  console.log("Samme angrep MED strengkonkatenering, antall rader:", rader.length, "(!)");
} finally {
  await conn.end();
}

// Husk: plassholdere fungerer for VERDIER, ikke for tabell- eller kolonnenavn.
// Skal brukeren f.eks. velge sorteringskolonne, må du sjekke mot en liste med lovlige navn:
//   const lovlige = ["Fornavn", "Etternavn"];
//   if (!lovlige.includes(sortering)) sortering = "Etternavn";
