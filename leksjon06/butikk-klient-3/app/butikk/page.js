"use client";

import React, { useState, useEffect } from "react";
import Vareliste from "../components/vareliste.js";
import Innlogging from "../components/innlogging.js";
import Bestilling from "../components/bestilling.js";
import Handlekurv from "../components/handlekurv.js";

const Butikk = () => {
  // Hardkoder varelisten (skal hentes fra databasen i ferdig løsning)
  let varer = [
    { VNr: "10820", Betegnelse: "Hakke", Pris: 99.5 },
    { VNr: "10830", Betegnelse: "Spett", Pris: 430.5 },
    { VNr: "10840", Betegnelse: "Øks", Pris: 234.0 },
    { VNr: "10850", Betegnelse: "Spade", Pris: 122.0 },
    { VNr: "10860", Betegnelse: "Rive", Pris: 98.5 },
  ];

  let [vnr, setVnr] = useState("");
  let [antall, setAntall] = useState(0);
  let [kurv, setKurv] = useState([]);

  const lesVnr = (event) => {
    setVnr(event.target.value);
  };

  const lesAntall = (event) => {
    setAntall(parseInt(event.target.value));
  };

  const bestillVare = (event) => {
    event.preventDefault();

    // For enkelt - må forbedres!
    setKurv([{ vnr: vnr, antall: antall, pris: 10 }]);
  };

  return (
    <>
      <h1>Nettbutikken</h1>
      <Innlogging />
      <Bestilling
        lesVnr={lesVnr}
        lesAntall={lesAntall}
        bestillVare={bestillVare}
      />
      <Handlekurv kurv={kurv} />
      <Vareliste varer={varer} />
    </>
  );
};

export default Butikk;
