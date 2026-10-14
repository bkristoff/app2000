// Enkel demo av HTML-skjema, der event-funksjoner
// for å håndtere inndata er sendt med fra en "superkomponent"
// (i dette tilfellet Butikk). Merk at samme event-funksjon lesInndata
// blir brukt for å håndtere endring både i brukernavn og passord,
// denne funksjonen må dermed sjekke event-objektet for å finne ut
// hvilken tekstboks som ble endret (se Butikk for koden).

const Innlogging = ({ sjekkInnlogging, lesInndata }) => {
  return (
    <div>
      <form onSubmit={sjekkInnlogging}>
        <h2>Innlogging</h2>
        <p>Logg inn for å bestille varer.</p>
        <input
          type="text"
          className="p-2 border border-gray-300 bg-white placeholder:text-gray-600"
          id="brukernavn"
          name="brukernavn"
          placeholder="Brukernavn"
          onChange={lesInndata}
        />
        &nbsp;
        <input
          type="password"
          className="p-2 border border-gray-300 bg-white placeholder:text-gray-600"
          id="passord"
          name="passord"
          placeholder="Passord"
          onChange={lesInndata}
        />
        &nbsp;
        <button className="p-2 border bg-gray-300 border-gray-600">
          Logg inn
        </button>
      </form>
    </div>
  );
};

export default Innlogging;
