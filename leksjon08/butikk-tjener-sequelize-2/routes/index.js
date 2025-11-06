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

// TODO Dette ser ut til å fungere?
// Men klønete programmert. Må jobbes videre med...
async function oppdaterVare(db, vNr, nyeVerdier, response) {
  let v = await db.Vare.findByPk(vNr);
  await v.set(nyeVerdier);
  await v.save();
  response.status(200);
  response.set("Content-Type", "text/json");
  response.send(JSON.stringify(v));
  response.end();
}

// TODO Dette ser ut til å fungere?
// Men klønete programmert. Må jobbes videre med...
async function slettVare(db, vNr, response) {
  let v = await db.Vare.findByPk(vNr);
  await v.destroy(vNr);
  response.status(200);
  response.set("Content-Type", "text/json");
  response.send(JSON.stringify(v));
  response.end();
}

// Definerer rutene (routes) i REST-API'et.
const routes = (app) => {
  // Henter Sequelize-modellen av databasen.
  let db = hentDatabaseModell();

  // Leverer alle varer på JSON-format
  app.get("/varer", async (req, res) => {
    await db.Vare.findAll().then(writeData(res), writeError(res));
  });

  // Leverer én vare på JSON-format.
  // Merk bruk av :vnr, matcher alle varenumre.
  app.get("/varer/:vnr", async (req, res) => {
    let vNr = req.params["vnr"];
    await db.Vare.findByPk(vNr).then(writeData(res), writeError(res));
  });

  // Setter inn én vare.
  app.post("/varer", async (req, res) => {
    // create = build + save
    await db.Vare.create(req.body).then(writeData(res), writeError(res));
  });

  // Oppdaterer vare med gitt VNr.
  app.put("/varer/:vnr", async (req, res) => {
    let vNr = req.params["vnr"];

    // TODO Fungerer, men se kommentar ved funksjonen.
    await oppdaterVare(db, vNr, req.body, res);
  });

  // Slett vare med gitt VNr.
  // TODO Denne bør bruke sti /varer/:vnr
  // og vnr avleses da fra req.params (se tilsvarende get-route).
  // Så bør delete mot sti /varer slette alle varer.
  app.delete("/varer", async (req, res) => {
    let vNr = req.body.vNr;

    // TODO Fungerer, men se kommentar ved funksjonen.
    await slettVare(db, vNr, res);
  });

  // Fanger alle andre request'er og leverer en feilmelding.
  app.use(async (req, res) => {
    res.status(404);
    res.set("Content-Type", "text/plain");
    res.send("Ukjent URL");
    res.end();
  });
};

export { routes };
