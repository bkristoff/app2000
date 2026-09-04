// ============================================
// 1. Typer og type-inferens
// ============================================

// TODO: Lag tre variabler UTEN type-annotasjon og la TypeScript gjette:
//   navn = "Ada", alder = 36, erStudent = true
//   Hold musepekeren over variablene for å se typen.

// TODO: Prøv å gjøre `navn = 42` og se feilmeldingen.

// TODO: Lag variabler MED eksplisitt type:
//   poeng: number = 0
//   melding: string (deklarer først, sett verdi på neste linje)

// TODO: Lag et number[]-array `tall` og et string[]-array `navnListe`.

// TODO: Lag en tuple `koordinat: [number, number]` med [59.91, 10.75].

// TODO: Lag et objekt `bok` med typen { tittel: string; sider: number }.

// TODO: Lag en `any`-variabel og en `unknown`-variabel.
//   Vis at `unknown` krever en typeof-sjekk før du kan kalle .toUpperCase().

function hentData(): unknown {
  return "noe data";
}

// TODO: console.log ut verdiene så vi ser at koden kjører.

export {}; // gjør fila til en modul – kan ignoreres i demoen
