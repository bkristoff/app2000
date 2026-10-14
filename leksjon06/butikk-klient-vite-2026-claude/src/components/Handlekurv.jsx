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
    <div className="kort">
      <h2>Handlekurv for {brukernavn}</h2>
      <div className="divide-y divide-stone-100">
        {kurv.map((linje) => (
          <p key={linje.vnr} className="py-2 text-stone-700">
            {linje.antall} stk. av vare {linje.vnr} til {visBeløp(linje.pris)} ={" "}
            <span className="font-medium text-stone-900">
              {visBeløp(linje.antall * linje.pris)}
            </span>
          </p>
        ))}
      </div>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-stone-200 pt-4">
        <p className="text-lg font-semibold">
          Verdi av handlekurv: {visBeløp(handlekurvTotal())}
        </p>
        <button onClick={gåTilKasse} className="knapp">
          Gå til kasse
        </button>
      </div>
    </div>
  );
};

export default Handlekurv;
