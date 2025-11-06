import { hentDatabaseModell } from "../models/index.js";

// Hjelpefunksjoner for å levere utdata
function writeData(res) {
  return (result) => {
    res.status(200);
    res.set("Content-Type", "text/json");
    res.send(JSON.stringify(result));
    res.end();
  };
}

function writeError(res) {
  return (error) => {
    res.status(500);
    res.set("Content-Type", "text/json");
    res.send(JSON.stringify({ "SQL Error Messsage": error.sqlMessage }));
    res.end();
  };
}

// Definerer rutene (routes) i REST-API'et.
const routes = (app) => {
  // Henter Sequelize-modellen av databasen.
  let db = hentDatabaseModell();

  // Leverer alle varer på JSON-format
  app.get("/varer", async (req, res) => {
    // TODO Sett inn kode
  });

  // Leverer én vare på JSON-format.
  // Merk bruk av :vnr, matcher alle varenumre.
  app.get("/varer/:vnr", async (req, res) => {
    // TODO Sett inn kode
  });

  // Setter inn én vare.
  app.post("/varer", async (req, res) => {
    // TODO Sett inn kode
  });

  // Oppdaterer vare med gitt VNr.
  app.put("/varer/:vnr", async (req, res) => {
    // TODO Sett inn kode
  });

  // Slett vare med gitt VNr.
  app.delete("/varer", async (req, res) => {
    // TODO Sett inn kode
  });

  // Fanger alle andre request'er og leverer en feilmelding.
  app.get("*", async (req, res) => {
    res.status(404);
    res.set("Content-Type", "text/plain");
    res.send("Ukjent URL");
    res.end();
  });
};

export { routes };
