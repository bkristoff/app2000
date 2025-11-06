// Denne styrefilen bør ikke tas med i et Git-repo
// (inneholder brukernavn og passord til databasen).
// Legg til mappe config i .gitignore-filen.

const env = process.env;

export const config = {
  db: {
    host: env.DB_HOST || "localhost",
    user: env.DB_USER || "seqapp",
    password: env.DB_PASSWORD || "hemmelig",
    database: env.DB_NAME || "seqbutikk",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },
  port: env.PORT || 3030,
};
