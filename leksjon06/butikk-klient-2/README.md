# Lage butikk-klient-3 (versjon 3 av nettbutikken)

Vi har nå en React webapplikasjon med undersider og visning av varelageret.

I overgangen til versjon 3 skal vi legge til bestilling av nye varer med oppdatering av handlekurv.

## 1. Sjekk at løsningen fungerer.

For å teste må du som vanlig kjøre:

```
npm install
npm run dev
```

Og så åpne nettleseren på adresse: localhost:3000

## 2. Bygg ut med bestillingsskjema

Bygg ut Bestilling med et HTML-skjema som inneholder to input-felt og en button. Noe i stil med dette:

```
<form>
  <input type="text" name="vnr" placeholder="VNr" />
  <button>Legg i handlekurv</button>
</form>
```

## 3. Utvid med state hooks

Utvid Butikk med tre state hooks for å ta vare på henholdsvis varenummer, antall og handlekurv.

```
let [vnr, setVnr] = useState("");
let [antall, setAntall] = useState(0);
let [kurv, setKurv] = useState([]);
```

## 4. Utvid med event-funksjoner

Utvid Butikk med tre event-funksjoner lesVnr, lesAntall og (foreløpig versjon av) bestillVare:

```
const lesVnr = (event) => {
  setVnr(event.target.value);
};

const lesAntall = (event) => {
  setAntall(parseInt(event.target.value));
};

const bestillVare = (event) => {
  event.preventDefault();

  // For enkelt - må forbedres:
  setKurv([{ vnr: vnr, antall: antall, pris: 10 }]);
};
```

Send de tre funksjonene med som props-parametre til Bestilling.

## 5. Visning av handlekurv

Utvid Handlekurv med to props-parametre brukernavn og kurv, som sendes med fra Butikk.

Handlekurv skal vise en overskrift "Handlekurv for bruker" og deretter innholdet i handlekurven med en linje for hver vare. Til slutt skal total verdi av handlekurven bli vist. Her er en start på deler av koden (med et par forenklinger):

```
  return (
    <>
      <h2>Handlekurv for Ola</h2>
      {kurv.map((linje) => (
        <p key={linje.vnr}>
          {linje.antall} stk. av vare {linje.vnr} {" "}
          til {linje.pris} = {" "}
          {linje.antall * linje.pris}
        </p>
      ))}
      <p>Verdi av handlekurv: {500}</p>
      <button>Gå til kasse</button>
    </>
```

## 6. Hjelpefunksjon

Vi ønsker å presentere kronebeløp bedre, med 2 desimaler og "kr" foran. Vi legger det inn i en hjelpefunksjon, som vi plasserer på fil app/lib/hjelpere.js:

```
var formatter = new Intl.NumberFormat("NO", {
  style: "currency",
  currency: "NOK",
});

const visBeløp = (pris) => formatter.format(pris);

export { visBeløp };
```

Importer denne funksjonen i Handlekurv og kall på den for å presentere kronebeløp.

## 7. Veien videre

Bestilling av varer og visning av handlekurv er ikke helt perfekt, men i nærheten.

Men vi mangler innlogging.
