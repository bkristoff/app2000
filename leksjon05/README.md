# Leksjon 5. Introduksjon til React (https://dbsys.info/2000/leksjon05/)

React er et JavaScript-rammeverk for å bygge brukergrensesnittet til webapplikasjoner (frontend).

Denne filen inneholder stikkord og kodesnutter som jeg bruker på forelesning til å forklare noen grunnleggende React-teknikker.

## 5-0. Forberedelser

Sørg for at Node.js og npm er installert. Sjekk:

```
node --version
npm --version
```

## 5-1. Installere React

React kan prøves ut rett i en "sandkasse" i nettleseren (https://react.dev/learn/installation), eller med statiske HTML-filer.

Men vi skal uansett lage et større prosjekt, så vi tar like godt i bruk et byggeverktøy/rammeverk med en gang:

- Byggeverktøyet Vite (https://vite.dev/) og rammeverket Next.js (https://nextjs.org/docs) er to mye brukte alternativer.
- Både Vite og Next.js blir omtalt i dokumentasjonen til React (https://react.dev/learn/installation).
- I denne README-filen bruker vi Next.js. Egen README-fil for tilsvarende installering med Vite kommer.
- Bortsett fra punkt 6-1-a og 6-2 samt 6-8 (om routing) er øvrige punkter like for Vite og Next.js.

## 5-1-a. Installere React med create-next-app

- For å starte et nytt prosjekt, kjøres skriptet create-next-app (https://react.dev/learn/creating-a-react-app)
- "Skriptet" create-react-app, som i mange år var standardmåten å bygge React på, er nå faset ut.
  - (https://react.dev/blog/2025/02/14/sunsetting-create-react-app)
- Bruker npx for å kjøre create-next-app (som altså installerer React på "Next-måten").
- Stå på mappen over og kjør dette for å lage ny React-app på undermappe "app1":

```
npx create-next-app@latest app1
```

Du kan godta alle standardvalg, eller svare slik hvis du ber om muligheten for å tilpasse oppsettet:

```
Would you like to use the recommended Next.js defaults? [No, customize settings]
Would you like to use TypeScript? [Yes]
Which linter would you like to use? [ESLint]
Would you like to use React Compiler? [No]
Would you like to use Tailwind CSS? [Yes]
Would you like your code inside a `src/` directory? [No]
Would you like to use App Router? (recommended) [Yes]
Would you like to customize the import alias (`@/*` by default)? [No]
Would you like to include AGENTS.md to guide coding agents to write up-to-date Next.js code? [Yes]
```

TypeScript er nå standard. Kodefiler vil da få utvidelse "tsx", som betyr "TypeScript med JSX" (JSX er er en slags "HTML-aktig" React-syntaks for å beskrive nettsider, se under).

Hvis du koder med ren JavaScript, bør/må du legge til følgende linje i package.json, f.eks. etter linjen med "version":

```
  "type": "module",
```

Merk: Eksempelkode i APP2000-repo fra høst 2025 er basert på JavaScript, men mye vil bli gjort om til TypeScript nå.

Du har nå laget en "ferdig" (men "tom") React-applikasjon. Se på README.md. Den tipser om at du kan kjøre applikasjonen slik:

```
cd app1
npm run dev
```

Åpne deretter nettleseren på: (http://localhost:3000)

- Installer gjerne React Developer Tools (Chrome / Firefox).
- Åpne Inspector og se på fane Components.

## 5-2. Forenkle startsiden

Forenkle "startsiden" app/page.tsx til:

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

## 5-3. Grunnleggende JSX

JSX = en måte å kombinere JavaScript og XML for å beskrive "komponenter" på nettsiden.

### 5-3-1. Lag en JSX-variabel

```
const elem = <p>Et avsnitt</p>;
```

Endre funksjonen Home (se avsnitt 6-2 over) til:

```
return <main>{elem}</main>
```

Mellom krøllparentesene kan du altså skrive JavaScript.

### 5-3-2. Flere linjer med JSX

En JSX-variabel kan tilordnes flere linjer med HTML-kode, f.eks. en HTML-tabell.

- Endre definisjonen av variabelen elem og behold resten av koden på app.js.
- Husk parenteser rundt JSX for å skrive flere linjer.

```
const elem = (
  <table><thead>
    <tr>
      <th>Varenavn</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Hakke</td>
    </tr>
    <tr>
      <td>Spett</td>
    </tr>
  </tbody></table>
);
```

### 5-3-3. Bruke JS i JSX

Innenfor krøllparentesene kan vi gjøre JavaScript-beregninger:

```
const elem = <h1>React er {5 + 5} ganger bedre med JSX!</h1>;
```

### 5-3-4. Alltid kun ett rot-element vha. <div>

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

## 5-4. Funksjonelle React-komponenter og props

En funksjonell React-komponent er en JavaScript-funksjon som returnerer JSX-kode.

- Hvis navnet på funksjonen er Vare, så kan <Vare> brukes som "XML-element".
- Vi fortsetter å redigere hovedsiden app/page.js.

### 5-4-1. Komponent Vare

- Lager en komponent Vare
- Tar vare på en slik komponent i variabelen elem
- Bruker variabelen elem i returverdien fra Home (se over)

```
function Vare() {
return <h2>Presentasjon av en vare</h2>;
}

const elem = <Vare />
```

### 5-4-2. Komponent med Props

Props ("properties") er data som sendes inn til komponenten som parametre.

- Lar farge være en parameter
- Sender inn en konkret farge ved å bruke attributt_verdi notasjon fra XML/HTML

```
type VareProps = {
  farge: string;
};

function Vare(props: VareProps) {
  return <h2>En {props.farge} Vare</h2>;
}

<Vare farge="rød" />
```

### 5-4-3. Props med destrukturering

Ved å omslutte props-parameter med krøllparenteser, så kan vi skrive farge i stedet for props.farge i funksjonskroppen.

```
function Vare({farge}: VareProps) {
  return <h2>En {farge} Vare</h2>;
}
```

Enda en variant, der vi skriver typen rett inn i komponenten (definerer altså ikke VareProps først):

```
function Vare(props: {farge: string}) {
  return <h2>En {props.farge} Vare</h2>;
}
```

## 5-5. Conditional rendering

Hvis forskjellige ting skal vises, avhengig av verdien til en JavaScript-variabel:

```
const x = 1;
let elem;
if (x === 1) {
  elem = <Vare farge="rød" />;
} else {
  elem = <Vare farge="blå" />;
};
```

## 5-6. Komponenter på egne filer

Lag ny fil app/components/vare.tsx:

```
type VareProps = {
  farge: string;
};

function Vare(props) {
  return <h2>En {props.farge} Vare</h2>;
}

export default Vare;
```

I app/page.tsx:

```
import Vare from "./components/vare";

export default function Home() {
  return <Vare farge="lilla" />;
}
```

## 5-7. Sende objekter som props

Objekter kan generelt brukes for å representere "sammensatte" datastrukturer.

- Ved å sende objekter som props, kan vi f.eks. sende inn flere opplysninger om en vare til en React Vare-komponent.
- Samler nå igjen all koden i page.tsx for enkelhets skyld.
- Dropper typer i første omgang.

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

Med datatyper:

```
type VareType = { vare: { navn: string; pris: number } };

function Vare({ vare }: VareType) {
  return (
    <h2>
      Vare {vare.navn} koster {vare.pris} kr.
    </h2>
  );
}

export default function Home() {
  const v = { navn: "Hakke", pris: 50.0 };
  return (
    <div>
      <Vare vare={v} />
    </div>
  );
}
```

## 5-8. Opprett "standard Next/React" mappestruktur med routing

Vi får blant annet routing "gratis" ved å utnytte standard mappestruktur:

- Mappe med f.eks. navn faq og fil page.tsx gir side på url /faq
- Legg til "use client" i toppen av alle page.tsx.
- Håndter ukjent URL med not-found.tsx
- Mappestruktur-eksempel:

- app
  - components
    - footer.tsx
    - nav-bar.tsx
  - faq
    - page.tsx
  - page.tsx
  - layout.tsx
  - not-found.tsx
  - globals.css

I nav-bar.tsx, legg til:

```
import Link from "next/link";

<Link href="/faq">FAQ</Link>
```

I layout.tsx, legg til import og "navbar".

## 5-9. Bruke vanlig CSS og/eller Tailwind CSS (eller MUI 5)

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

## 5-10. Fikse "The unknown at rule @tailwind warning" ?

2026: Ser ikke ut til å være nødvendig lenger?

- CTRL + SHIFT + P for åpne kommando-paletten.
- Skriv: Open User Settings (JSON)
- Sett inn følgende nederst i settings.json:

```
"css.lint.unknownAtRules": "ignore"
```

## 5-11. Hva bør du kunne om JavaScript for å bruke React?

https://www.w3schools.com/react/react_es6.asp
