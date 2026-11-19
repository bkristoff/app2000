// Tester av REST API-et med Mocha og Supertest, MED database.
//
// Disse testene går hele veien: Express → Passport → MySQL og tilbake.
// De krever at databasen kjører og er satt opp som beskrevet i README
// (hobbyhuset.sql, SettDummyEPostOgPassord.sql og npm run forbered-db).
// Får vi ikke kontakt med databasen, hoppes testene over ("pending").
//
// Testene registrerer sin egen testkunde med en unik e-post, og sletter
// kunden og ordrene etterpå (after). Da er testene uavhengige av hvilke
// kunder som finnes, og databasen blir som før.
//
// Nytt her: request.agent(app). En "agent" husker cookies mellom
// forespørslene, akkurat som en nettleser. Da kan vi logge inn én gang
// og deretter kalle ruter som krever innlogging.

import assert from "node:assert/strict";
import request from "supertest";
import mysql from "mysql2/promise";
import { lagApp } from "../app.js";
import { config } from "../config/config.js";

// Hjelpefunksjon for å kjøre SQL direkte mot databasen fra testene,
// f.eks. for å sjekke hva som faktisk ble lagret, og for å rydde opp.
async function sql(setning, parametre = []) {
  const conn = await mysql.createConnection(config.db);
  try {
    const [rader] = await conn.execute(setning, parametre);
    return rader;
  } finally {
    await conn.end();
  }
}

describe("REST API med database", function () {
  let app;
  let harDatabase = false;

  // Testkunden. Date.now() gir en unik e-post hver gang testene kjøres.
  const testkunde = {
    fornavn: "Mocha",
    etternavn: "Testesen",
    epost: `mocha-${Date.now()}@eksempel.no`,
    passord: "hemmelig123",
    adresse: "Testveien 1",
    postnr: "3800",
  };

  // before kjøres én gang før alle testene i denne describe-blokken.
  before(async function () {
    try {
      await sql("SELECT 1");
      harDatabase = true;
    } catch (error) {
      console.log(`      (Hopper over: får ikke kontakt med databasen - ${error.code || error.message})`);
      this.skip(); // Markerer alle testene under som "pending" i stedet for feilet
    }
    app = lagApp();
  });

  // after kjøres én gang etter alle testene: sletter testkunden og ordrene.
  // (after kjøres også når testene er hoppet over, derfor sjekken av harDatabase.)
  after(async function () {
    if (!harDatabase) return;
    const [kunde] = await sql("SELECT KNr FROM Kunde WHERE EPost = ?", [testkunde.epost]);
    if (!kunde) return;
    await sql(
      "DELETE FROM Ordrelinje WHERE OrdreNr IN (SELECT OrdreNr FROM Ordre WHERE KNr = ?)",
      [kunde.KNr]
    );
    await sql("DELETE FROM Ordre WHERE KNr = ?", [kunde.KNr]);
    await sql("DELETE FROM Kunde WHERE KNr = ?", [kunde.KNr]);
  });

  describe("varer (åpne ruter)", function () {
    it("GET /varer gir en liste med varer på JSON-format", async function () {
      const res = await request(app).get("/varer");

      assert.equal(res.status, 200);
      assert.match(res.headers["content-type"], /application\/json/);
      assert.ok(Array.isArray(res.body), "svaret skal være en array");
      assert.ok(res.body.length > 0, "det skal finnes minst én vare");

      // Sjekker at hver vare har kolonnene klienten trenger
      const vare = res.body[0];
      for (const kolonne of ["VNr", "Betegnelse", "Pris"]) {
        assert.ok(kolonne in vare, `varen mangler kolonnen ${kolonne}`);
      }
    });

    it("GET /varer/:vnr gir akkurat én vare", async function () {
      const res = await request(app).get("/varer/10820");

      assert.equal(res.status, 200);
      assert.equal(res.body.length, 1);
      assert.equal(res.body[0].VNr, "10820");
    });

    it("GET /varer/paginert gir riktig antall varer", async function () {
      const res = await request(app).get("/varer/paginert?snr=0&ant=5");

      assert.equal(res.status, 200);
      assert.equal(res.body.length, 5);
    });
  });

  describe("registrering, innlogging og bestilling", function () {
    // Agenten deles av testene under, så rekkefølgen betyr noe:
    // registrering → innlogget → bestilling → utlogging.
    let agent;

    before(function () {
      agent = request.agent(app);
    });

    it("POST /registrering oppretter kunden og logger den inn (201)", async function () {
      const res = await agent.post("/registrering").send(testkunde);

      assert.equal(res.status, 201);
      assert.equal(res.body.epost, testkunde.epost);
      assert.equal(res.body.navn, "Mocha Testesen");
      assert.ok(!("passord" in res.body) && !("Passord" in res.body), "passordet skal aldri sendes til klienten");
    });

    it("lagrer passordet som en bcrypt-hash, ikke i klartekst", async function () {
      const [kunde] = await sql("SELECT Passord FROM Kunde WHERE EPost = ?", [testkunde.epost]);

      assert.notEqual(kunde.Passord, testkunde.passord);
      assert.match(kunde.Passord, /^\$2[aby]\$10\$/); // bcrypt-hash med 10 runder
    });

    it("POST /registrering med samme e-post en gang til gir 409", async function () {
      const res = await request(app).post("/registrering").send(testkunde);

      assert.equal(res.status, 409);
    });

    it("POST /innlogging med feil passord gir 401", async function () {
      const res = await request(app)
        .post("/innlogging")
        .send({ epost: testkunde.epost, passord: "feil-passord" });

      assert.equal(res.status, 401);
      assert.equal(res.body.melding, "Feil e-post eller passord.");
    });

    it("POST /innlogging med riktig passord gir 200 og en HttpOnly sesjons-cookie", async function () {
      const res = await agent
        .post("/innlogging")
        .send({ epost: testkunde.epost, passord: testkunde.passord });

      assert.equal(res.status, 200);
      const cookie = res.headers["set-cookie"]?.[0] ?? "";
      assert.match(cookie, /^butikk\.sid=/);
      assert.match(cookie, /HttpOnly/);
    });

    it("GET /bruker vet hvem som er innlogget (cookien sendes med)", async function () {
      const res = await agent.get("/bruker");

      assert.equal(res.status, 200);
      assert.equal(res.body.epost, testkunde.epost);
    });

    it("GET /kunder/:epost gir egne opplysninger, uten passord", async function () {
      const res = await agent.get(`/kunder/${testkunde.epost}`);

      assert.equal(res.status, 200);
      assert.equal(res.body[0].EPost, testkunde.epost);
      assert.ok(!("Passord" in res.body[0]));
    });

    it("GET /kunder/:epost for en annen kunde gir 403", async function () {
      const res = await agent.get("/kunder/paaa@abc.no");

      assert.equal(res.status, 403);
    });

    it("POST /ordrer lagrer ordren med prisen fra databasen, ikke fra klienten", async function () {
      // En "kreativ" kunde prøver å sette prisen til 0 kr
      const res = await agent
        .post("/ordrer")
        .send({ kurv: [{ vnr: "10820", antall: 2, pris: 0 }] });

      assert.equal(res.status, 201);
      assert.ok(Number.isInteger(res.body.ordrenr));

      // Sjekker direkte i databasen hva som ble lagret
      const [linje] = await sql(
        "SELECT PrisPrEnhet, Antall FROM Ordrelinje WHERE OrdreNr = ?",
        [res.body.ordrenr]
      );
      const [vare] = await sql("SELECT Pris FROM Vare WHERE VNr = ?", ["10820"]);
      assert.equal(linje.Antall, 2);
      assert.equal(linje.PrisPrEnhet, vare.Pris);
      assert.notEqual(Number(linje.PrisPrEnhet), 0);
    });

    it("POST /ordrer med tom handlekurv gir 400", async function () {
      const res = await agent.post("/ordrer").send({ kurv: [] });

      assert.equal(res.status, 400);
      assert.equal(res.body.melding, "Handlekurven er tom.");
    });

    it("POST /ordrer med en vare som ikke finnes gir 400", async function () {
      const res = await agent.post("/ordrer").send({ kurv: [{ vnr: "00000", antall: 1 }] });

      assert.equal(res.status, 400);
      assert.equal(res.body.melding, "Ukjent vare 00000.");
    });

    it("POST /utlogging avslutter sesjonen, og /bruker gir 401 igjen", async function () {
      const ut = await agent.post("/utlogging");
      assert.equal(ut.status, 200);

      const res = await agent.get("/bruker");
      assert.equal(res.status, 401);
    });
  });
});
