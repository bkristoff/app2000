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
  db.Kategori = lagKategoriModell(sequelize, Sequelize);
  db.Vare = lagVareModell(sequelize, Sequelize);

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
  const k1 = await db.Kategori.create({ katNr: 1, navn: "Keramikk" });
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
  const v2 = await db.Vare.create({
    vNr: 101,
    betegnelse: "Kopp",
    pris: 23.0,
    katNr: 1,
    antall: 55,
    hylle: "E27",
    slettet: false,
    bildefil: "kopp.png",
  });

  // Skriver ut
  console.log(k1.toJSON());
  console.log(v1.toJSON());
  console.log(v2.toJSON());

  // Oppdaterer en av varene.
  v1.set({
    betegnelse: "Liten skål",
    pris: 8.0,
  });
  // Og lagrer til databasen
  await v1.save();

  // Finner og viser alle varer
  const alleVarer = await db.Vare.findAll();
  console.log(alleVarer.every((v) => v instanceof db.Vare)); // true for alle
  console.log("Alle varer:", JSON.stringify(alleVarer, null, 2));

  // Finner, endrer, lagrer og viser en vare
  const enVare = await db.Vare.findByPk(101);
  enVare.set({
    betegnelse: "Bitteliten skål",
    pris: 4.0,
  });
  await enVare.save();
  console.log("Vare 101:", JSON.stringify(enVare, null, 2));

  // SLetter alle objektene - fra minnet og fra databasen.
  await k1.destroy();
  await v1.destroy();
  await v2.destroy();

  // Finner og viser alle varer på nytt
  const alleVarer2 = await db.Vare.findAll();
  console.log("Alle varer:", JSON.stringify(alleVarer2, null, 2));
}

testSequelize();
