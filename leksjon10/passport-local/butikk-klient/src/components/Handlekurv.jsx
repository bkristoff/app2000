import { useState } from "react";
import { visBeløp } from "../lib/hjelpere.js";

// Handlekurv får inn brukernavn og handlekurv som props-parametre
// og viser fram innholdet med beregnet totalsum. Merk bruk av
// høyere ordens funksjoner reduce og map.
//
// Ordren lagres i event-funksjonen gåTilKasse (ikke i en useEffect):
// koden skal kjøres fordi brukeren klikket på en knapp.
// Se https://react.dev/learn/you-might-not-need-an-effect

const Handlekurv = ({ brukernavn, kurv }) => {
  // URL til tjeneren (bør legges i en styrefil)
  const url = "http://localhost:3030/ordrer";

  const [visModal, setVisModal] = useState(false);
  const [melding, setMelding] = useState("");

  // Finn samlet verdi av handlekurven
  const handlekurvTotal = () => {
    return kurv.reduce((sum, elem) => sum + elem.pris * elem.antall, 0);
  };

  // Lagrer ordren i databasen. Vi sender bare handlekurven: tjeneren vet hvem
  // kunden er ut fra sesjons-cookien (Passport), som sendes med pga. credentials.
  const gåTilKasse = async () => {
    setMelding("Lagrer ordre i databasen ...");
    setVisModal(true);
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kurv: kurv }),
        credentials: "include",
      });

      if (response.status === 401) {
        setMelding("Du er ikke lenger innlogget. Logg inn på nytt.");
        return;
      }
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(JSON.stringify(data, null, 2));
      setMelding("Ordren er lagret. Takk for handelen!");
    } catch (error) {
      console.error(error.message);
      setMelding("Kunne ikke lagre ordren: " + error.message);
    }
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
      }
    } catch (error) {
      console.error("Utlogging feilet:", error.message);
    }
    // Refresh siden for å vise innloggingsskjema igjen
    window.location.reload();
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
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md">
            <h3 className="text-lg font-semibold mb-4">Takk for handelen!</h3>
            <p className="mb-6">{melding}</p>
            <button
              onClick={lukkModalOgLoggUt}
              className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              OK (logg ut)
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Handlekurv;
