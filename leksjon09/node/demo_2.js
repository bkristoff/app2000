// Enkel webtjener som leverer statiske HTML-filer.
// Kilde: https://www.w3schools.com/nodejs/

// Installere
// npm install

// Start server:
// node ./demo_1.js

// Åpne deretter nettleser på adresse:
// localhost:8080/side1.html
// localhost:8080/side2.html

import { createServer } from "http";
import url from "url";
import { readFile } from "fs";

createServer((req, res) => {
  var q = url.parse(req.url, true);
  var filename = "." + q.pathname;
  readFile(filename, function (err, data) {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/html" });
      return res.end("404 Not Found");
    }
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(data);
    return res.end();
  });
}).listen(8080);
