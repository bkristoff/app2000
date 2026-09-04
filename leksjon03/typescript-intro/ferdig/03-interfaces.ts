// ============================================
// 3. Interface og type-alias – beskriv formen på data
// ============================================

interface Bruker {
  id: number;
  navn: string;
  epost: string;
  alder?: number; // valgfritt felt
  readonly opprettet: Date; // kan ikke endres etter at objektet er laget
}

const ada: Bruker = {
  id: 1,
  navn: "Ada Lovelace",
  epost: "ada@example.com",
  opprettet: new Date(),
};

// ada.opprettet = new Date(); // ❌ Cannot assign to 'opprettet' because it is read-only

// `type` kan gjøre mye av det samme – og litt til
type Punkt = { x: number; y: number };
type Id = number | string; // union: enten tall eller tekst

function avstand(a: Punkt, b: Punkt): number {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

// Interfaces kan bygge videre på hverandre
interface Ansatt extends Bruker {
  avdeling: string;
  lonn: number;
}

const alan: Ansatt = {
  id: 2,
  navn: "Alan Turing",
  epost: "alan@example.com",
  opprettet: new Date(),
  avdeling: "Forskning",
  lonn: 650000,
};

const brukerId: Id = "abc-123";

console.log(ada.navn);
console.log(avstand({ x: 0, y: 0 }, { x: 3, y: 4 })); // 5
console.log(`${alan.navn} jobber i ${alan.avdeling}`);
console.log("Bruker-id:", brukerId);

export {}; // gjør fila til en modul – kan ignoreres i demoen
