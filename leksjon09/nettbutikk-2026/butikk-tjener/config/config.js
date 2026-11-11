// Denne styrefilen bør ikke tas med i et Git-repo (inneholder brukernavn og passord til databasen).
// Legg til mappe config i .gitignore-filen.

// Oppsettet under forutsetter at man har opprettet følgende bruker og database i MySQL:

// CREATE DATABASE butikk;
// CREATE USER 'butikkapp' IDENTIFIED BY 'hemmelig';
// GRANT ALL PRIVILEGES ON butikk.* TO 'butikkapp';
// GRANT SHOW DATABASES ON *.* TO 'butikkapp';
// GRANT SHOW VIEW ON *.* TO 'butikkapp';
// GRANT SELECT ON *.* TO 'butikkapp';
// FLUSH PRIVILEGES;

const env = process.env;

export const config = {
  db: {
    host: env.DB_HOST || "localhost",
    user: env.DB_USER || "butikkapp",
    password: env.DB_PASSWORD || "hemmelig",
    database: env.DB_NAME || "butikk",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  },
  port: env.PORT || 3030,
};
