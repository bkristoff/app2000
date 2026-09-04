// ============================================
// 4. Union-typer og "narrowing" (innsnevring)
// ============================================

// En verdi som kan være én av flere typer
type Resultat = number | string;

function beskriv(verdi: Resultat): string {
  // TypeScript snevrer inn typen basert på sjekkene dine
  if (typeof verdi === "number") {
    return `Tallet ${verdi.toFixed(2)}`; // her vet TS at verdi er number
  }
  return `Teksten "${verdi.toUpperCase()}"`; // her må det være string
}

// Literal-typer: bare bestemte verdier er lov
type Retning = "nord" | "sor" | "ost" | "vest";

function gaa(retning: Retning): void {
  console.log(`Går mot ${retning}`);
}

gaa("nord");
// gaa("opp"); // ❌ Argument of type '"opp"' is not assignable to parameter of type 'Retning'

// Diskriminert union – et vanlig og kraftig mønster
interface Sirkel {
  form: "sirkel";
  radius: number;
}
interface Rektangel {
  form: "rektangel";
  bredde: number;
  hoyde: number;
}
type Figur = Sirkel | Rektangel;

function areal(figur: Figur): number {
  switch (figur.form) {
    case "sirkel":
      return Math.PI * figur.radius ** 2;
    case "rektangel":
      return figur.bredde * figur.hoyde;
  }
}

console.log(beskriv(3.14159)); // Tallet 3.14
console.log(beskriv("typescript")); // Teksten "TYPESCRIPT"
console.log(areal({ form: "sirkel", radius: 2 }).toFixed(2)); // 12.57
console.log(areal({ form: "rektangel", bredde: 3, hoyde: 4 })); // 12

export {}; // gjør fila til en modul – kan ignoreres i demoen
