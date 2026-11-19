// All kommunikasjon med REST API-et (butikk-tjener) er samlet her,
// slik at komponentene slipper å vite om URL-er og HTTP-detaljer.
// Vi bruker Fetch API, som er innebygd i nettleseren (ingen ekstra pakke).

// Utenfor React-komponenter kan vi ikke bruke hooken useTranslation,
// men vi kan bruke funksjonen t direkte fra i18n-objektet.
import i18n from "../i18n.js";

// URL til tjeneren. Kan overstyres med en .env-fil: VITE_API_URL=http://...
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3030";

// Hjelpefunksjon som sender en forespørsel og returnerer JSON-svaret.
//
// NB! fetch kaster bare unntak ved nettverksfeil (f.eks. at tjeneren ikke kjører).
// Svar med feilkode som 404 eller 500 regnes som "vellykkede" av fetch, så vi
// må selv sjekke res.ok (true for statuskode 200-299) og kaste en feil.
async function sendForespørsel(sti, valg = {}) {
  const res = await fetch(API_URL + sti, {
    ...valg,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    // Sender med sesjons-cookien fra tjeneren (Passport). Uten denne "glemmer"
    // tjeneren hvem vi er, fordi klienten (port 5173) og tjeneren (port 3030)
    // har ulik origin. Tjeneren må tilsvarende ha credentials: true i CORS-oppsettet.
    credentials: "include",
  });

  // Ikke alle svar er JSON (f.eks. "Ukjent URL" ved 404), så vi sjekker først.
  const erJSON = res.headers.get("Content-Type")?.includes("application/json");
  const data = erJSON ? await res.json() : await res.text();

  if (!res.ok) {
    // Tjeneren sender som regel en feilmelding i JSON-svaret.
    const melding =
      (erJSON && (data.melding || data["SQL Error Message"])) ||
      i18n.t("api.httpFeil", { status: res.status });
    const error = new Error(melding);
    error.status = res.status; // Så komponentene kan sjekke f.eks. 401
    throw error;
  }

  return data;
}

// GET /varer - henter hele varelageret.
// signal brukes for å kunne avbryte kallet (se useEffect i Butikk).
export async function hentVarer(signal) {
  return sendForespørsel("/varer", { signal });
}

// GET /bruker - returnerer den innloggede brukeren, eller null hvis ingen er innlogget.
export async function hentInnloggetBruker(signal) {
  try {
    return await sendForespørsel("/bruker", { signal });
  } catch (error) {
    if (error.status === 401) {
      return null;
    }
    throw error;
  }
}

// POST /innlogging - returnerer brukeren { knr, epost, navn }, eller kaster feil.
// Tjeneren setter en sesjons-cookie som nettleseren sender med i senere kall.
export async function loggInn(epost, passord) {
  return sendForespørsel("/innlogging", {
    method: "POST",
    body: JSON.stringify({ epost, passord }),
  });
}

// POST /utlogging - avslutter sesjonen på tjeneren.
export async function loggUt() {
  return sendForespørsel("/utlogging", { method: "POST" });
}

// POST /registrering - oppretter ny kunde og logger inn. Returnerer brukeren.
export async function registrer(kunde) {
  return sendForespørsel("/registrering", {
    method: "POST",
    body: JSON.stringify(kunde),
  });
}

// POST /ordrer - lagrer handlekurven som en ny ordre for den innloggede kunden.
// Vi sender IKKE med brukernavn: tjeneren vet hvem vi er ut fra sesjonen.
export async function lagreOrdre(kurv) {
  return sendForespørsel("/ordrer", {
    method: "POST",
    body: JSON.stringify({ kurv }),
  });
}
