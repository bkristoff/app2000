// ============================================
// 6. Klasser
// ============================================

// TODO: Lag `class Konto`:
//   - private saldo: number
//   - readonly eier: string
//   - constructor(eier: string, startsaldo: number = 0)
//   - settInn(belop): kast Error hvis belop <= 0
//   - taUt(belop): kast Error hvis belop > saldo
//   - get balanse(): number

// TODO: Opprett en konto, settInn(1000), taUt(300), console.log balanse.

// TODO: Lag `abstract class Dyr`:
//   - constructor(protected navn: string)
//   - abstract lagLyd(): string
//   - presenter(): string  ->  "navn sier <lyd>"
//   Lag `class Hund extends Dyr` og `class Katt extends Dyr`.

// TODO: Lag `interface KanKjore { start(): void; stopp(): void }`
//   og `class Bil implements KanKjore`.

// TODO: console.log presenter() for Hund og Katt, og kall bil.start()/bil.stopp().

export {}; // gjør fila til en modul – kan ignoreres i demoen
