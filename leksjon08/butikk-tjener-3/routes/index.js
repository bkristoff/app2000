import {
  hentVarer,
  hentVare,
  hentVarerPaginert,
  settInnVare,
  oppdaterVare,
  slettVare,
} from "../services/db.js";

// Definerer rutene (routes) i REST-API'et.

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
        }),
      );
    }
  });

  // Leverer én side med varer fra Vare-tabellen på JSON-format.
  // Eksempel: /varer/paginert?snr=3&ant=10
  // Må stå før /varer/:vnr, ellers tolkes "paginert" som et varenummer.
  app.get("/varer/paginert", async (req, res) => {
    try {
      const snr = parseInt(req.query["snr"]);
      const ant = parseInt(req.query["ant"]);
      if (isNaN(snr) || isNaN(ant) || snr < 0 || ant < 1) {
        res.status(400);
        res.set("Content-Type", "application/json");
        res.send(
          JSON.stringify({
            Feil: "URL-parametrene snr (>= 0) og ant (>= 1) må være heltall.",
          }),
        );
        return;
      }
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
        }),
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
        }),
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
        Bildefil,
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
        }),
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
        Bildefil,
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
        }),
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
        }),
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
