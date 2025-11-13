// Enkel webtjener som leser fra MySQL-database.
// Start lokal databasetjener først.
// Sjekk at oppkoblingsparametre til lokal MySQL-database stemmer.
// Kilde: https://www.w3schools.com/nodejs/

// Installere
// npm install

// Start server:
// node ./demo_3.js

// Og åpne deretter nettleser på:
// localhost:8080

import { createServer } from "http";
import { createConnection } from "mysql2";

createServer((req, res) => {
  let con = createConnection({
    host: "localhost",
    user: "butikkapp",
    password: "hemmelig",
    database: "butikk",
  });

  con.connect((err) => {
    if (err) throw err;
    let sql = "SELECT * FROM Vare";
    con.query(sql, (err, result) => {
      if (err) throw err;
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(JSON.stringify(result));
      res.end();
    });
  });
}).listen(8080);
