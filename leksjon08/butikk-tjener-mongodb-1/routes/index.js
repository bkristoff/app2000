import {
  hentVarer,
  hentVare,
  settInnVare,
  oppdaterVare,
  slettVare,
} from "../services/db.js";

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
  // Leverer alle varer på JSON-format
  app.get("/varer", async (req, res) => {
    await hentVarer().then(writeData(res), writeError(res));
  });

  // Leverer én vare på JSON-format.
  // Merk bruk av :vnr, matcher alle varenumre.
  app.get("/varer/:vnr", async (req, res) => {
    let VNr = req.params["vnr"];
    await hentVare(VNr).then(writeData(res), writeError(res));
  });

  // Setter inn én vare.
  app.post("/varer", async (req, res) => {
    let { VNr, Betegnelse, Pris, KatNr, Antall, Hylle, Slettet, Bildefil } =
      req.body;

    // Debugging - sjekk hva vi har fått fra klienten
    // console.log(req.body);

    await settInnVare(
      VNr,
      Betegnelse,
      Pris,
      KatNr,
      Antall,
      Hylle,
      Slettet,
      Bildefil
    ).then(writeData(res), writeError(res));
  });

  // Oppdaterer vare med gitt VNr.
  // TODO Denne bør bruke sti /varer/:vnr
  // og vnr avleses da fra req.params (se tilsvarende get-route).
  app.put("/varer", async (req, res) => {
    let { VNr, Betegnelse, Pris, KatNr, Antall, Hylle, Slettet, Bildefil } =
      req.body;
    await oppdaterVare(
      VNr,
      Betegnelse,
      Pris,
      KatNr,
      Antall,
      Hylle,
      Slettet,
      Bildefil
    ).then(writeData(res), writeError(res));
  });

  // Slett vare med gitt VNr.
  // TODO Denne bør bruke sti /varer/:vnr
  // og vnr avleses da fra req.params (se tilsvarende get-route).
  // Så bør delete mot sti /varer slette alle varer.
  app.delete("/varer", async (req, res) => {
    let VNr = req.body.VNr;

    // Debugging - sjekk hva vi har fått fra klienten
    // console.log("VNr: " + VNr);

    await slettVare(VNr).then(writeData(res), writeError(res));
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
