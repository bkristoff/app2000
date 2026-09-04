// ============================================
// 5. Generics – gjenbrukbar kode som beholder typene
// ============================================

// TODO: Skriv `forste<T>(liste: T[]): T | undefined` som returnerer liste[0].
//   Kall den med et number-array og et string-array, og pek på returtypen.

// TODO: Skriv `par<A, B>(a: A, b: B): [A, B]`.

// TODO: Lag `interface HarLengde { length: number }`.
//   Skriv `lengste<T extends HarLengde>(a: T, b: T): T`
//   som returnerer den med størst .length. Test med strenger OG arrays.

// TODO: Lag en generisk klasse `Boks<T>`:
//   - constructor(private innhold: T)
//   - hent(): T
//   - bytt(nytt: T): void

// TODO: Lag `new Boks<number>(42)`, hent(), bytt(100), hent() – og console.log underveis.

export {}; // gjør fila til en modul – kan ignoreres i demoen
