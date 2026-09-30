# Installere React med Vite

Vite er et byggeverktøy for React (i motsetning til Next.js, som er et "rammeverk").

Vite fokuserer på frontend og egner seg godt hvis man vil bruke React mot en separat backend i form av et REST API (som vi skal gjøre).

I forhold til Next.js får vi en litt "lettere" løsning.

Her følger en oppskrift på hvordan du kan bygge en minimal frontend for nettbutikken med Vite:

- Vi lager først en standard React-app for Vite.
- Deretter legger vi til undersider med React Router.

## 1. Installere React med Vite

Det gjøres omtrent som for Next. Stå i mappen over der du vil opprette prosjektet og kjør:

```
npm create vite@latest butikk-klient-vite -- --template react
```

Du får et par spørsmål, svar gjerne som jeg gjorde:

```
Need to install the following packages:
create-vite@9.2.1
Ok to proceed? (y)                 [y]
Which linter to use?               [ESLint]
Install with npm and start now?    [y]
```

En enkel Vite/React-løsning starter opp, typisk på http://localhost:5173/ (portnummeret kan variere).

- Avslutt serveren med CTRL-C.

For å kjøre applikasjonen igjen, åpne et terminalvindu og kjør:

```
cd butikk-klient-vite
npm run dev
```

## 2. Forenkle løsningen

Jeg synes det er lærerikt å skrelle ned den genererte koden til et minimum (første gangen).

1. Stopp serveren med CTLR-C (for å unngå lang dump av feilmeldinger mens vi forenkler).

2. Fjern svg-filer på mappene public og src\assets

3. Forenkle App.css til:

```
h1 {
  color: blue;
}
```

4. Forenkle index.ccc til:

```
* {
  font-family: system-ui, Avenir, Helvetica, Arial, sans-serif;
}
```

5. Forenkle src/App.jsx til:

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

Lagre alle filer, start serveren med npm run dev og sjekk nettleseren (du må muligens friske opp nettleservinduet).

## 3. React Router (declarative mode)

I Next.js kan man styre routing ved å opprette en mappestruktur, med Vite kan man i stedet installere React Router (https://reactrouter.com/start/declarative/installation):

```
npm i react-router
```

Det enkleste er å bruke React Router i "declarative mode" .

- Rediger App.jsx og Layout.jsx som vist under.
- Lag deretter "dummy-versjoner" av alle filene som det blir importert fra.
- Merk at NavBar.jsx og Footer.jsx skal ligge under mappe components og resten under mappe pages.
- Merk også at alle filene er gitt filnavn med jsx-utvidelse.
- I forhold til Next.js, blir altså "undersidene" samlet på mappe pages.

Her er App.jsx:

```
import { BrowserRouter as Router, Routes, Route } from "react-router";
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

Og her er Layout.jsx:

```
import NavBar from "./components/NavBar.jsx";
import Footer from "./components/Footer.jsx";

const Layout = ({ children }) => {
  return (
    <>
      <NavBar />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
```

Legg deretter til navigering i NavBar.jsx:

```
import { Link } from "react-router";

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

Eksempel på dummy-side pages/Om.jsx:

```
const Om = () => {
  return <h1>Om oss</h1>;
};

export default Om;
```
