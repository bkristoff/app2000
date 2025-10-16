"use client";

import { useState } from "react";

import Vareliste from "../components/vareliste.js";
import Innlogging from "../components/innlogging.js";
import Bestilling from "../components/bestilling.js";
import Handlekurv from "../components/handlekurv.js";

// Dette er "hovedkomponenten". Den inneholder litt vel mange ting,
// og burde kanskje vært delt opp?

// Den tar vare på datastrukturen i et antall hooks (useState). Brukernavn
// og passord blir lest inn i komponenten Innlogging. Ved vellykket innlogging
// blir Bestilling og Handlekurv synlig. Varenummer og antall blir lest inn
// i komponenten Bestilling og dataene lagt inn i handlekurven.
//
// Butikk sender data ned i "barn-komponentene" ved å sende med
// "hook-variabler" som props-parametre, og får tak i data som blir
// lest inn i HTML-skjemaer i "barn-komponentene" ved å sende med
// event-funksjoner som props-parametre.
//
// Handlekurven er et eksempel på en "kompleks datastruktur" (en array
// av objekter). For å håndtere endringer i slike variabler (når man
// bruker useState), bør man erstatte gammel verdi med en kopi - og ikke
// oppdatere det gamle objektet. Et (bedre?) alternativ er å bruke hook'en
// useReducer - prøv gjerne dette selv.
//
// Varedata skal etter hvert hentes på JSON-format fra tjener-delen av
// applikasjonen (et REST-basert API basert på Express). Foreløpig blir
// varelisten bare hardkodet.
//
// I en større applikasjon kunne det vært aktuelt å samle
// komponenter som hører sammen i undermapper. Kanskje også
// lage undermapper for css, bilder. Les mer her:
// https://reactjs.org/docs/faq-structure.html

const Butikk = () => {
  // Klienten bruker kun denne ene ruten:
  const url = `http://localhost:3030/varer`;

  let [innlogget, setInnlogget] = useState(false);
  let [brukernavn, setBrukernavn] = useState("");
  let [passord, setPassord] = useState("");
  let [vnr, setVnr] = useState("");
  let [antall, setAntall] = useState(0);

  // Hardkoder litt innhold i handlekurven.
  // I en reell løsning vil handlekurven initieres til [].
  let startKurv = [
    { vnr: "10820", antall: 3, pris: 99.5 },
    { vnr: "10850", antall: 4, pris: 122.0 },
  ];
  let [kurv, setKurv] = useState(startKurv);

  // Hardkoding av varelisten bør erstattes med henting fra tjener.
  let alleVarer = [
    { VNr: "10820", Betegnelse: "Hakke", Pris: 99.5 },
    { VNr: "10830", Betegnelse: "Spett", Pris: 430.5 },
    { VNr: "10840", Betegnelse: "Øks", Pris: 234.0 },
    { VNr: "10850", Betegnelse: "Spade", Pris: 122.0 },
    { VNr: "10860", Betegnelse: "Rive", Pris: 98.5 },
  ];
  const [varer, setVarer] = useState(alleVarer);

  // Henter prisen til en vare.
  const varepris = (vnr) => {
    for (const elem of varer) {
      if (elem.VNr === vnr) {
        return parseFloat(elem.Pris);
      }
    }
    return 0; // Her bør brukeren få en feilmelding!
  };

  // Legger til en ny vare i handlekurven.
  // Men gjør dette ved å opprette en helt ny handlekurv (en kopi)!
  const oppdaterKurv = () => {
    console.log(`oppdaterKurv: vnr = ${vnr}, antall = ${antall}`);

    // Enkel løsning for å få en kopi:
    let kurvKopi = JSON.parse(JSON.stringify(kurv));

    let pris = varepris(vnr);
    kurvKopi.push({ vnr: vnr, antall: antall, pris: pris });
    setKurv(kurvKopi);
  };

  // Håndterer endring av inndata i Innlogging.
  const lesInndata = (event) => {
    const target = event.target.name;
    const value = event.target.value;
    if (target === "brukernavn") {
      setBrukernavn(value);
    } else {
      setPassord(value);
    }
  };

  // Håndterer submit i Innlogging.
  const sjekkInnlogging = (event) => {
    console.log(
      `sjekkInnlogging: brukernavn = ${brukernavn}, passord = ${passord}`
    );
    event.preventDefault();
    setInnlogget(true); // TODO: Sjekk mot databasen!
  };

  // Håndterer endring i varenummer i Bestilling.
  const lesVnr = (event) => {
    setVnr(event.target.value);
    console.log("lesVnr: " + vnr);
  };

  // Håndterer endring i antall i Bestilling.
  const lesAntall = (event) => {
    setAntall(parseInt(event.target.value));
    console.log("lesAntall: " + antall);
  };

  // Håndterer submit i Bestilling.
  const bestillVare = (event) => {
    event.preventDefault();
    oppdaterKurv();
  };

  let toppDel = null;
  if (!innlogget) {
    toppDel = (
      <Innlogging sjekkInnlogging={sjekkInnlogging} lesInndata={lesInndata} />
    );
  } else {
    toppDel = (
      <div>
        <Bestilling
          lesVnr={lesVnr}
          lesAntall={lesAntall}
          bestillVare={bestillVare}
        />
        <Handlekurv brukernavn={brukernavn} kurv={kurv} />
      </div>
    );
  }
  return (
    <>
      <h1>Nettbutikken</h1>
      {toppDel}
      <Vareliste varer={varer} />
    </>
  );
};

export default Butikk;
