// Enkel demo av HTML-skjema, der event-funksjoner for å håndtere inndata
// er sendt med fra en "mor-komponent" (i dette tilfellet Butikk).
// Event-funksjonene lesVnr og lesAntall er altså definert i Butikk
// og sørger for at innholdet i disse tekstboksene blir tatt vare på
// i hooks-variabler. Event-funksjonen bestillVare er også definert
// i Butikk og håndterer submit-knappen (sjekker lovlig innlogging).

const Bestilling = ({ lesVnr, lesAntall, bestillVare }) => {
  return (
    <div className="space-y-4">
      <form onSubmit={bestillVare}>
        <h2>Bestill vare</h2>
        <input
          type="text"
          className="p-2 border border-gray-300 bg-white placeholder:text-gray-600"
          name="vnr"
          placeholder="VNr"
          onChange={lesVnr}
        />
        &nbsp;
        <input
          type="text"
          className="p-2 border border-gray-300 bg-white placeholder:text-gray-600"
          name="antall"
          placeholder="Antall"
          onChange={lesAntall}
        />
        &nbsp;
        <button className="p-2 border bg-gray-300 border-gray-600">
          Legg i handlekurv
        </button>
      </form>
    </div>
  );
};

export default Bestilling;
