"use client";

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
          id="brukernavn"
          name="brukernavn"
          placeholder="Brukernavn"
          onChange={lesInndata}
        />
        <input
          type="password"
          id="passord"
          name="passord"
          placeholder="Passord"
          onChange={lesInndata}
        />
        <button>Logg inn</button>
      </form>
    </div>
  );
};

export default Innlogging;
