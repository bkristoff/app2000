// ============================================
// 6. Klasser
// ============================================

class Konto {
  // Tilgangsmodifikatorer: public (standard), private, protected
  private saldo: number;
  readonly eier: string;

  constructor(eier: string, startsaldo: number = 0) {
    this.eier = eier;
    this.saldo = startsaldo;
  }

  settInn(belop: number): void {
    if (belop <= 0) throw new Error("Beløpet må være positivt");
    this.saldo += belop;
  }

  taUt(belop: number): void {
    if (belop > this.saldo) throw new Error("Ikke nok dekning");
    this.saldo -= belop;
  }

  // getter – leses som en egenskap: konto.balanse
  get balanse(): number {
    return this.saldo;
  }
}

const konto = new Konto("Ada");
konto.settInn(1000);
konto.taUt(300);
console.log(`${konto.eier} har ${konto.balanse} kr`); // Ada har 700 kr

// Abstrakt klasse + arv
abstract class Dyr {
  constructor(protected navn: string) {}
  abstract lagLyd(): string;
  presenter(): string {
    return `${this.navn} sier ${this.lagLyd()}`;
  }
}

class Hund extends Dyr {
  lagLyd(): string {
    return "Voff";
  }
}

class Katt extends Dyr {
  lagLyd(): string {
    return "Mjau";
  }
}

console.log(new Hund("Rex").presenter()); // Rex sier Voff
console.log(new Katt("Pus").presenter()); // Pus sier Mjau

// `implements` – klassen lover å oppfylle et interface
interface KanKjore {
  start(): void;
  stopp(): void;
}

class Bil implements KanKjore {
  start(): void {
    console.log("Motoren starter");
  }
  stopp(): void {
    console.log("Motoren stopper");
  }
}

const bil = new Bil();
bil.start();
bil.stopp();

export {}; // gjør fila til en modul – kan ignoreres i demoen
