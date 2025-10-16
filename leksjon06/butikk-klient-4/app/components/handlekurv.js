"use client";

import { visBeløp } from "../lib/hjelpere.js";

// Handlekurv får inn brukernavn og handlekurv som props-parametre
// og viser fram innholdet med beregnet totalsum. Merk bruk av
// høyere ordens funksjoner reduce og map.

const Handlekurv = ({ brukernavn, kurv }) => {
  // Finn samlet verdi av handlekurven
  const handlekurvTotal = () => {
    return kurv.reduce((sum, elem) => sum + elem.pris * elem.antall, 0);
  };

  const gåTilKasse = () => {
    // Handlekurven bør lagres som en ordre i databasen!
    alert(
      "Gå til kasse og lagring av bestilling i databasen er ikke implementert!"
    );
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
      <button onClick={gåTilKasse}>Gå til kasse</button>
    </>
  );
};

export default Handlekurv;
