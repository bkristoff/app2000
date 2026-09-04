// ============================================
// 7. Praktisk eksempel: en liten oppgaveliste
// Setter sammen literal-typer, interface, generics-lignende
// verktøytyper (Record) og klasser.
// ============================================

type OppgaveStatus = "ny" | "pagar" | "ferdig";

interface Oppgave {
  readonly id: number;
  tittel: string;
  status: OppgaveStatus;
  frist?: Date;
}

class OppgaveListe {
  private oppgaver: Oppgave[] = [];
  private nesteId = 1;

  leggTil(tittel: string, frist?: Date): Oppgave {
    const oppgave: Oppgave = {
      id: this.nesteId++,
      tittel,
      status: "ny",
      frist,
    };
    this.oppgaver.push(oppgave);
    return oppgave;
  }

  settStatus(id: number, status: OppgaveStatus): void {
    const oppgave = this.oppgaver.find((o) => o.id === id);
    if (!oppgave) throw new Error(`Fant ingen oppgave med id ${id}`);
    oppgave.status = status;
  }

  filtrer(status: OppgaveStatus): Oppgave[] {
    return this.oppgaver.filter((o) => o.status === status);
  }

  get antall(): number {
    return this.oppgaver.length;
  }

  skrivUt(): void {
    // Record<K, V> = objekt der alle nøklene K må finnes
    const symbol: Record<OppgaveStatus, string> = {
      ny: "[ ]",
      pagar: "[~]",
      ferdig: "[x]",
    };
    for (const o of this.oppgaver) {
      const frist = o.frist ? ` (frist ${o.frist.toLocaleDateString("no-NO")})` : "";
      console.log(`${symbol[o.status]} #${o.id} ${o.tittel}${frist}`);
    }
  }
}

const liste = new OppgaveListe();
liste.leggTil("Lese kapittel 3");
liste.leggTil("Levere øving 2", new Date("2026-09-10"));
liste.leggTil("Forberede presentasjon");

liste.settStatus(1, "ferdig");
liste.settStatus(2, "pagar");

liste.skrivUt();
console.log(`\nFerdige: ${liste.filtrer("ferdig").length} av ${liste.antall}`);

export {}; // gjør fila til en modul – kan ignoreres i demoen
