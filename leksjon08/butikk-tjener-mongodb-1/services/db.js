import { config } from "../config/config.js";
import { MongoClient } from "mongodb";

//  Hjelpefunksjoner som henter data fra MongoDB-databasen.

const client = new MongoClient(config.db.url);

// Henter alle varer
async function hentVarer() {
  let result = {};
  // TODO Sett inn kode
  return result;
}

// Henter én vare basert på VNr.
async function hentVare(vNr) {
  let result = {};
  // TODO Sett inn kode
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
  // TODO Sett inn kode
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
  // TODO Sett inn kode
  return result;
}

// Sletter vare med gitt VNr.
async function slettVare(vNr) {
  let result = {};
  // TODO Sett inn kode
  return result;
}

export { hentVarer, hentVare, settInnVare, oppdaterVare, slettVare };
