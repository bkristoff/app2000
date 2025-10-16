"use client";

const Bestilling = ({ lesVnr, lesAntall, bestillVare }) => {
  return (
    <div>
      <form onSubmit={bestillVare}>
        <h2>Bestill vare</h2>
        <input type="text" name="vnr" placeholder="VNr" onChange={lesVnr} />
        <input
          type="text"
          name="antall"
          placeholder="Antall"
          onChange={lesAntall}
        />
        <button>Legg i handlekurv</button>
      </form>
    </div>
  );
};

export default Bestilling;
