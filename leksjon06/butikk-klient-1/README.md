# Lage butikk-klient-2 (versjon 2 av nettbutikken)

Vi har nå en React webapplikasjon med to undersider, men vi må selv gå til undersidene ved å skrive inn URL'ene.

Vi løser dette først (navigering) og så bygger vi ut nettbutikken med visning av varer.

## 1. Sjekk at løsningen fungerer

Noen av undermappene i et Next/React-prosjekt kan genereres automatisk. Før opplasting til GitHub slettet jeg undermappene .git, .next og node_modules samt filen package-lock.js. For å teste må du derfor skrive inn følgende kommandoer, som først laster ned relevante biblioteker, gjenoppretter mappene som er slettet og deretter starter opp serveren og kjører applikasjonen:

```
npm install
npm run dev
```

Nå kan du åpne nettleseren på adresse: http://localhost:3000

Hvis du vil jobbe med Git i dette prosjektet, så må du i tillegg kjøre git init som forklart i leksjon 4.

## 2. Bygg ut nettbutikken med navigering (routing)

Mye av jobben er gjort fordi vi allerede har laget undersider "om" og "faq" med filer som heter page.js.

- Det mangler bare å lenke til undersidene fra navbar-en; det gjør vi ved å redigere app/components/nav-bar.js:

```
import Link from "next/link";

export default function NavBar() {
  return (
    <div>
      <Link href="/">Hjem</Link> &nbsp;&#9734;&nbsp;
      <Link href="/butikk">Butikk</Link> &nbsp;&#9734;&nbsp;
      <Link href="/faq">FAQ</Link> &nbsp;&#9734;&nbsp;
      <Link href="/om">Om</Link>
    </div>
  );
}
```

## 3. Lag dummy-variant av Butikk-komponenten

I nav-bar'en blir det nå lenket til nettadressen /butikk, men den har vi ennå ikke laget.

Lage en dummy-variant av denne Butikk-komponenten nå. (Tanken er altså at "/" er en landingside med selve nettbutikken på underside /butikk.) Butikksiden skal vise tre hjelpekomponenter Innlogging, Bestilling og Handlekurv, som alle kan legges under app/components og bare vise en tekst a la "Her er innlogging.". Filer:

```
app/butikk/page.js
app/component/innlogging.js
app/components/bestilling.js
app/component/handlekurv.js
```

For at Butikk-komponenten skal kunne vise fram de tre andre komponentene, må den få noen import-setninger i toppen:

```
import Innlogging from "../components/innlogging.js";
import Bestilling from "../components/bestilling.js";
import Handlekurv from "../components/handlekurv.js";
```

## 4. Lag dummy-komponenter for visning av varelager

Legg også til filer for visning av en enkelt vare og for en liste med varer.

```
app/components/vare.js
app/component/vareliste.js
```

I første omgang kan Vare være en hardkodet komponent som viser fram varenummer, navn og pris på en konkret vare, og Vareliste kan vise fram tre "kopier" av denne ene dummy-Vare-komponenten.

Sørg for at varelisten blir vist nederst i butikk-komponenten.

## 5. Simulere JSON-data fra databasen

Utvid Butikk-komponenten med en variabel varer som holder på en tabell (array) med vare-objekter (som vi kan tenke oss kommer fra databasen på JSON-format, se leksjon 2):

```
let varer = [
  { VNr: "10820", Betegnelse: "Hakke", Pris: 99.5 },
  { VNr: "10830", Betegnelse: "Spett", Pris: 430.5 }
];
```

Send denne tabellen med som props-parameter til Vareliste. Vareliste bør "loope" gjennom tabellen og sende hvert enkelt vare-objekt som props-parameter til Vare, f.eks. med map-funksjonen slik:

```
{varer.map((vare) => (
  <Vare
    key={vare.VNr}
    vnr={vare.VNr}
    betegnelse={vare.Betegnelse}
    pris={vare.Pris}
  />
))}
```

Utvid Vare med tilsvarende props-parametre:

```
const Vare = ({ vnr, betegnelse, pris }) => { ... }
```

Og bruk vnr, betegnelse og pris i JSX-delen av Vare (husk klammeparenteser rundt variabelnavnene).

## 6. Bruk grid-systemet til Material UI for å presentere varelageret

Avslutt serveren med CTRL-C og YES i terminalvinduet.

Installer Material UI, se https://www.npmjs.com/package/@mui/material , og start serveren igjen:

```
npm install @mui/material @emotion/react @emotion/styled
npm run dev
```

I Vareliste, legge til import og omslutt løkka som viser Vare-komponentene med en <Grid>:

```
import Grid from "@mui/material/Grid";
...
<Grid container spacing={2}>...</Grid>
```

I Vare, legg til import og omslutt presentasjonen av varen med en <Grid>.

- Bruk attributt size og xs, sm og md for å lage en presentasjon som tilpasser seg forskjellige skjermstørrelser.
- (Se lignende teknikk for Bootstrap-oppgave i en tidligere leksjon...)

```
import Grid from "@mui/material/Grid";
...
<Grid size={{ xs: 12, sm: 6, md: 4 }}>...</Grid>
```

## 7. Legg til stilregler

Legg til regler i app/globals.css som endrer litt på nav-bar, footer og "vare-bokser".

```
nav {
  background-color: #ccccee;
}

.boks {
  padding: 3px;
  border: 2px solid #3333aa;
  background-color: #aaaaff;
  border-radius: 10px;
}

.footer {
  margin: auto;
  width: 40%;
}
```

Man må samtidig gjøre noen mindre endringer i tilhørende JSX-kode for å få reglene til å slå inn.

- Tips: Legg til attributt className, f.eks.:

```
<div className="boks">
```
