import dotenv from "dotenv";

// Oppsettet under forutsetter at man har opprettet bruker og database i MySQL.
// Oppkoblingsparemetre (navn på database, brukernavn, passord) er lagret i .env-filen.
// Denne filen bør ikke tas med i Git-repo (legg den inn i .gitignore).
// Man kan teste lokalt med .env-fil. For deployment til Heroku, se README-fil.

dotenv.config();
const env = process.env;
console.log("DATABASE:", env.DB_HOST);

export const config = {
  db: {
    host: env.DB_HOST,
    user: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  },
  port: env.PORT,
  clientUrl: env.CLIENT_URL,
  sessionSecret: env.SESSION_SECRET,
};
