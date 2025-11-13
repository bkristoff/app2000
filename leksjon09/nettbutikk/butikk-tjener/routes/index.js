import {
  hentVarer,
  hentVare,
  hentVarerPaginert,
  settInnVare,
  oppdaterVare,
  slettVare,
  hentKunde,
  settInnOrdre,
} from "../services/db.js";

// Definerer rutene (routes) i REST-API'et.

// TODO Koden bør refaktoriseres - mye gjentakelser!

const routes = (app) => {
  // Leverer hele Vare-tabellen i Hobbyhuset på JSON-format
  app.get("/varer", async (req, res) => {
    try {
      const [rows, fields] = await hentVarer();
      res.status(200);
      res.set("Content-Type", "application/json");
      res.send(JSON.stringify(rows));
    } catch (error) {
      res.status(500);
      res.set("Content-Type", "application/json");
      res.send(
        JSON.stringify({
          "SQL Error Message": error.sqlMessage || error.message,
        })
      );
    }
  });

  // Leverer Vare-tabellen "paginert" på JSON-format
  app.get("/varer/paginert", async (req, res) => {
    try {
      let snr = Number(req.query.snr);
      let ant = Number(req.query.ant);
      const [rows, fields] = await hentVarerPaginert(snr, ant);
      res.status(200);
      res.set("Content-Type", "application/json");
      res.send(JSON.stringify(rows));
    } catch (error) {
      res.status(500);
      res.set("Content-Type", "application/json");
      res.send(
        JSON.stringify({
          "SQL Error Message": error.sqlMessage || error.message,
        })
      );
    }
  });

  // Leverer én rad fra Vare-tabellen i Hobbyhuset på JSON-format.
  app.get("/varer/:vnr", async (req, res) => {
    try {
      let VNr = req.params["vnr"];
      const [rows, fields] = await hentVare(VNr);
      res.status(200);
      res.set("Content-Type", "application/json");
      res.send(JSON.stringify(rows));
    } catch (error) {
      res.status(500);
      res.set("Content-Type", "application/json");
      res.send(
        JSON.stringify({
          "SQL Error Message": error.sqlMessage || error.message,
        })
      );
    }
  });

  // Setter inn én rad i Vare-tabellen.
  app.post("/varer", async (req, res) => {
    try {
      let { VNr, Betegnelse, Pris, KatNr, Antall, Hylle, Slettet, Bildefil } =
        req.body;
      const result = await settInnVare(
        VNr,
        Betegnelse,
        Pris,
        KatNr,
        Antall,
        Hylle,
        Slettet,
        Bildefil
      );
      res.status(200);
      res.set("Content-Type", "application/json");
      res.send(JSON.stringify(result));
    } catch (error) {
      res.status(500);
      res.set("Content-Type", "application/json");
      res.send(
        JSON.stringify({
          "SQL Error Message": error.sqlMessage || error.message,
        })
      );
    }
  });

  // Oppdaterer rad i Vare-tabellen med gitt VNr.
  app.put("/varer", async (req, res) => {
    try {
      let { VNr, Betegnelse, Pris, KatNr, Antall, Hylle, Slettet, Bildefil } =
        req.body;
      const result = await oppdaterVare(
        VNr,
        Betegnelse,
        Pris,
        KatNr,
        Antall,
        Hylle,
        Slettet,
        Bildefil
      );
      res.status(200);
      res.set("Content-Type", "application/json");
      res.send(JSON.stringify(result));
    } catch (error) {
      res.status(500);
      res.set("Content-Type", "application/json");
      res.send(
        JSON.stringify({
          "SQL Error Message": error.sqlMessage || error.message,
        })
      );
    }
  });

  // Slett rad i Vare-tabellen med gitt VNr.
  app.delete("/varer", async (req, res) => {
    try {
      let VNr = req.body.VNr;
      const result = await slettVare(VNr);
      res.status(200);
      res.set("Content-Type", "application/json");
      res.send(JSON.stringify(result));
    } catch (error) {
      res.status(500);
      res.set("Content-Type", "application/json");
      res.send(
        JSON.stringify({
          "SQL Error Message": error.sqlMessage || error.message,
        })
      );
    }
  });

  // Leverer én rad fra Kunde-tabellen i Hobbyhuset på JSON-format.
  app.get("/kunder/:brukernavn", async (req, res) => {
    try {
      let brukernavn = req.params["brukernavn"];
      const [rows, fields] = await hentKunde(brukernavn);
      res.status(200);
      res.set("Content-Type", "application/json");
      res.send(JSON.stringify(rows));
    } catch (error) {
      res.status(500);
      res.set("Content-Type", "application/json");
      res.send(
        JSON.stringify({
          "SQL Error Message": error.sqlMessage || error.message,
        })
      );
    }
  });

  // Setter inn en ny ordre fra en gitt handlekurv.
  app.post("/ordrer", async (req, res) => {
    try {
      let { brukernavn, kurv } = req.body;
      const result = await settInnOrdre(brukernavn, kurv);
      // Debugging - sjekk hva vi har fått fra klienten
      // console.log(brukernavn);
      // console.log(JSON.stringify(kurv, null, 2));
      // Og hva vi sender til klienten
      // console.log(JSON.stringify(response, null, 2));
      res.status(200);
      res.set("Content-Type", "application/json");
      res.send(JSON.stringify(result));
    } catch (error) {
      res.status(500);
      res.set("Content-Type", "application/json");
      res.send(
        JSON.stringify({
          "SQL Error Message": error.sqlMessage || error.message,
        })
      );
    }
  });

  // Fanger alle andre request'er og leverer en feilmelding.
  app.use(async (req, res) => {
    res.status(404);
    res.set("Content-Type", "text/plain");
    res.send("Ukjent URL");
  });
};

export { routes };
