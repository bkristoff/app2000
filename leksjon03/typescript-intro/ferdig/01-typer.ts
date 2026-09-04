// ============================================
// 1. Typer og type-inferens
// ============================================

// TypeScript kan ofte gjette typen selv (inferens)
let navn = "Ada"; // string
let alder = 36; // number
let erStudent = true; // boolean

// navn = 42; // ❌ Type 'number' is not assignable to type 'string'

// Eksplisitte type-annotasjoner
let poeng: number = 0;
let melding: string;
melding = "Hei på deg";

// Arrays
const tall: number[] = [1, 2, 3];
const navnListe: string[] = ["Ada", "Alan", "Grace"];

// Tuple – array med fast lengde og faste typer per plass
const koordinat: [number, number] = [59.91, 10.75];

// Objekt – typen beskriver hvilke felt som finnes
const bok: { tittel: string; sider: number } = {
  tittel: "Clean Code",
  sider: 464,
};

// `any` slår av type-sjekking – bruk helst noe annet
let hvaSomHelst: any = "kan være alt";
hvaSomHelst = 123;

// `unknown` er en tryggere variant: du må sjekke typen før du bruker verdien
const ukjent: unknown = hentData();
if (typeof ukjent === "string") {
  console.log(ukjent.toUpperCase()); // OK – vi har bevist at det er en string
}

function hentData(): unknown {
  return "noe data";
}

console.log(navn, alder, erStudent);
console.log(koordinat, bok, poeng, melding);
console.log(tall, navnListe);

export {}; // gjør fila til en modul – kan ignoreres i demoen
