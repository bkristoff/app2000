import React, { useState, useEffect } from "react";
import { visBeløp } from "../lib/hjelpere.js";

// Handlekurv får inn brukernavn og handlekurv som props-parametre
// og viser fram innholdet med beregnet totalsum. Merk bruk av
// høyere ordens funksjoner reduce og map.

const Handlekurv = ({ brukernavn, kurv }) => {
  // URL til tjeneren (bør legges i en styrefil)
  const url = "http://localhost:3030/ordrer";

  // Bruker en teller for å trigge useEffect
  const [teller, setTeller] = useState(0);
  const [visModal, setVisModal] = useState(false);

  // Lagrer ordre i databasen (hver gang teller endrer verdi)
  useEffect(() => {
    const lagreOrdre = async () => {
      try {
        if (teller > 0) {
          const response = await fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              brukernavn: brukernavn,
              kurv: kurv,
            }),
            credentials: "include",
          });

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const data = await response.json();
          console.log(JSON.stringify(data, null, 2));
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
    setVisModal(true);
    // Øker teller for å trigge useEffect
    setTeller(teller + 1);
  };

  const lukkModalOgLoggUt = async () => {
    setVisModal(false);

    // Logger ut brukeren
    try {
      const response = await fetch("http://localhost:3030/logout", {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        console.log("Logget ut");
        // Refresh siden for å vise innloggingsskjema igjen
        window.location.reload();
      }
    } catch (error) {
      console.error("Utlogging feilet:", error.message);
    }
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

      {/* Modal dialog */}
      {visModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md">
            <h3 className="text-lg font-semibold mb-4">Takk for handelen!</h3>
            <p className="mb-6">Lagrer ordre i databasen.</p>
            <button
              onClick={lukkModalOgLoggUt}
              className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              OK
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Handlekurv;
