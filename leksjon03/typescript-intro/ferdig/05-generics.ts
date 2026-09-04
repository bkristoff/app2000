// ============================================
// 5. Generics – gjenbrukbar kode som beholder typene
// ============================================

// Uten generics måtte vi laget én funksjon per type.
// <T> er en "type-variabel" som fylles inn når funksjonen kalles.
function forste<T>(liste: T[]): T | undefined {
  return liste[0];
}

const f1 = forste([10, 20, 30]); // type: number | undefined
const f2 = forste(["a", "b", "c"]); // type: string | undefined

// Flere typeparametere
function par<A, B>(a: A, b: B): [A, B] {
  return [a, b];
}

// Begrensning (constraint) med `extends`: T må ha et length-felt
interface HarLengde {
  length: number;
}
function lengste<T extends HarLengde>(a: T, b: T): T {
  return a.length >= b.length ? a : b;
}

// Generisk klasse – en "boks" som kan holde hva som helst
class Boks<T> {
  constructor(private innhold: T) {}
  hent(): T {
    return this.innhold;
  }
  bytt(nytt: T): void {
    this.innhold = nytt;
  }
}

console.log(f1, f2);
console.log(par("alder", 36)); // ["alder", 36]
console.log(lengste("kort", "mye lengre tekst")); // mye lengre tekst
console.log(lengste([1, 2], [1, 2, 3, 4])); // [1, 2, 3, 4]

const tallboks = new Boks<number>(42);
console.log(tallboks.hent()); // 42
tallboks.bytt(100);
console.log(tallboks.hent()); // 100

export {}; // gjør fila til en modul – kan ignoreres i demoen
