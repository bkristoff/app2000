// ============================================
// 7. Praktisk eksempel: en liten oppgaveliste
// ============================================

// TODO: Lag `type OppgaveStatus = "ny" | "pagar" | "ferdig"`.

// TODO: Lag `interface Oppgave`:
//   readonly id: number, tittel: string, status: OppgaveStatus, frist?: Date

// TODO: Lag `class OppgaveListe`:
//   - private oppgaver: Oppgave[] = []
//   - private nesteId = 1
//   - leggTil(tittel: string, frist?: Date): Oppgave   (status starter som "ny")
//   - settStatus(id: number, status: OppgaveStatus): void   (kast Error hvis id ikke finnes)
//   - filtrer(status: OppgaveStatus): Oppgave[]
//   - get antall(): number
//   - skrivUt(): void
//       bruk Record<OppgaveStatus, string> for symbolene: ny "[ ]", pagar "[~]", ferdig "[x]"

// TODO: Lag en liste, legg til 3 oppgaver (én med frist),
//   sett #1 til "ferdig" og #2 til "pagar", kall skrivUt()
//   og skriv ut hvor mange som er ferdige av totalt.

export {}; // gjør fila til en modul – kan ignoreres i demoen
