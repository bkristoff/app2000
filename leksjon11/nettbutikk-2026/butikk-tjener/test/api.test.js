// Tester av REST API-et med Mocha og Supertest, UTEN database.
//
// Mocha: rammeverket som finner og kjører testene.
//   describe("...", ...) grupperer tester, it("...", ...) er én test.
// Supertest: sender HTTP-forespørsler rett til Express-appen, uten at vi
//   trenger å starte tjeneren med app.listen. request(app).get("/bruker")
//   tilsvarer en GET-forespørsel fra en nettleser eller REST Client.
// assert: Node.js sin innebygde modul for å sjekke at resultatet er som forventet.
//
// Alle testene i denne filen stopper FØR koden prøver å snakke med databasen
// (manglende innlogging, ugyldig input osv.). De kan derfor kjøres hvor som helst,
// også uten MySQL. Tester som trenger databasen, ligger i api-med-database.test.js.
//
// Kjør med: npm test

import assert from "node:assert/strict";
import request from "supertest";
import { lagApp } from "../app.js";

describe("REST API uten database", function () {
  let app;

  // beforeEach kjøres før hver test: hver test får en "fersk" app.
  beforeEach(function () {
    app = lagApp();
  });

  describe("ukjente adresser", function () {
    it("svarer 404 og 'Ukjent URL' på en adresse som ikke finnes", async function () {
      const res = await request(app).get("/finnes-ikke");

      assert.equal(res.status, 404);
      assert.equal(res.text, "Ukjent URL");
    });
  });

  describe("ruter som krever innlogging", function () {
    it("GET /bruker svarer 401 når ingen er innlogget", async function () {
      const res = await request(app).get("/bruker");

      assert.equal(res.status, 401);
      assert.equal(res.body.melding, "Ikke innlogget.");
    });

    it("POST /ordrer svarer 401 uten innlogging", async function () {
      const res = await request(app)
        .post("/ordrer")
        .send({ kurv: [{ vnr: "10820", antall: 1 }] }); // send() lager JSON-body

      assert.equal(res.status, 401);
      assert.equal(res.body.melding, "Du må være innlogget.");
    });

    it("GET /kunder/:epost svarer 401 uten innlogging", async function () {
      const res = await request(app).get("/kunder/paaa@abc.no");

      assert.equal(res.status, 401);
    });

    // Samme sjekk for alle rutene som endrer varelageret. En løkke gir én test per rute.
    for (const metode of ["post", "put", "delete"]) {
      it(`${metode.toUpperCase()} /varer svarer 401 uten innlogging`, async function () {
        const res = await request(app)[metode]("/varer").send({ VNr: "99999" });

        assert.equal(res.status, 401);
      });
    }
  });

  describe("POST /registrering validerer input", function () {
    // En gyldig kunde. Hver test endrer ett felt, så vi vet nøyaktig hva som testes.
    const gyldigKunde = {
      fornavn: "Test",
      etternavn: "Testesen",
      epost: "test@eksempel.no",
      passord: "hemmelig123",
      adresse: "Testveien 1",
      postnr: "3800",
    };

    it("svarer 400 når et felt mangler", async function () {
      const { fornavn, ...utenFornavn } = gyldigKunde;
      const res = await request(app).post("/registrering").send(utenFornavn);

      assert.equal(res.status, 400);
      assert.equal(res.body.melding, "Alle feltene må fylles ut.");
    });

    it("svarer 400 ved ugyldig e-postadresse", async function () {
      const res = await request(app)
        .post("/registrering")
        .send({ ...gyldigKunde, epost: "ikke-en-epost" });

      assert.equal(res.status, 400);
      assert.equal(res.body.melding, "Ugyldig e-postadresse.");
    });

    it("svarer 400 når passordet er kortere enn 8 tegn", async function () {
      const res = await request(app)
        .post("/registrering")
        .send({ ...gyldigKunde, passord: "kort" });

      assert.equal(res.status, 400);
      assert.equal(res.body.melding, "Passordet må ha minst 8 tegn.");
    });

    it("svarer 400 når postnummeret ikke er fire siffer", async function () {
      const res = await request(app)
        .post("/registrering")
        .send({ ...gyldigKunde, postnr: "38a0" });

      assert.equal(res.status, 400);
      assert.equal(res.body.melding, "Postnummer må være fire siffer.");
    });
  });

  describe("POST /innlogging", function () {
    it("svarer 401 når e-post og passord mangler", async function () {
      const res = await request(app).post("/innlogging").send({});

      assert.equal(res.status, 401);
      assert.equal(res.body.melding, "Mangler e-post eller passord.");
    });

    it("svarer 429 etter 10 mislykkede forsøk (rate limiting)", async function () {
      // De 10 første forsøkene er "lov" (men feiler med 401) ...
      for (let i = 1; i <= 10; i++) {
        const res = await request(app).post("/innlogging").send({});
        assert.equal(res.status, 401, `forsøk nr. ${i} skulle gitt 401`);
      }

      // ... mens det 11. blir stoppet før passordet i det hele tatt sjekkes.
      const res = await request(app).post("/innlogging").send({});
      assert.equal(res.status, 429);
      assert.match(res.body.melding, /For mange innloggingsforsøk/);
    });
  });
});
