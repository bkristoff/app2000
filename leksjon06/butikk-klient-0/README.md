# Lage butikk-klient-1 (versjon 1 av nettbutikken)

På øvingen (+ litt ekstra selvstudier) skal du bygge opp brukergrensesnittet til en nettbutikk (for Hobbyhuset) ved hjelp av React.

Utgangspunktet er en samling av "snapshots" av prosjektet, fra tom versjon 0 til ferdig versjon 4.

I hver versjon finner du en README.md fil med tips til hvordan du kommer deg til neste versjon. Her er veien til versjon 1.

## 1. Sjekk at Node.js og npm er installert

Kjør fra terminalvinduet i VS Code:

```
node --version
npm --version
```

## 2. Lag "tom" versjon 0

Åpne VS Code på mappen _over_ der du vil lage prosjektet og kjør npx-kommandoen:
- Merk "No" på Turbopack (dette bør vi trolig endre etter hvert...)

```
npx create-next-app butikk-klient-0
- Would you like to use TypeScript? ... No
- Would you like to use ESLint? ... Yes
- Would you like to use Tailwind CSS? ... No
- Would you like to use `src/` directory? ... No
- Would you like to use App Router? (recommended) ...  Yes
- Would you like to use Turbopack? (recommended) ... No
- Would you like to customize the default import alias (@/*)? ... No
```

## 3. Bygg og kjør applikasjonen

Åpne mappen butikk-klient-0 i VS Code.

- Start utvikler-serveren:

```
npm run dev
```

Åpne nettleseren på http://localhost:3000

## 4. Slett genererte mapper/filer

Undersøk hvor mye plass prosjektet tar på disken.

Slett mappene .next og node_modules (og evt. .git), samt filen package-lock.json.

Undersøk hvor mye plass prosjektet tar på disken nå.

Last ned hjelpebiblioteker og bygg prosjektet på nytt:

```
npm install
npm run dev
```

Sjekk at applikasjonen kjører i nettleseren.

## 5. Forenkle app/page.js

```
export default function Home() {
  return (
    <main>
      <h1>Hobbyhuset</h1>
	  <p>Dette er landingssiden til Hobbyhuset.</p>
    </main>
  )
}
```

Frisk opp nettleseren!

## 6. Legg til filer med dummy-innhold

- Legg til app/components/nav-bar.js
- Legg til app/components/footer.js
- Legg til app/faq/page.js
- Legg til app/om/page.js
- Legg til app/not-found.js

Eksempel i app/faq/page.js:

```
export default function Faq() {
  return (
    <>
      <h1>FAQ</h1>
      <p>Svar på vanlige spørsmål.</p>
    </>
  );
}
```

Legg til "use client" i toppen av alle page.js.

## 7. Forenkle app/layout.js

```
import "./globals.css";
import NavBar from "./components/nav-bar.js";
import Footer from "./components/footer.js";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <NavBar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
```

## 8. Forenkle globals.css

```
h1 {
  color: blue;
}
```

Slett fil page.module.css (den er sikkert nyttig og bør nok brukes, men ikke i dette eksemplet.)

## 9. Slette standard fonter/stiler

Slett mappe fonts (igjen, den er nok nyttig og noe av poenget med et rammeverk er at man følger "oppsettet", men den blir ikke brukt i nettbutikken, så jeg prioriterte ikke å tilpasse eksemplet med denne biten.)

## 10. Legge til bilde

Kopier bildefilen logo.JPG fra denne mappen til public-mappen i butikk-klient-1.

Lenk til bildet fra footer.js:

```
import Image from "next/image";
import logo from '../../public/logo.JPG';

<Image src={logo} alt="logo" width="220" height="auto" priority="true" />
```

## 11. Fiks "The unknown at rule @tailwind warning"

Usikker på om dette punktet fortsatt er nyttig, vent gjerne til du eventuelt får advarselen.

- CTRL + SHIFT + P for å åpne kommando-paletten.
- Skriv: Open User Settings (JSON) i søkefeltet øverst.
- Sett inn følgende nederst i settings.json (rett før avsluttende } + husk komma på linjen over):

```
"css.lint.unknownAtRules": "ignore"
```

## 12. Teste løsningen

Åpne nettleseren på følgende adresser:

- http://localhost:3000
- http://localhost:3000/om
- http://localhost:3000/faq

Vi har altså en React webapplikasjon med to undersider.

## 13. Veien videre ...

Du kan nå åpne butikk-versjon-1 som du lastet ned fra Canvas og følge tipsene i README.md for å lage versjon 2.

Din egen butikk-app skal i teorien være lik med butikk-versjon-1, så det er også mulig å bare jobbe videre med den.
