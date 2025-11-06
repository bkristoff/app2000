import { MongoClient } from "mongodb";
import { config } from "./config/config.js";

async function visAlleVarer() {
  const client = new MongoClient(config.db.url);
  try {
    await client.connect();
    const db = client.db("butikk");
    const coll = db.collection("varer");
    let result = await coll.find().toArray();
    console.log(result, null, 2);
  } finally {
    await client.close();
  }
}

async function endrePris(vNr, nyPris) {
  const client = new MongoClient(config.db.url);
  try {
    await client.connect();
    const db = client.db("butikk");
    const coll = db.collection("varer");
    await coll.updateOne(
      {  VNr: vNr },
      { $set: {
        Pris: nyPris
      }}
    )
  } finally {
    await client.close();
  }
}

visAlleVarer();
endrePris("10820", 300.00);
