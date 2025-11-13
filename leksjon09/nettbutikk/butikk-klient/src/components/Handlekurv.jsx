import React, { useState, useEffect } from "react";
import axios from "axios";
import { visBeløp } from "../lib/hjelpere.js";

// Handlekurv får inn brukernavn og handlekurv som props-parametre
// og viser fram innholdet med beregnet totalsum. Merk bruk av
// høyere ordens funksjoner reduce og map.

const Handlekurv = ({ brukernavn, kurv }) => {
  // URL til tjeneren (bør legges i en styrefil)
  const url = "http://localhost:3030/ordrer";

  // Bruker en teller for å trigge useEffect
  const [teller, setTeller] = useState(0);
  // Lagrer ordre i databasen (hver gang teller endrer verdi)
  useEffect(() => {
    const lagreOrdre = async () => {
      try {
        if (teller > 0) {
          const response = await axios.post(url, {
            brukernavn: brukernavn,
            kurv: kurv,
          });
          console.log(JSON.stringify(response.data, null, 2));
        }
      } catch (error) {
        console.error(error.message);
      }
    };
    lagreOrdre();
  }, [teller, brukernavn, kurv]);

  // Finn samlet verdi av handlekurven
  const handlekurvTotal = () => {
    return kurv.reduce((sum, elem) => sum + elem.pris * elem.antall, 0);
  };

  const gåTilKasse = () => {
    alert("Lagrer ordre i databasen. Takk for handelen!");

    // Øker teller for å trigge useEffect
    setTeller(teller + 1);
  };

  return (
    <>
      <h2>Handlekurv for {brukernavn}</h2>
      {kurv.map((linje) => (
        <p key={linje.vnr}>
          {linje.antall} stk. av vare {linje.vnr} til {visBeløp(linje.pris)} ={" "}
          {visBeløp(linje.antall * linje.pris)}
        </p>
      ))}
      <p>Verdi av handlekurv: {visBeløp(handlekurvTotal())}</p>
      <button
        onClick={gåTilKasse}
        className="p-2 border bg-gray-300 border-gray-600">
        Gå til kasse
      </button>
    </>
  );
};

export default Handlekurv;
