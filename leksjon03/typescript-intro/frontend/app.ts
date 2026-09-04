// ============================================
// Frontend-demo: en oppgaveliste i nettleseren
// Poeng: TypeScript kjenner DOM-et og hjelper deg
// mot null-verdier, feil elementtyper og skrivefeil.
// ============================================

// --- Datamodell ------------------------------------------------

interface Oppgave {
  id: number;
  tittel: string;
  ferdig: boolean;
}

// Bare disse tre verdiene er lov som filter
type Filter = "alle" | "aktive" | "ferdige";

// --- Hjelpefunksjon: hent et element og garanter at det finnes -

function krev<T extends Element>(selector: string): T {
  const el = document.querySelector<T>(selector);
  if (el === null) {
    throw new Error(`Fant ikke noe element som passer "${selector}"`);
  }
  return el;
}

// --- DOM-referanser (med riktig type) -------------------------

const skjema = krev<HTMLFormElement>("#nytt-skjema");
const tekstfelt = krev<HTMLInputElement>("#ny-tittel");
const liste = krev<HTMLUListElement>("#liste");
const teller = krev<HTMLParagraphElement>("#teller");
const filterKnapper = document.querySelectorAll<HTMLButtonElement>(".filter");

// --- Tilstand ------------------------------------------------

const LAGER_NOKKEL = "ts-demo-oppgaver";
let oppgaver: Oppgave[] = lastFraLager();
let aktivtFilter: Filter = "alle";

// --- Lagring i nettleseren ---------------------------------

function lagre(): void {
  localStorage.setItem(LAGER_NOKKEL, JSON.stringify(oppgaver));
}

function lastFraLager(): Oppgave[] {
  const raatekst = localStorage.getItem(LAGER_NOKKEL);
  if (raatekst === null) return [];

  // JSON.parse gir `any` – vi vet ikke hva som ligger i localStorage,
  // så vi validerer hvert element før vi stoler på det.
  const data: unknown = JSON.parse(raatekst);
  if (!Array.isArray(data)) return [];

  return data.filter(
    (o): o is Oppgave =>
      typeof o === "object" &&
      o !== null &&
      typeof o.id === "number" &&
      typeof o.tittel === "string" &&
      typeof o.ferdig === "boolean",
  );
}

// --- Operasjoner på lista ---------------------------------

function leggTil(tittel: string): void {
  const trimmet = tittel.trim();
  if (trimmet === "") return;
  oppgaver.push({ id: Date.now(), tittel: trimmet, ferdig: false });
  lagre();
  tegn();
}

function veksleFerdig(id: number): void {
  const oppgave = oppgaver.find((o) => o.id === id);
  if (!oppgave) return;
  oppgave.ferdig = !oppgave.ferdig;
  lagre();
  tegn();
}

function slett(id: number): void {
  oppgaver = oppgaver.filter((o) => o.id !== id);
  lagre();
  tegn();
}

function synligeOppgaver(): Oppgave[] {
  switch (aktivtFilter) {
    case "aktive":
      return oppgaver.filter((o) => !o.ferdig);
    case "ferdige":
      return oppgaver.filter((o) => o.ferdig);
    case "alle":
      return oppgaver;
  }
}

// --- Tegn lista på nytt ----------------------------------

function tegn(): void {
  liste.replaceChildren();

  for (const oppgave of synligeOppgaver()) {
    const li = document.createElement("li");
    if (oppgave.ferdig) li.classList.add("ferdig");

    const avkryssing = document.createElement("input");
    avkryssing.type = "checkbox";
    avkryssing.checked = oppgave.ferdig;
    avkryssing.addEventListener("change", () => veksleFerdig(oppgave.id));

    const tittel = document.createElement("span");
    tittel.textContent = oppgave.tittel;

    const slettKnapp = document.createElement("button");
    slettKnapp.type = "button";
    slettKnapp.className = "slett";
    slettKnapp.textContent = "Slett";
    slettKnapp.addEventListener("click", () => slett(oppgave.id));

    li.append(avkryssing, tittel, slettKnapp);
    liste.append(li);
  }

  const gjenstar = oppgaver.filter((o) => !o.ferdig).length;
  teller.textContent =
    oppgaver.length === 0
      ? "Ingen oppgaver ennå"
      : `${gjenstar} av ${oppgaver.length} gjenstår`;
}

// --- Hendelser ------------------------------------------

skjema.addEventListener("submit", (e: SubmitEvent) => {
  e.preventDefault(); // hindre at siden lastes på nytt
  leggTil(tekstfelt.value);
  tekstfelt.value = "";
  tekstfelt.focus();
});

filterKnapper.forEach((knapp) => {
  knapp.addEventListener("click", () => {
    // dataset-verdier er alltid `string | undefined` – må sjekkes
    const verdi = knapp.dataset.filter;
    if (verdi === "alle" || verdi === "aktive" || verdi === "ferdige") {
      aktivtFilter = verdi; // her er `verdi` innsnevret til Filter
      filterKnapper.forEach((k) => k.classList.toggle("valgt", k === knapp));
      tegn();
    }
  });
});

// --- Start ---------------------------------------------

tegn();
