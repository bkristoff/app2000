// Innstillingene leses fra miljøvariabler (process.env).
//
// Lokalt: Kopier .env.example til .env og fyll inn egne verdier. npm-skriptene
// leser .env automatisk (node --env-file-if-exists=.env). .env skal ikke inn i Git.
//
// På Heroku: Verdiene settes under Settings → Config Vars (se README på rotmappen).
// Heroku setter selv PORT og NODE_ENV=production. Add-on-en JawsDB MySQL setter JAWSDB_URL.

// Oppsettet under forutsetter (lokalt) at man har opprettet følgende bruker og database i MySQL:

// CREATE DATABASE butikk;
// CREATE USER 'butikkapp' IDENTIFIED BY 'hemmelig';
// GRANT ALL PRIVILEGES ON butikk.* TO 'butikkapp';
// GRANT SHOW DATABASES ON *.* TO 'butikkapp';
// GRANT SHOW VIEW ON *.* TO 'butikkapp';
// GRANT SELECT ON *.* TO 'butikkapp';
// FLUSH PRIVILEGES;

const env = process.env;

// En database-URL samler alt i én streng: mysql://bruker:passord@vert:port/database
// Det er formatet Heroku-add-ons bruker. Finnes en slik URL, brukes den.
// Ellers brukes de separate variablene DB_HOST, DB_USER osv.
const databaseUrl = env.JAWSDB_URL || env.DATABASE_URL;

export const config = {
  db: databaseUrl
    ? { uri: databaseUrl }
    : {
        host: env.DB_HOST || "localhost",
        port: Number(env.DB_PORT) || 3306,
        user: env.DB_USER || "butikkapp",
        password: env.DB_PASSWORD || "hemmelig",
        database: env.DB_NAME || "butikk",
      },
  port: env.PORT || 3030,

  // true når appen kjører på Heroku (eller en annen produksjonstjener).
  produksjon: env.NODE_ENV === "production",

  // Adressen til React-klienten (Vite) under utvikling. Brukes i CORS-oppsettet.
  klientUrl: env.CLIENT_URL || "http://localhost:5173",

  // Hemmeligheten som signerer sesjons-cookien. Skal ALDRI stå i koden i produksjon.
  sessionSecret: env.SESSION_SECRET,
};
