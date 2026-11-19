// Engangsskript som gjør Kunde-tabellen klar for innlogging med Passport.
// Kjør med: npm run forbered-db
//
// 1. Tar sikkerhetskopi av Kunde-tabellen til Kunde_backup (bare første gang).
// 2. Gjør EPost unik. Hjelpeskriptet SettDummyEPostOgPassord.sql lager nemlig
//    duplikater (f.eks. to kunder som begge får "asho@xyz.com"). Når e-post er
//    brukernavnet, MÅ den være unik – ellers vet vi ikke hvem som logger inn.
//    Duplikatene får kundenummeret lagt inn i e-postadressen: asho5123@xyz.com.
//    Til slutt legger vi på en UNIQUE-indeks, slik at databasen selv hindrer nye duplikater.
// 3. Hasher alle passord som fortsatt ligger i klartekst, med bcrypt.
//    Passord som allerede er hashet (starter med "$2"), blir ikke rørt.
//
// Skriptet kan trygt kjøres flere ganger.
// Angre alt: DELETE FROM Kunde; INSERT INTO Kunde SELECT * FROM Kunde_backup;
// (fjern i så fall også indeksen: ALTER TABLE Kunde DROP INDEX KundeEPostUnik;)

import mysql from "mysql2/promise";
import bcrypt from "bcrypt";
import { config } from "./config/config.js";

const SALT_RUNDER = 10;

const conn = await mysql.createConnection(config.db);

try {
  // 1. Sikkerhetskopi
  const [backup] = await conn.query(
    "CREATE TABLE IF NOT EXISTS Kunde_backup AS SELECT * FROM Kunde"
  );
  console.log(
    backup.warningStatus > 0
      ? "1. Kunde_backup finnes fra før, lar den være i fred."
      : "1. Tok sikkerhetskopi av Kunde til Kunde_backup."
  );

  // 2. Unik e-post
  const [duplikater] = await conn.query(`
    UPDATE Kunde k
    JOIN (SELECT EPost FROM Kunde GROUP BY EPost HAVING COUNT(*) > 1) d
      ON k.EPost = d.EPost
    SET k.EPost = CONCAT(SUBSTRING_INDEX(k.EPost, '@', 1), k.KNr, '@',
                         SUBSTRING_INDEX(k.EPost, '@', -1))`);
  console.log(`2. Endret ${duplikater.affectedRows} dupliserte e-postadresser.`);

  const [indeks] = await conn.query(
    "SHOW INDEX FROM Kunde WHERE Key_name = 'KundeEPostUnik'"
  );
  if (indeks.length === 0) {
    await conn.query("ALTER TABLE Kunde ADD CONSTRAINT KundeEPostUnik UNIQUE (EPost)");
    console.log("   La til UNIQUE-indeks på Kunde.EPost.");
  }

  // 3. Hashing av passord
  const [klartekst] = await conn.query(
    "SELECT KNr, Passord FROM Kunde WHERE Passord NOT LIKE '$2%'"
  );
  console.log(`3. Hasher ${klartekst.length} passord (tar litt tid) ...`);

  // bcrypt.hash er asynkron og kan kjøre flere hashinger samtidig,
  // så vi tar 8 og 8 kunder om gangen.
  for (let i = 0; i < klartekst.length; i += 8) {
    const bolk = klartekst.slice(i, i + 8);
    const hasher = await Promise.all(
      bolk.map((k) => bcrypt.hash(k.Passord, SALT_RUNDER))
    );
    for (let j = 0; j < bolk.length; j++) {
      await conn.execute("UPDATE Kunde SET Passord = ? WHERE KNr = ?", [
        hasher[j],
        bolk[j].KNr,
      ]);
    }
  }

  // Skriver ut noen brukere vi kan teste innlogging med. Passordet i klartekst
  // finnes bare i sikkerhetskopien – i Kunde ligger nå kun hashen.
  const [eksempler] = await conn.query(`
    SELECT k.EPost, b.Passord AS PassordKlartekst, k.Passord AS PassordHash
    FROM Kunde k JOIN Kunde_backup b ON k.KNr = b.KNr
    ORDER BY k.KNr LIMIT 3`);
  console.log("\nFerdig! Test innlogging med f.eks.:");
  console.table(eksempler);
} finally {
  await conn.end();
}
