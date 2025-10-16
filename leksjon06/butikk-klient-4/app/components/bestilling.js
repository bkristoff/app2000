"use client";

// Enkel demo av HTML-skjema, der event-funksjoner for å håndtere inndata
// er sendt med fra en "mor-komponent" (i dette tilfellet Butikk).
// Event-funksjonene lesVnr og lesAntall er altså definert i Butikk
// og sørger for at innholdet i disse tekstboksene blir tatt vare på
// i hooks-variabler. Event-funksjonen bestillVare er også definert
// i Butikk og håndterer submit-knappen (sjekker lovlig innlogging).

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
