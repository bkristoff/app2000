import { visBeløp } from "../lib/hjelpere.js";

const Vare = ({ vnr, betegnelse, pris }) => {
  return (
    <div className="boks">
      <h3>{betegnelse}</h3>
      <p>VNr: {vnr}</p>
      <p>Pris: {visBeløp(pris)}</p>
    </div>
  );
};

export default Vare;
