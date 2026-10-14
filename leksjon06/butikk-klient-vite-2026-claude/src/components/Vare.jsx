import { visBeløp } from "../lib/hjelpere.js";

const Vare = ({ vnr, betegnelse, pris }) => {
  return (
    <div className="kort flex flex-col gap-1 p-5 transition-shadow hover:shadow-md">
      <h3>{betegnelse}</h3>
      <p className="text-sm text-stone-500">VNr: {vnr}</p>
      <p className="mt-2 text-lg font-semibold text-emerald-800">
        Pris: {visBeløp(pris)}
      </p>
    </div>
  );
};

export default Vare;
