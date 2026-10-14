// Enkel demo av HTML-skjema, der event-funksjoner
// for å håndtere inndata er sendt med fra en "superkomponent"
// (i dette tilfellet Butikk). Merk at samme event-funksjon lesInndata
// blir brukt for å håndtere endring både i brukernavn og passord,
// denne funksjonen må dermed sjekke event-objektet for å finne ut
// hvilken tekstboks som ble endret (se Butikk for koden).

const Innlogging = ({ sjekkInnlogging, lesInndata }) => {
  return (
    <div className="kort max-w-2xl">
      <form onSubmit={sjekkInnlogging}>
        <h2>Innlogging</h2>
        <p className="mb-4 text-stone-600">Logg inn for å bestille varer.</p>
        <div className="flex flex-wrap gap-3">
          <input
            type="text"
            className="felt min-w-40 flex-1"
            id="brukernavn"
            name="brukernavn"
            placeholder="Brukernavn"
            onChange={lesInndata}
          />
          <input
            type="password"
            className="felt min-w-40 flex-1"
            id="passord"
            name="passord"
            placeholder="Passord"
            onChange={lesInndata}
          />
          <button className="knapp">Logg inn</button>
        </div>
      </form>
    </div>
  );
};

export default Innlogging;
