# Installere React med Vite

Vite er et byggeverktøy for React (i motsetning til Next.js, som er et "rammeverk").

Vite fokuserer på frontend og egner seg godt hvis man vil bruke React mot en separat backend i form av et REST API (som vi skal gjøre).

I forhold til Next.js får vi en litt "lettere" løsning.

Her følger en oppskrift på hvordan du kan bygge nettbutikken med Vite:

- Vi lager først en standard React-app for Vite.
- Deretter legger vi til undersider med React Router.
- Og kopierer til slutt inn kode fra "Next nettbutikk-klient" versjon 4.

## 1. Installere React med Vite

Det gjøres omtrent som for Next. Stå i mappen over der du vil opprette prosjektet og kjør:

```
npm create vite@latest butikk-klient-vite -- --template react
```

Du får et par spørsmål, svar gjerne som jeg gjorde:

```
Installere create-vite@8.0.1 ?     [y]
Use rolldown-vite (Experimental)?: [n]
Install with npm and start now?    [y]
```

En enkel Vite/React-løsning starter opp, typisk på http://localhost:5173/ (portnummeret kan variere).

- Avslutt serveren med CTRL-C.

For å kjøre applikasjonen igjen, åpne mappen butikk-klient-vite i VS Code og kjør fra et terminalvindu:

```
npm run dev
```

## 2. Forenkle løsningen

Jeg synes det er lærerikt å skrelle ned den genererte koden til et minimum (første gangen).

1. Fjern svg-filer på mappene public og src\assets

2. Forenkle App.css til:

```
h1 {
  color: blue;
}
```

3. Forenkle index.ccc til:

```
* {
  font-family: system-ui, Avenir, Helvetica, Arial, sans-serif;
}
```

4. Forenkle src/App.jsx til:

```
import "./App.css";

function App() {
  return (
    <div>
      <h1>Vite + React</h1>
    </div>
  );
}

export default App;
```

Lagre alle filer og sjekk nettleseren.

## 3. React Router (declarative mode)

I Next.js kan man styre routing ved å opprette en mappestruktur, med Vite kan man i stedet installere React Router (https://reactrouter.com/start/declarative/installation):

```
npm i react-router
```

Det enkleste er å bruke React Router i "declarative mode" .

Rediger App.jsx som vist under.

- Lag deretter "dummy-versjoner" av alle filene som det blir importert fra.
- Merk at alle filene er gitt filnavn med jsx-utvidelse.
- I forhold til Next.js, blir altså "undersidene" samlet på mappe pages.

```
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Hjem from "./pages/Hjem.jsx";
import Butikk from "./pages/Butikk.jsx";
import Om from "./pages/Om.jsx";
import Faq from "./pages/Faq.jsx";
import NotFound from "./pages/NotFound.jsx";
import Layout from "./Layout.jsx";
import "./App.css";

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Hjem />} />
          <Route path="/butikk" element={<Butikk />} />
          <Route path="/om" element={<Om />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
```

Legg deretter til navigering i NavBar.jsx:

```
import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link to="/">Hjem</Link>
        </li>
        <li>
          <Link to="/butikk">Butikk</Link>
        </li>
        <li>
          <Link to="/om">Om</Link>
        </li>
        <li>
          <Link to="/faq">FAQ</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;

```

## 4. Bruke Tailwind

CSS-biblioteket Tailwind lar seg kombinere med React, enten man bruker Next.js eller Tailwind.

- Først må man installere Tailwind med npm:

```
npm install tailwindcss @tailwindcss/vite
```

Deretter sørger man for at "Tailwind-plugin" blir tatt i bruk ved å redigere styrefilen vite.config.js:

```
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
});
```

Så importerer man Tailwind i index.css:

```
@import "tailwindcss";
```

Til slutt kan man teste ut Tailwind, f.eks. ved å legge til noen stilregler i et avsnitt på landingsiden Hjem.jsx:

```
<p className="text-center text-xl bg-blue-500 text-white p-4">
  Dette er landingsiden.
</p>
```

## 5. Legg til bilde

Kopier bildefilen logo.JPG til mappe src/assets.

Importer deretter logoen i Footer.jsx, f.eks. slik:

```
import logo from "../assets/logo.JPG";

const Footer = () => {
  return (
    <>
      <p>Kontakt oss.</p>
      <img src={logo} alt="Firma logo" className="mx-auto h-12 w-auto" />
    </>
  );
};

export default Footer;
```

## Kopier inn kode fra ferdig Next.js butikk-klient

Løsningen du nå har tilsvarer omtrent Next-løsningen på butikk-klient-2.

- Kopier nå koden fra butikk-klient-4 inn i tilhørende kodefiler for å få få en ferdig Vite-løsning.
- Tenk deretter på om dere vil bruke Next.js eller Vite, og om dere vil bruke Tailwind eller andre CSS-biblioteker.
- Ferdig kode ligger på henholdsvis butikk-klient-vite-2 og butikk-klient-vite-4.

Tips:

- Man må endre filnavn i importer, fra f.eks. vare.js til Vare.jsx.
- Man kan fjerne "use strict" øverst i page-filene.
- Man må legge til noen "Tailwind-regler" for at det visuelle skal komme på plass, se på butikk-klient-vite-4 for noen eksempler (det ligger noen stilregler i index.css og noen i de ulike jsx-filene).
