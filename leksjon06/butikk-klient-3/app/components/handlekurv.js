import { visBeløp } from "../lib/hjelpere";

const Handlekurv = ({ kurv }) => {
  return (
    <>
      <h2>Handlekurv</h2>
      {kurv.map((linje) => (
        <p key={linje.vnr}>
          {linje.antall} stk. av vare {linje.vnr} til {visBeløp(linje.pris)} ={" "}
          {visBeløp(linje.antall * linje.pris)}
        </p>
      ))}
      <p>Verdi av handlekurv: {visBeløp(500)}</p>
      <button>Gå til kasse</button>
    </>
  );
};

export default Handlekurv;
