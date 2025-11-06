import { config } from "../config/config.js";
import { MongoClient } from "mongodb";

//  Hjelpefunksjoner som henter data fra MongoDB-databasen.

const client = new MongoClient(config.db.url);

// Henter alle varer
async function hentVarer() {
  let result = {};
  try {
    await client.connect();
    const db = client.db(config.db.name);
    const coll = db.collection("varer");
    result = await coll.find().toArray();
  } finally {
    await client.close();
  }
  return result;
}

// Henter én vare basert på VNr.
async function hentVare(vNr) {
  let result = {};
  try {
    await client.connect();
    const db = client.db(config.db.name);
    const coll = db.collection("varer");
    result = await coll.find({ VNr: vNr }).toArray();
  } finally {
    await client.close();
  }
  return result;
}

// Setter inn en ny vare.
async function settInnVare(
  vNr,
  betegnelse,
  pris,
  katNr,
  antall,
  hylle,
  slettet,
  bildefil
) {
  let result = {};
  let doc = {
    VNr: vNr,
    Betegnelse: betegnelse,
    Pris: pris,
    KatNr: katNr,
    Antall: antall,
    Hylle: hylle,
    Slettet: slettet,
    Bildefil: bildefil
  };
  try {
    await client.connect();
    const db = client.db(config.db.name);
    const coll = db.collection("varer");
    result = await coll.insertOne(doc);
  } finally {
    await client.close();
  }
  return result;
}

// Oppdaterer en vare med gitt VNr.
async function oppdaterVare(
  vNr,
  betegnelse,
  pris,
  katNr,
  antall,
  hylle,
  slettet,
  bildefil
) {
  let result = {};
  try {
    await client.connect();
    const db = client.db(config.db.name);
    const coll = db.collection("varer");
    result = await coll.updateOne(
      {
        VNr: vNr
      },
      {
        $set: {
          Betegnelse: betegnelse,
          Pris: pris,
          KatNr: katNr,
          Antall: antall,
          Hylle: hylle,
          Slettet: slettet,
          Bildefil: bildefil
        }
      }
    );
  } finally {
    await client.close();
  }
  return result;
}

// Sletter vare med gitt VNr.
async function slettVare(vNr) {
  let result = {};
  try {
    await client.connect();
    const db = client.db(config.db.name);
    const coll = db.collection("varer");
    result = await coll.deleteMany({VNr: vNr});
  } finally {
    await client.close();
  }
  return result;
}

export { hentVarer, hentVare, settInnVare, oppdaterVare, slettVare };
