// Denne styrefilen vil typisk inneholde konfigurasjonsdata som
// blant annet brukernavn og passord til databasen. Denne informasjonen
// bør ikke tas med i et Git-repo, så legg til mappe config i .gitignore-filen.

// NB! Bytt ut connection string (url) slik at det passer med din database.

const env = process.env;

export const config = {
  db: {
    url: "mongodb://localhost:27017/",
    name: "butikk",
  },
  port: env.PORT || 3030,
};
