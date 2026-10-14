// Enkel demo av HTML-skjema, der event-funksjoner for å håndtere inndata
// er sendt med fra en "mor-komponent" (i dette tilfellet Butikk).
// Event-funksjonene lesVnr og lesAntall er altså definert i Butikk
// og sørger for at innholdet i disse tekstboksene blir tatt vare på
// i hooks-variabler. Event-funksjonen bestillVare er også definert
// i Butikk og håndterer submit-knappen (sjekker lovlig innlogging).

const Bestilling = ({ lesVnr, lesAntall, bestillVare }) => {
  return (
    <div className="kort">
      <form onSubmit={bestillVare}>
        <h2>Bestill vare</h2>
        <div className="flex flex-wrap gap-3">
          <input
            type="text"
            className="felt w-28"
            name="vnr"
            placeholder="VNr"
            onChange={lesVnr}
          />
          <input
            type="text"
            className="felt w-28"
            name="antall"
            placeholder="Antall"
            onChange={lesAntall}
          />
          <button className="knapp">Legg i handlekurv</button>
        </div>
      </form>
    </div>
  );
};

export default Bestilling;
