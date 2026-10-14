# Leksjon 6. Bygge UI med React (https://dbsys.info/2000/leksjon06/)

Vi starter nå å bygge en enkel nettbutikk. Første steg er å bygge frontend med React.

Dette er vist i 4 steg, koden til hvert steg ligger på en egen mappe med en tilhørende README-fil. I steg 0 er det ingen kode, bare en README-fil. Samme løsning er laget både med Next og Vite.

Når jeg oppdaterte nettbutikken til nyeste versjon av React/Vite denne høsten (2026), så lot jeg bare 2025-mappene ligge (av hensyn til leksjonsvideoene), og la til en ny mappe butikk-klient-vite-2026. Dette er altså en oppdatert versjon av butikk-klient-vite-4. (Til slutt fikk jeg Claude til å lage en litt "finere" versjon av denne, på mappe butikk-klient-vite-2026-claude - identisk funksjonalitet, bare litt mer bruk av Tailwind CSS.)

Nettbutikken skal utvides med backend og database. Da kommer jeg til å jobbe videre med "Vite-2026-varianten".

For å forstå koden i nettbutikken må vi først se på noen flere grunnleggende React-teknikker.

## 6-0. Forberedelser

Lag en "demo React-app" med Vite og sørg for å forenkle startsiden, se leksjon 5.

Start appen slik:

```
npm run dev
```

Åpne deretter nettleseren på: http://localhost:5173

## 6-1. JSON og sammensatte komponenter

- Hvordan gjennomløpe en kompleks datastruktur med map-funksjonen?
- (https://react.dev/learn#adding-styles)
- Merk bruk av key-attributt!

```
function Vareliste() {
  const varer = [
    { navn: 'Hakke', pris: 20.50, id: 1 },
    { navn: 'Spett', pris: 45.50, id: 2 },
    { navn: 'Sag', pris: 77.00, id: 3 }
  ];
  const vareliste = varer.map(v =>
    <li key={v.id}>
      {v.navn} &ndash; {v.pris}
    </li>
  );

  return (
    <ul>{vareliste}</ul>
  );
}

const elem = <Vareliste />;
```

## 6-2. (Komponenter med gammel klassesyntaks)

Ta gjerne en kikk, kan være aktuelt (å forstå) hvis man skal jobbe med eldre kode.

- Funksjonelle komponenter vs. klassekomponenter
- (https://www.w3schools.com/react/react_components.asp)

```
class Vare extends React.Component {
  render() {
    return <h2>En vare</h2>;
  }
};
```

## 6-3. Fange hendelser

Vi håndterer hendelser med egne event-funksjoner

- Her lager vi en event-funksjon handleClick
- Funksjonen registreres som lytter ved hjelp av onClick (merk: ikke onclick)

```
"use client";

function Knapp() {
  function handleClick(e) {
    alert('Klikk');
  }

  return (
    <button onClick={handleClick}>
      Klikk her!
    </button>
  );
}

<Knapp />
```

## 6-4. Håndtere tilstand med hooks: useState

- En useState-hook er et par (x,setX), der x er en variabel og setX er en funksjon som brukes for å endre verdien til x.
- På den måten får React kontroll på alle "tilstandsendringer" (og vet når nettsiden skal friskes opp).
- Koden under holder styr på antall knappetrykk.
- Det finnes andre typer av hooks enn useState (https://react.dev/reference/react/hooks)

```
"use client";

import { useState } from "react";

function Knapp() {
  let [antall, setAntall] = useState(0);

  function fangKlikk() {
    antall++;
    setAntall(antall);
  }

  return (
    <button onClick={fangKlikk}>
      Antall klikk: {antall}
    </button>
  );
}

<Knapp />
```

## 6-5. Dele tilstand med useState og props

Koden under viser hvordan to komponenter Knapp og Melding kan "dele" tilstand via en "mor-komponent" Home:

- Knappetrykket fanges i Knapp
- Antall klikk tas vare på med en hook i Home, der vi også definerer event-funksjonen
- Event-funksjonen sendes med som props-parameter til Knapp
- Antall klikk sendes med som props-parameter til Melding, som viser resultatet.

```
function Knapp({ vedKlikk }) {
  return <button onClick={vedKlikk}>Klikk!</button>;
}

function Melding({ ant }) {
  return <p>Antall klikk: {ant}</p>;
}
```

I function Home():

```
const [antall, setAntall] = useState(0);

function haandterKlikk() {
  console.log("Klikk!");
  setAntall(antall+1);
}

return (
  <div>
    <Knapp vedKlikk={haandterKlikk} />
    <Melding ant={antall} />
  </div>
);
```

## 6-6. Håndtere komplekse datastrukturer med useState

Det vil noen ganger være behov for å håndtere litt mer komplekse datastrukturer, som f.eks. tabeller eller objekter, med useState.

- Handlekurven til nettbutikken er et eksempel på dette.

Tabeller brukt i useState bør behandles som "read only":

- Hvis man har behov for å legge til et element, så bør man bygge en helt ny tabell.
- Koden under er et minimalt eksempel, som viser hvordan dette gjøres med "spread-operatoren".
- Mer om spread-operatoren: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax#spread_in_array_literals
- Koden er hentet fra denne siden: https://react.dev/learn/updating-arrays-in-state

Koden kan settes inn på en tom side, som kan levere en Liste.

```
let n = 0;
function Liste() {
  const [navn, setNavn] = useState("");
  const [liste, setListe] = useState([]);
  return (
    <>
      <h1>Navn:</h1>
      <input value={navn} onChange={(e) => setNavn(e.target.value)} />
      <button
        onClick={() => {
          // Her blir listen "plukket fra hverandre" og så satt sammen igjen
          setListe([...liste, { id: n++, name: navn }]);
        }}>
        Add
      </button>
      <ul>
        {liste.map((n) => (
          <li key={n.id}>{n.name}</li>
        ))}
      </ul>
    </>
  );
}
```

## 6-7. Props drilling

"Props drilling" er typisk for React og innebærer at vi sender data gjennom flere ledd (nedover).

Eksempel:

- Mange komponenter i appen trenger tilgang på "tema", som kan være "mørk" eller "lys".
- Komponent 1 sender tema til komponent 2 som sender videre til komponent 3.
- Koden under er kun en demo av selve parameteroverføringen (endrer ikke tema), og kan testes i en tom side ved å sette inn Komponent1.

```
function Komponent1() {
  const [tema, setTema] = useState("mørk");
  return (
    <>
      <h1>K1</h1>
      <Komponent2 tema={tema} />
    </>
  );
}
function Komponent2({ tema }) {
  return (
    <>
      <h1>K2</h1>
      <Komponent3 tema={tema} />
    </>
  );
}
function Komponent3({ tema }) {
  return (
    <>
      <h1>K3</h1>
      <p>Tema: {tema}</p>
    </>
  );
}
```

## 6-8. Bruke useContext for å dele data mellom komponenter

Med useContext kan vi oppnå det samme som i 6-7 uten behov for "props drilling".

- Se https://react.dev/learn/scaling-up-with-reducer-and-context
- Koden er hentet fra: https://www.w3schools.com/react/react_usecontext.asp
- Test ved å vise Komponent1b i en tom side.

Man trenger først et par importer:

```
import { useState } from "react";
import { createContext, useContext } from "react";
```

Lager konteksten som en slags "global konstant", typisk eksportert fra en egen fil (men for testing kan man legge alt i én fil).

```
const TemaContext = createContext();
```

Lager samme eksempel som over, men uten å sende props.

- Omslutter innholdet i komponent 1b med konteksten.
- Kan bruke verdien direkte i alle "barn-komponentene", her gjøres det i komponent 3b.

```
function Komponent1b() {
  const [tema, setTema] = useState("mørk");
  return (
    <>
      <TemaContext.Provider value={tema}>
        <h1>K1b</h1>
        <button onClick={() => setTema(tema === "mørk" ? "lys" : "mørk")}>
          Bytt tema
        </button>
        <Komponent2b />
      </TemaContext.Provider>
    </>
  );
}
function Komponent2b() {
  return (
    <>
      <h1>K2b</h1>
      <Komponent3b />
    </>
  );
}
function Komponent3b() {
  const tema = useContext(TemaContext);
  return (
    <>
      <h1>K3b</h1>
      <p>Tema: {tema}</p>
    </>
  );
}
```
