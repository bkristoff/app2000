// En minimal webtjener
// Kilde: https://www.w3schools.com/nodejs/

// Installere
// npm install

// Start server:
// node ./demo_1.js

// Åpne deretter nettleser på adresse:
// localhost:8080

// Forutsetter "type":"module" i package.json
import { createServer } from "http";

createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end("Hello World!");
}).listen(8080);
