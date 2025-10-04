# Leksjon 6. Bygge UI med React (https://dbsys.info/2000/leksjon06/)

React er et JavaScript-rammeverk for å bygge brukergrensesnittet til webapplikasjoner (frontend).

Denne filen inneholder stikkord og kodesnutter som jeg bruker på forelesning til å forklare noen grunnleggende React-teknikker.

Deretter starter vi å bygge en enkel nettbutikk. Første del er å lage brukergrensesnitt med React og JavaScript. Det gjøres i 4 steg, koden til hvert steg ligger på en egen mappe med en tilhørende README-fil. I steg 0 er det ingen kode, bare en README-fil.

Deretter skal vi utvide koden til en komplett webapplikasjon:

- Lage backend (REST API) (leksjon 7).
- Utvide backend med database (leksjon 8).
- Knytte sammen frontend og backend (leksjon 9).
- Legge på autentisering (leksjon 10).

I og med at vi bruker 2 uker på React, så vil hele jobben ta 6 uker. Men hvis du henger med hele veien, så har du et godt utgangspunkt for å bygge eget prosjekt.

## 6-0. Forberedelser

Sørg for at Node.js og npm er installert. Sjekk:

```
node --version
npm --version
```

## 6-1. Installere React

React kan prøves ut rett i en "sandkasse" i nettleseren (https://react.dev/learn/installation), eller med statiske HTML-filer.

Men vi skal uansett lage et større prosjekt, så vi tar like godt i bruk et byggeverktøy/rammeverk med en gang:

- Byggeverktøyet Vite (https://vite.dev/) og rammeverket Next.js (https://nextjs.org/docs) er to mye brukte alternativer.
- Både Vite og Next.js blir omtalt i dokumentasjonen til React (https://react.dev/learn/installation).
- I denne README-filen bruker vi Next.js. Egen README-fil for tilsvarende installering med Vite kommer.
- Bortsett fra punkt 6-1-a og 6-2 samt 6-8 (om routing) er øvrige punkter like for Vite og Next.js.

## 6-1-a. Installere React med create-next-app

- For å starte et nytt prosjekt, kjøres skriptet create-next-app (https://react.dev/learn/creating-a-react-app)
- "Skriptet" create-react-app, som i mange år var standardmåten å bygge React på, er nå faset ut.
  - (https://react.dev/blog/2025/02/14/sunsetting-create-react-app)
- Bruker npx for å kjøre create-next-app (som altså installerer React på "Next-måten").
- Stå på mappen over og godta alle standardvalg:

```
npx create-next-app@latest app1
```

Du har nå laget en "ferdig" (men "tom") React-applikasjon. Se på README.md. Den tipser om at du kan kjøre applikasjonen slik:

```
npm run dev
```

Åpne deretter nettleseren på: (http://localhost:3000)

- Installer gjerne React Developer Tools (Chrome / Firefox).
- Åpne Inspector og se på fane Components.

## 6-2. Forenkle startsiden

Forenkle "startsiden" app/page.js til:

```
export default function Home() {
  return (
    <main>
      <h1>Demo</h1>
    </main>
  )
}
```

Lagre og sjekk at oppdateringen skjer umiddelbart i nettleseren.

- Dette er altså en "live server".

## 6-3. Grunnleggende JSX

JSX = en måte å kombinere JavaScript og XML for å beskrive "komponenter" på nettsiden.

### 6-3-1. Lag en JSX-variabel

```
const elem = <p>Et avsnitt</p>;
```

Endre funksjonen Home (se avsnitt 6-2 over) til:

```
return <main>{elem}</main>
```

Mellom krøllparentesene kan du altså skrive JavaScript.

### 6-3-2. Flere linjer med JSX

En JSX-variabel kan tilordnes flere linjer med HTML-kode, f.eks. en HTML-tabell.

- Endre definisjonen av variabelen elem og behold resten av koden på app.js.
- Husk parenteser rundt JSX for å skrive flere linjer.

```
const elem = (
  <table>
    <tr>
      <th>Varenavn</th>
    </tr>
    <tr>
      <td>Hakke</td>
    </tr>
    <tr>
      <td>Spett</td>
    </tr>
  </table>
);
```

### 6-3-3. Bruke JS i JSX

Innenfor krøllparentesene kan vi gjøre JavaScript-beregninger:

```
const elem = <h1>React er {5 + 5} ganger bedre med JSX!</h1>;
```

### 6-3-4. Alltid kun ett rot-element vha. <div>

```
const elem = (
  <div>
    <p>Avsnitt 1</p>
    <p>Avsnitt 2</p>
  </div>
);
```

Eller bruke <> fragmenter (reduserer antall div-er i DOM-en):

```
const elem = (
  <>
    <p>avsnitt 1</p>
    <p>avsnitt 2</p>
  </>
);
```

## 6-4. Funksjonelle React-komponenter og props

En funksjonell React-komponent er en JavaScript-funksjon som returnerer JSX-kode.

- Hvis navnet på funksjonen er Vare, så kan <Vare> brukes som "XML-element".
- Vi fortsetter å redigere hovedsiden app/page.js.

### 6-4-1. Komponent Vare

- Lager en komponent Vare
- Tar vare på en slik komponent i variabelen elem
- Bruker variabelen elem i returverdien fra Home (se over)

```
function Vare() {
return <h2>Presentasjon av en vare</h2>;
}

const elem = <Vare />
```

### 6-4-2. Komponent med Props

Props ("properties") er data som sendes inn til komponenten som parametre.

- Lar farge være en parameter
- Sender inn en konkret farge ved å bruke attributt_verdi notasjon fra XML/HTML

```
function Vare(props) {
  return <h2>En {props.farge} Vare</h2>;
}

<Vare farge="rød" />
```

### 6-4-3. Props med destrukturering

Ved å omslutte props-parameter med krøllparenteser, så kan vi skrive farge i stedet for props.farge i funksjonskroppen.

```
function Vare({farge}) {
  return <h2>En {farge} Vare</h2>;
}
```

## 6-5. Conditional rendering

Hvis forskjellige ting skal vises, avhengig av verdien til en JavaScript-variabel:

```
let x = 1;
let elem;
if (x === 1) {
  elem = <Vare farge="rød" />;
} else {
  elem = <Vare farge="blå" />;
};
```

## 6-6. Komponenter på egne filer

Lag ny fil app/components/vare.js:

```
function Vare(props) {
  return <h2>En {props.farge} Vare</h2>;
}

export default Vare;
```

I app/page.js:

```
import Vare from './components/vare.js';

<Vare />
```

## 6-7. Sende objekter som props

Objekter kan generelt brukes for å representere "sammensatte" datastrukturer.

- Ved å sende objekter som props, kan vi f.eks. sende inn flere opplysninger om en vare til en React Vare-komponent.
- Samler nå igjen all koden i page.js for enkelhets skyld.

```
function Vare({vare}) {
  return <h2>Vare {vare.navn} koster {vare.pris} kr.</h2>;
}

export default function Home() {
  const v = {navn: "Hakke", pris: 50.00};
  return (
    <div>
      <Vare vare={v} />
    </div>
  );
}
```

## 6-8. Opprett "standard Next/React" mappestruktur med routing

Vi får blant annet routing "gratis" ved å utnytte standard mappestruktur:

- Mappe med f.eks. navn faq og fil page.js gir side på url /faq
- Legg til "use client" i toppen av alle page.js.
- Håndter ukjent URL med not-found.js
- Mappestruktur-eksempel:

- app
  - components
    - footer.js
    - nav-bar.js
  - faq
    - page.js
  - page.js
  - layout.js
  - not-found.js
  - globals.css

I nav-bar.js, legg til:

```
import Link from "next/link";

<Link href="/faq">FAQ</Link>
```

I layout.js, legg til import og "navbar".

## 6-9. JSON og sammensatte komponenter

- Hvordan gjennomløpe en kompleks datastruktur med map-funksjonen
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

## 6-10. (Komponenter med gammel klassesyntaks)

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

## 6-11. Fange hendelser

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

## 6-12. Håndtere tilstand med hooks: useState

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

## 6-13. Dele tilstand med useState og props

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

## 6-14. Bruke vanlig CSS og/eller Tailwind CSS (eller MUI 5)

Legg til regler i globals.css:

```
h1 {
  color: blue;
}
.viktig {
  color: red;
}
```

Bruk className (ikke class):

```
const elem = <p className="viktig">Et avsnitt</p>;
```

Tailwind-eksempel:

```
<h1 className="text-3xl font-bold underline">Overskrift</h1>
```

## 6-15. Fikse "The unknown at rule @tailwind warning"

- CTRL + SHIFT + P for åpne kommando-paletten.
- Skriv: Open User Settings (JSON)
- Sett inn følgende nederst i settings.json:

```
"css.lint.unknownAtRules": "ignore"
```

## 6-16. Hva bør du kunne om JavaScript for å bruke React?

https://www.w3schools.com/react/react_es6.asp
