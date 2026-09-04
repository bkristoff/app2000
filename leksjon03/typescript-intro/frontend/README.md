# Frontend-demo: TypeScript i nettleseren

En liten oppgaveliste som lagrer i `localStorage`. Poenget er å vise hva
TypeScript gir deg når du jobber mot DOM-et:

| I koden                                            | Hva TypeScript fanger                                       |
| ------------------------------------------------- | ---------------------------------------------------------- |
| `krev<HTMLInputElement>("#ny-tittel")`            | `querySelector` kan gi `null` – vi må håndtere det         |
| `tekstfelt.value`                                 | vet at et `HTMLInputElement` har `.value` (en `<div>` har det ikke) |
| `type Filter = "alle" \| "aktive" \| "ferdige"`   | umulig å sette et ugyldig filter                           |
| `knapp.dataset.filter`                            | er `string \| undefined` – tvinger fram en sjekk           |
| `JSON.parse(...)` → `unknown`                     | vi må validere data fra `localStorage` før vi stoler på den |
| `switch (aktivtFilter)`                           | kompilatoren vet at alle tilfeller er dekket               |

## Filer

| Fil          | Rolle                                                    |
| ------------ | ------------------------------------------------------- |
| `index.html` | markup, laster `styles.css` og `app.js`                 |
| `styles.css` | utseende (lys/mørk via `prefers-color-scheme`)          |
| `app.ts`     | **kildekoden** – den vi skriver                          |
| `app.js`     | **generert** av kompilatoren fra `app.ts` – ikke rediger |
| `tsconfig.json` | byggeoppsett for denne mappa                          |

## Slik bygges løsningen

Nettleseren forstår ikke `.ts` – TypeScript må først kompileres til `.js`.

```bash
# fra prosjektroten, én gang:
npm install

# kompiler app.ts -> app.js
npm run frontend:build

# eller: kompiler på nytt automatisk mens du redigerer
npm run frontend:watch
```

`tsconfig.json` styrer byggingen:

- `"target": "ES2020"` – hvilket JavaScript-nivå som genereres
- `"module": "ES2020"` – filen har ingen `import`/`export`, så resultatet
  lastes som et vanlig `<script>` (fungerer også via `file://`)
- `"lib": ["ES2020", "DOM", "DOM.Iterable"]` – gjør at TS kjenner `document`,
  `localStorage` osv.
- `"types": []` – dette er et nettleserprosjekt, ikke Node
- `"strict": true` – alle de strenge sjekkene på

## Slik kjøres den

Åpne `frontend/index.html` direkte i nettleseren, **eller** start en liten
webserver (anbefalt – da virker `localStorage` likt hver gang):

```bash
npm run frontend:serve
# åpne adressen som vises, f.eks. http://localhost:3000
```

## Vanlig neste steg i et ekte prosjekt

`tsc` alene holder for én fil. Så snart du deler koden i flere moduler med
`import`/`export`, bruker de fleste et byggeverktøy som **Vite**
(`npm create vite@latest -- --template vanilla-ts`) eller **esbuild**, som
kompilerer TypeScript og bunter alt til én fil automatisk.
