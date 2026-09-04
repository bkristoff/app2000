// ============================================
// 2. Funksjoner
// ============================================

// Parametere og returtype har typer
function leggSammen(a: number, b: number): number {
  return a + b;
}

// Returtypen kan utledes – her blir den string
function hils(navn: string) {
  return `Hei, ${navn}!`;
}

// `void` = funksjonen returnerer ingen verdi
function logg(tekst: string): void {
  console.log(`[LOGG] ${tekst}`);
}

// Valgfrie parametere med `?`
function lagBruker(navn: string, alder?: number): string {
  return alder === undefined ? `${navn} (alder ukjent)` : `${navn} (${alder} år)`;
}

// Standardverdier
function potens(grunntall: number, eksponent: number = 2): number {
  return grunntall ** eksponent;
}

// En funksjon kan også være en type – her en pilfunksjon
const doble: (x: number) => number = (x) => x * 2;

console.log(leggSammen(2, 3)); // 5
console.log(hils("Ada")); // Hei, Ada!
logg("Kjører eksempel 2");
console.log(lagBruker("Alan")); // Alan (alder ukjent)
console.log(lagBruker("Grace", 45)); // Grace (45 år)
console.log(potens(3)); // 9
console.log(potens(2, 10)); // 1024
console.log(doble(21)); // 42

export {}; // gjør fila til en modul – kan ignoreres i demoen
