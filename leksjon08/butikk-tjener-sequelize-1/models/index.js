import { config } from "../config/config.js";
import Sequelize from "sequelize";
import { lagVareModell } from "./vare.models.js";
import { lagKategoriModell } from "./kategori.models.js";

// Denne variabelen skal ta vare på en Sequelize-modell
// av butikk-databasen (kun tabellene Vare og Kategori).
let db = {};

// Oppretter databasen og bygger Sequelize-modellen.
// Funksjonen kjøres én gang når serveren startes.
async function lagDatabaseModell() {
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
  db.sequelize = sequelize;

  // Oppretter modellklasser for hver databasetabell
  db.Kategori = lagKategoriModell(sequelize, Sequelize);
  db.Vare = lagVareModell(sequelize, Sequelize);

  // Definerer en-til-mange forhold mellom Kategori og Vare
  db.Kategori.hasMany(db.Vare, {
    foreignKey: "katNr",
  });
  db.Vare.belongsTo(db.Kategori);

  // Sletter databasen og oppretter deretter tabellene på nytt
  // basert på Sequelize-modellene. I ferdig løsning fjernes
  // parameter til sync (ønsker da neppe å slette databasen).
  await db.sequelize
    .sync({ force: true })
    .then(() => {
      console.log("Databasen er opprettet på nytt.");
    })
    .catch((err) => {
      console.log("Klarte ikke å synkronisere databasen: " + err.message);
    });

  // Setter inn litt testdata: én kategori og to varer.
  await db.Kategori.create({ katNr: 1, navn: "Keramikk" });
  await db.Vare.create({
    vNr: 100,
    betegnelse: "Skål",
    pris: 10.5,
    katNr: 1,
    antall: 123,
    hylle: "E21",
    slettet: false,
    bildefil: "skål.png",
  });
  await db.Vare.create({
    vNr: 101,
    betegnelse: "Kopp",
    pris: 23.0,
    katNr: 1,
    antall: 55,
    hylle: "E27",
    slettet: false,
    bildefil: "kopp.png",
  });
}

// Returnerer Sequelize-modellen av databasen.
function hentDatabaseModell() {
  return db;
}

export { lagDatabaseModell, hentDatabaseModell };
