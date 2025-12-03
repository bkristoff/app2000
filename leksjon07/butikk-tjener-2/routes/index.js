import {
  hentVarer,
  hentVare,
  settInnVare,
  oppdaterVare,
  slettVare,
} from "../services/db.js";

const routes = (app) => {
  app.get("/varer", (req, res) => {
    let varer = hentVarer();
    res.status(200);
    res.set("Content-Type", "text/json");
    res.send(JSON.stringify(varer));
    res.end();
  });

  app.get("/varer/:vnr", (req, res) => {
    let VNr = req.params["vnr"];
    let vare = hentVare(VNr);
    res.status(200);
    res.set("Content-Type", "text/json");
    res.send(JSON.stringify(vare));
    res.end();
  });

  app.post("/varer", (req, res) => {
    let { VNr, Betegnelse, Pris, KatNr, Antall, Hylle, Slettet, Bildefil } =
      req.body;
    settInnVare(VNr, Betegnelse, Pris, KatNr, Antall, Hylle, Slettet, Bildefil);
    res.status(200);
    res.set("Content-Type", "text/json");
    res.send(JSON.stringify(req.body)); // Sender bare request'en tilbake
    res.end();
  });

  app.put("/varer", (req, res) => {
    let { VNr, Betegnelse, Pris, KatNr, Antall, Hylle, Slettet, Bildefil } =
      req.body;
    oppdaterVare(
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
    res.set("Content-Type", "text/json");
    res.send(req.body); // Sender bare request'en tilbake
    res.end();
  });

  app.delete("/varer", (req, res) => {
    let VNr = req.body.VNr;
    slettVare(VNr);
    res.status(200);
    res.set("Content-Type", "text/json");
    res.send(req.body); // Sender bare request'en tilbake
    res.end();
  });

  app.use((req, res) => {
    res.status(404);
    res.set("Content-Type", "text/json");
    res.send('{"msg": "Ukjent URL"}');
    res.end();
  });
};

export { routes };
