// ============================================
// 4. Union-typer og "narrowing" (innsnevring)
// ============================================

// TODO: Lag `type Resultat = number | string`.

// TODO: Skriv `beskriv(verdi: Resultat): string`.
//   Bruk `if (typeof verdi === "number")` og vis at TS da lar deg kalle .toFixed(2).
//   I else-grenen er verdi en string -> .toUpperCase().

// TODO: Lag `type Retning = "nord" | "sor" | "ost" | "vest"` (literal-union).
//   Skriv `gaa(retning: Retning): void`. Prøv gaa("opp") og se feilen.

// TODO: Lag en diskriminert union:
//   interface Sirkel   { form: "sirkel";   radius: number }
//   interface Rektangel { form: "rektangel"; bredde: number; hoyde: number }
//   type Figur = Sirkel | Rektangel
//   Skriv `areal(figur: Figur): number` med switch på figur.form.

// TODO: console.log beskriv(3.14159), beskriv("typescript") og areal(...) for begge former.

export {}; // gjør fila til en modul – kan ignoreres i demoen
