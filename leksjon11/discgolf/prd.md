# Product Requirement Document: Discgolf Webapp

## 1. Produktbeskrivelse

Discgolf Webapp er en enkel og brukervennlig webapplikasjon som lar brukere gjennomføre en discgolf-runde i grupper på 3-4 spillere. Appen gir spillerne mulighet til å registrere antall kast for hver spiller på hver kurv, og viser total score for hver spiller ved slutten av runden. Målet er å gjøre det enkelt å holde oversikt over poeng under en discgolf-runde uten behov for papir eller andre verktøy.

## 2. Mål og målgruppe

### Mål

- Gi en enkel og effektiv løsning for å registrere og holde oversikt over poeng i discgolf.
- Forbedre brukeropplevelsen ved å automatisere poengberegning og presentere resultater i sanntid.
- Gjøre det enkelt å spille discgolf i grupper uten behov for papir eller andre manuelle metoder.

### Målgruppe

- Discgolf-entusiaster som spiller i små grupper (3-4 spillere).
- Nybegynnere og erfarne spillere som ønsker en enkel måte å holde oversikt over poeng på.

## 3. Brukerhistorier

### Funksjonelle krav

1. Som en bruker vil jeg kunne legge til navnene på spillerne i gruppen slik at jeg kan holde oversikt over hvem som spiller.
2. Som en bruker vil jeg kunne velge antall kurver i runden (standard: 18) slik at jeg kan tilpasse runden til banen vi spiller på.
3. Som en bruker vil jeg kunne registrere antall kast for hver spiller på hver kurv slik at jeg kan holde oversikt over poengene underveis.
4. Som en bruker vil jeg kunne se total score for hver spiller oppdatert i sanntid slik at jeg alltid vet hvem som leder.
5. Som en bruker vil jeg kunne se en oppsummering av total score for hver spiller etter runden slik at jeg kan se hvem som vant.
6. Som en bruker vil jeg kunne tilbakestille runden og starte en ny runde slik at jeg kan spille flere runder uten å måtte laste inn siden på nytt.

### Ikke-funksjonelle krav

1. Som en bruker vil jeg at appen skal være responsiv slik at jeg kan bruke den på mobil, nettbrett og desktop.
2. Som en bruker vil jeg at appen skal ha et enkelt og intuitivt brukergrensesnitt slik at jeg raskt kan forstå hvordan jeg bruker den.
3. Som en bruker vil jeg at data skal lagres midlertidig i nettleseren (f.eks. ved hjelp av `localStorage`) slik at jeg ikke mister data hvis jeg oppdaterer siden ved et uhell.
4. Som en bruker vil jeg at appen skal være rask og responsiv slik at jeg slipper å vente på at den skal laste.
5. Som en bruker vil jeg at appen skal fungere uten internettforbindelse slik at jeg kan bruke den på steder uten dekning.
6. Som en bruker vil jeg at appen skal være enkel å distribuere og bruke uten installasjon slik at jeg kan dele den med andre spillere.

## 4. Akseptansekriterier

- Brukeren kan legge til 3-4 spillere og velge antall kurver.
- Brukeren kan registrere antall kast for hver spiller på hver kurv.
- Appen viser total score for hver spiller i sanntid.
- Resultatskjermen viser en oppsummering og markerer vinneren.
- Brukeren kan tilbakestille runden og starte en ny runde.

## 5. Teknologivalg

- Frontend: HTML, CSS, JavaScript
- Frontend-rammeverk: React (valgfritt, avhengig av prosjektets kompleksitet)
- Backend: Ingen backend nødvendig (data lagres lokalt i nettleseren)
- Styling: CSS eller Tailwind CSS
- Distribusjon: Netlify eller Vercel for enkel hosting

## 6. Brukerflyt

### 6.1 Oppstart

1. Brukeren åpner appen i nettleseren.
2. Brukeren legger til navnene på spillerne (3-4 spillere).
3. Brukeren velger antall kurver (standard: 18).

### 6.2 Under runden

1. For hver kurv registrerer brukeren antall kast for hver spiller.
2. Appen oppdaterer total score for hver spiller i sanntid.

### 6.3 Etter runden

1. Når alle kurver er fullført, viser appen en oppsummering av total score for hver spiller.
2. Spilleren med lavest score markeres som vinner.

### 6.4 Tilbakestilling

1. Brukeren kan tilbakestille runden og starte en ny runde.

## 7. Brukergrensesnitt

- Startskjerm:
  - Input-felt for å legge til spillernavn.
  - Valg for antall kurver (standard: 18).
  - Start-knapp for å begynne runden.
- Rundeskjerm:
  - Liste over kurver (1-18).
  - Input-felt for å registrere antall kast for hver spiller på hver kurv.
  - Total score for hver spiller oppdateres i sanntid.
- Resultatskjerm:
  - Oppsummering av total score for hver spiller.
  - Markering av vinneren.
  - Knapp for å starte en ny runde.

## 8. Teknisk spesifikasjon

### 8.1 Datarepresentasjon

- Spillere:
  ```javascript
  const players = [
    { name: "Spiller 1", scores: [3, 4, 5], total: 12 },
    { name: "Spiller 2", scores: [4, 3, 4], total: 11 },
  ];
  ```
