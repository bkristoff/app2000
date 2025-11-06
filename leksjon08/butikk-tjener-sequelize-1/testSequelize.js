import { config } from "./config/config.js";
import Sequelize from "sequelize";
import { lagVareModell } from "./models/vare.models.js";
import { lagKategoriModell } from "./models/kategori.models.js";

// Test av Sequelize CRUD-operasjoner.

async function testSequelize() {
  // Konfigurering av Sequelize
  const sequelize = new Sequelize(
    config.db.database,
    config.db.user,
    config.db.password,
    {
      host: config.db.host,
      dialect: config.db.dialect,
      pool: config.db.pool,
      define: {
        freezeTableName: true,
      },
    }
  );
  let db = {};
  db.sequelize = sequelize;

  // Oppretter modellklasser for hver databasetabell
  db.Vare = lagVareModell(sequelize, Sequelize);
  db.Kategori = lagKategoriModell(sequelize, Sequelize);

  // Definerer en-til-mange forhold mellom Kategori og Vare
  db.Kategori.hasMany(db.Vare, {
    foreignKey: "katNr",
  });
  db.Vare.belongsTo(db.Kategori);

  // Sletter og oppretter databasen på nytt.
  // Databasen består kun av tabellene Vare og Kategori.
  await db.sequelize
    .sync({ force: true })
    .then(() => {
      console.log("Databasen er opprettet på nytt.");
    })
    .catch((err) => {
      console.log("Klarte ikke å synkronisere databasen: " + err.message);
    });

  // Oppretter en kategori og to varer.
  const k1 = await db.Kategori.create({ katNr: 1, navn: "Keramikk " });
  const v1 = await db.Vare.create({
    vNr: 100,
    betegnelse: "Skål",
    pris: 10.5,
    katNr: 1,
    antall: 123,
    hylle: "E21",
    slettet: false,
    bildefil: "skål.png",
  });

  // Skriver ut de tre objektene.
  // TODO Sett inn kode
  // Tips: toJSON-metoden kan brukes for å skrive ut objektene.

  // Oppdaterer en av varene.
  // TODO Sett inn kode
  // Tips: Bruk set-metoden.

  // Lagrer til databasen
  // TODO Sett inn kode
  // Tips: Bruk save-metoden.

  // Finner og viser alle varer.
  // TODO Sett inn kode
  // Tips: Bruk findAll-metoden og deretter JSON.stringify-metoden.

  // Finner, oppdaterer og viser en vare.
  // TODO Sett inn kode
  // Tips: Bruk findByPk-metoden for å finne en vare.

  // SLetter alle objektene - fra minnet og fra databasen.
  // TODO Sett inn kode
  // Tips: Bruk destroy-metoden.
}

testSequelize();
