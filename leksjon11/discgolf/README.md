# Kopilot-eksperiment: Discgolf Webapp

Man får mer ut av KI og kopiloter hvis man gir dem litt "kontekst" og legger arbeid i gode prompter. En vanlig måte å jobbe på er å beskrive arkitektur/teknologi-valg i en egen md-fil (markdown) med navn .copilot, og samle krav til applikasjonen som brukerhistorier i en "project requirement document" fil, gjerne også på markdown-format. Her heter denne prd.md.

Jeg valgte en forenklet versjon av fjorårets APP2000-oppgave som case, men begrenset meg til en frontend-løsning. Jeg startet med å beskrive discgolf-appen med noen få setninger (kort om funksjonalitet og hva slags teknologi jeg ville bruke) og ba SIKT KI om å generere forslag til de to filene .copilot og prd.md. Jeg leste gjennom og gjorde noen få endringer. (I etterkant ser jeg at SIKT KI ikke satt opp brukerhistorier på det formatet vi har lagt opp til, men det kunne jeg sikkert spurt om.)

Jeg opprettet deretter mappen discgolf, lagret de to "krav-filene" her og ba GitHub Copilot om å bygge applikasjonen. Jeg hadde satt opp Copilot i "agent mode" med GPT-5. Resultatet ser du her: En enkel, responsiv webapp for å føre poeng for discgolf i grupper på 3–4 spillere. Bygget med React og Vite, og lagrer tilstanden lokalt i nettleseren.

Koden ser ut til å fungere, de automatiserte testene feilet (jeg "forsket" ikke noe mer på dette, så ut til å være noen pakker som manglet).

## Funksjoner

- Spillere: legg til 3–4 spillere med navn
- Kurver: velg antall kurver (standard 18)
- Poeng: registrer antall kast per spiller per kurv
- Live totaler: summen oppdateres i sanntid
- Resultater: oppsummering og vinner (lavest score)
- Tilbakestilling: start ny runde uten å laste siden
- Persistens: lagres i `localStorage`
- Offline: enkel service worker for kjernefiler

## Kjøre appen lokalt

Vanlig prosedyre:

```
cd discgolf
npm install
npm run dev
```

Åpne URL i nettleseren, typisk: `http://localhost:5173`

## Teknologi og retningslinjer

- React og Vite
- Moderne JS-syntaks (ES6+, ES modules), korte kommentarer og JSDoc på nyttefunksjoner
- Tester: Vitest + React Testing Library
- Ingen backend; data lagres lokalt

## Struktur

- `index.html` – app-rot
- `src/App.jsx` – hovedkomponent med visninger
- `src/components/*` – skjermkomponenter
- `src/utils/score.js` – rene beregningsfunksjoner
- `src/styles.css` – enkel, responsiv styling
- `public/manifest.json` – PWA manifest
- `src/sw.js` – enkel service worker
