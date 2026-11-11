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
  });

  // Ikke alle svar er JSON (f.eks. "Ukjent URL" ved 404), så vi sjekker først.
  const erJSON = res.headers.get("Content-Type")?.includes("application/json");
  const data = erJSON ? await res.json() : await res.text();

  if (!res.ok) {
    // Tjeneren sender som regel en feilmelding i JSON-svaret.
    const melding =
      (erJSON && (data.melding || data["SQL Error Message"])) ||
      i18n.t("api.httpFeil", { status: res.status });
    throw new Error(melding);
  }

  return data;
}

// GET /varer - henter hele varelageret.
// signal brukes for å kunne avbryte kallet (se useEffect i Butikk).
export async function hentVarer(signal) {
  return sendForespørsel("/varer", { signal });
}

// POST /innlogging - returnerer kundedata, eller kaster feil ved ugyldig innlogging.
export async function loggInn(brukernavn, passord) {
  return sendForespørsel("/innlogging", {
    method: "POST",
    body: JSON.stringify({ brukernavn, passord }),
  });
}

// POST /ordrer - lagrer handlekurven som en ny ordre.
export async function lagreOrdre(brukernavn, kurv) {
  return sendForespørsel("/ordrer", {
    method: "POST",
    body: JSON.stringify({ brukernavn, kurv }),
  });
}
