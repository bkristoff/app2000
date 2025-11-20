import express, { urlencoded, json } from 'express';
import pg from 'pg';
import dotenv from 'dotenv';
import cors from "cors";

dotenv.config();
console.log('DATABASE_URL:', process.env.DATABASE_URL); // Log DATABASE_URL

const app = express();
const port = process.env.PORT || 3030;

// Log forespørsler for å se opprinnelsen
app.use((req, res, next) => {
  console.log('Request Origin:', req.headers.origin);
  next();
});

const corsOptions = {
  origin: 'https://heroku-demo-klient-9f5655416674.herokuapp.com',
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
// app.use(cors({ origin: `https://heroku-demo-klient-9f5655416674.herokuapp.com/` }));
// app.use(cors());

app.use(urlencoded({ extended: true }));
app.use(json());

const { Client } = pg;

/*
// Oppkobling til lokal PostgreSQL-database
const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: false
});
*/

// Oppkobling til PostgreSQL-database på Heroku
const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

client.connect(err => {
  if (err) {
    console.error('Connection error', err.stack); // Log connection error
  } else {
    console.log('Connected to the database');
  }
});

let data = "";
client.query('SELECT * FROM public.demotab;', (err, res) => {
  if (err) throw err;
  for (const row of res.rows) {
    data += JSON.stringify(row);
    console.log(data);
  }
});

app.get('/', (req, res) => {
  res.send(data);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
