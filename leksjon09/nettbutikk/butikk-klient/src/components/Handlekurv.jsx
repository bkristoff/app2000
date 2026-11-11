import { useState } from "react";
import { lagreOrdre } from "../lib/api.js";
import { visBeløp } from "../lib/hjelpere.js";

// Handlekurv får inn brukernavn og handlekurv som props-parametre
// og viser fram innholdet med beregnet totalsum. Merk bruk av
// høyere ordens funksjoner reduce og map.
//
// Ordren lagres direkte i event-funksjonen gåTilKasse, ikke i en useEffect.
// Tommelfingerregel: Kode som skal kjøres fordi brukeren gjorde noe
// (klikket på en knapp), hører hjemme i event-funksjonen. useEffect er for
// å synkronisere med noe utenfor React når komponenten vises (se Butikk).
// Les mer: https://react.dev/learn/you-might-not-need-an-effect

const Handlekurv = ({ brukernavn, kurv, tømKurv }) => {
  const [melding, setMelding] = useState("");
  const [lagrer, setLagrer] = useState(false);

  // Finn samlet verdi av handlekurven
  const handlekurvTotal = () => {
    return kurv.reduce((sum, elem) => sum + elem.pris * elem.antall, 0);
  };

  const gåTilKasse = async () => {
    setLagrer(true);
    setMelding("Lagrer ordre ...");
    try {
      const svar = await lagreOrdre(brukernavn, kurv);
      setMelding(`Ordre nr. ${svar.ordrenr} er lagret. Takk for handelen!`);
      tømKurv();
    } catch (error) {
      setMelding(`Kunne ikke lagre ordren: ${error.message}`);
    } finally {
      setLagrer(false);
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
        disabled={lagrer || kurv.length === 0}
        className="p-2 border bg-gray-300 border-gray-600 disabled:opacity-50">
        Gå til kasse
      </button>
      {melding && <p>{melding}</p>}
    </>
  );
};

export default Handlekurv;
