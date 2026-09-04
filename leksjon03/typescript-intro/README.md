# Innføring i TypeScript

Kodeeksempler til en kort introduksjon til TypeScript.

Alt er generert av Claude (også mesteparten av det som står i denne README-filen), basert på instruksene i claude.md.

Merk at TypeScript-eksemplene må kjøres på en litt annen måte enn tilsvarende JavaScript-løsninger.

## Mappestruktur

| Mappe       | Innhold                                                                                              |
| ----------- | ---------------------------------------------------------------------------------------------------- |
| `ferdig/`   | De komplette eksemplene – fasit.                                                                     |
| `start/`    | Samme filer, men koden er byttet ut med `// TODO`-kommentarer. Brukes til live-koding i timen.       |
| `frontend/` | Praktisk demo: TypeScript i frontend av en webapp (HTML + CSS + én TS-fil). Se `frontend/README.md`. |

Eksemplene bygger på hverandre og tar ca. 3–5 minutter hver:

1. **01-typer** – type-inferens, eksplisitte typer, arrays, tuple, `any` vs `unknown`
2. **02-funksjoner** – parameter- og returtyper, `void`, valgfrie parametere, standardverdier
3. **03-interfaces** – `interface`, `type`, `readonly`, valgfrie felt, `extends`
4. **04-union-narrowing** – union-typer, literal-typer, `typeof`-innsnevring, diskriminert union
5. **05-generics** – generiske funksjoner og klasser, `extends`-begrensninger
6. **06-klasser** – `private`/`readonly`, getters, `abstract`, arv, `implements`
7. **07-praktisk-eksempel** – en liten oppgaveliste som knytter det hele sammen

## Kjøre eksemplene

```bash
npm install

# type-sjekk alt (ingen filer skrives)
npm run typecheck

# kjør ett ferdig eksempel (1–7)
npm run 1
npm run 7
```

Trenger du bare å se typene? Åpne en fil i VS Code og hold musepekeren over
variablene – da vises den utledede typen.

## Frontend-demoen

```bash
npm run frontend:build     # kompilerer frontend/app.ts -> frontend/app.js
npm run frontend:serve     # åpne adressen som vises i nettleseren
```

Full forklaring i [frontend/README.md](frontend/README.md).

## Tips til live demo

- Start i `start/`-fila, ha `ferdig/`-fila som fasit ved siden av.
- Skriv med vilje en feil (`let navn: string = 42`) og vis feilmeldingen.
- Bruk autofullføring til å vise at editoren kjenner feltene på et objekt.
- `// @ts-expect-error` kan brukes over linjer som med vilje skal feile.
