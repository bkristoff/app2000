import {
  hentVarer,
  hentVare,
  settInnVare,
  oppdaterVare,
  slettVare,
} from "../services/db.js";

const routes = (app) => {
  /**
   * @swagger
   * /varer:
   *   get:
   *     description: Returnerer alle varer i nettbutikken.
   *     tags:
   *      - Varer
   *     produces:
   *      - application/json
   *     responses:
   *       200:
   *         description: varer
   */
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
    settInnVare(req.body);
    res.status(200);
    res.set("Content-Type", "text/json");
    res.send(JSON.stringify(req.body)); // Sender bare request'en tilbake
    res.end();
  });

  app.put("/varer", (req, res) => {
    let { VNr, Betegnelse, Pris, KatNr, Antall, Hylle, Slettet, Bildefil } =
      req.body;
    oppdaterVare(req.body);
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
};

export { routes };
