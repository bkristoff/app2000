import { useState, useEffect } from "react";
import { hentVarer, hentInnloggetBruker, loggInn, loggUt } from "../lib/api.js";
import i18n from "../i18n.js";

import Vareliste from "../components/Vareliste.jsx";
import Innlogging from "../components/Innlogging.jsx";
import Registrering from "../components/Registrering.jsx";
import Bestilling from "../components/Bestilling.jsx";
import Handlekurv from "../components/Handlekurv.jsx";
import { useTranslation } from "react-i18next";

// Dette er "hovedkomponenten". Den inneholder litt vel mange ting,
// og burde kanskje vært delt opp?

// Den tar vare på datastrukturen i et antall hooks (useState). Brukernavn
// og passord blir lest inn i komponenten Innlogging, deretter blir brukernavn
// vist fram i komponenten Vareliste. Ved vellykket innlogging blir Bestilling
// og Handlekurv synlig. Varenummer og antall blir lest inn i komponenten Bestilling
// og dataene lagt inn i handlekurven.
//
// Butikk sender data ned i "barn-komponentene" ved å sende med
// "hook-variabler" som props-parametre, og får tak i data som blir
// lest inn i HTML-skjemaer i "barn-komponentene", ved å sende med
// event-funksjoner som props-parametre.
//
// Handlekurven er et eksempel på en "kompleks datastruktur" (en array
// av objekter). For å håndtere endringer i slike variabler (når man
// bruker useState), bør man erstatte gammel verdi med en kopi - og ikke
// oppdatere det gamle objektet. Et (bedre?) alternativ er å bruke hook-en
// useReducer - prøv gjerne dette selv.
//
// Henter varedata som JSON fra tjenerdelen av applikasjonen
// (REST-basert API basert på Express) med Fetch API, samt hooks useState
// og useEffect. Selve fetch-kallene ligger i lib/api.js.
// Generelt kan useEffect utføre en handling hver gang en variabel
// endrer verdi, i vårt tilfelle blir handlingen utført kun én gang.

const Butikk = () => {
  const { t } = useTranslation();
  // Den innloggede brukeren { knr, epost, navn }, eller null hvis ingen er innlogget.
  // Innlogging håndteres av Passport på tjeneren; klienten bare viser resultatet.
  let [bruker, setBruker] = useState(null);
  // true mens vi spør tjeneren om noen er innlogget (unngår at innloggingsskjemaet "blinker")
  let [sjekkerSesjon, setSjekkerSesjon] = useState(true);
  let [visRegistrering, setVisRegistrering] = useState(false);
  let [feilmelding, setFeilmelding] = useState("");
  let [epost, setEpost] = useState("");
  let [passord, setPassord] = useState("");
  let [vnr, setVnr] = useState("");
  let [antall, setAntall] = useState(0);

  // Hardkoder litt innhold i handlekurven.
  // I en reell løsning vil handlekurven initieres til [].
  let startKurv = [
    { vnr: "10820", antall: 3, pris: 99.5 },
    { vnr: "10830", antall: 4, pris: 122.0 },
  ];
  let [kurv, setKurv] = useState(startKurv);

  // Hent varelisten fra webtjeneren med useEffect/Fetch ved oppstart.
  // Den tomme listen [] som andre parameter betyr at handlingen bare
  // utføres når komponenten vises første gang.
  //
  // Funksjonen vi returnerer er en "opprydding" som avbryter kallet hvis
  // komponenten forsvinner før svaret kommer. I utviklingsmodus (StrictMode)
  // kjører React effekten to ganger for å avsløre manglende opprydding,
  // så du vil se at det første kallet blir avbrutt i Network-fanen.
  //
  // Her bruker vi i18n.t i stedet for t fra useTranslation. Da trenger ikke
  // effekten å avhenge av t (som endres ved språkbytte), og varene hentes
  // ikke på nytt hver gang brukeren bytter språk.
  const [varer, setVarer] = useState([]);
  useEffect(() => {
    const controller = new AbortController();
    const lastVarer = async () => {
      try {
        const data = await hentVarer(controller.signal);
        setVarer(data);
      } catch (error) {
        if (error.name !== "AbortError") {
          setFeilmelding(
            i18n.t("butikk.feilHentVarer", { melding: error.message })
          );
        }
      }
    };
    lastVarer();
    return () => controller.abort();
  }, []);

  // Er brukeren allerede innlogget? Sesjonen på tjeneren lever videre selv om
  // siden lastes på nytt (F5). Nettleseren sender med sesjons-cookien, og
  // tjeneren svarer med brukeren (GET /bruker). Uten dette ville brukeren
  // måttet logge inn på nytt hver gang siden lastes.
  useEffect(() => {
    const controller = new AbortController();
    const sjekkSesjon = async () => {
      try {
        setBruker(await hentInnloggetBruker(controller.signal));
        setSjekkerSesjon(false);
      } catch (error) {
        if (error.name !== "AbortError") {
          setSjekkerSesjon(false);
        }
      }
    };
    sjekkSesjon();
    return () => controller.abort();
  }, []);

  // Henter prisen til en vare.
  const varepris = (vnr) => {
    for (const elem of varer) {
      if (elem.VNr === vnr) {
        return parseFloat(elem.Pris);
      }
    }
    return 0; // TODO: Her bør brukeren få en feilmelding!
  };

  // Legger til en ny vare i handlekurven.
  // Men gjør dette ved å opprette en helt ny handlekurv (en kopi)!
  const oppdaterKurv = () => {
    console.log(`oppdaterKurv: vnr = ${vnr}, antall = ${antall}`);

    // Enkel løsning for å få en kopi:
    let kurvKopi = JSON.parse(JSON.stringify(kurv));

    let pris = varepris(vnr);

    // Hvis varen allerede er i handlekurven, øker vi bare antallet.
    // En ordre kan ikke ha to linjer med samme vare: primærnøkkelen til
    // Ordrelinje er (OrdreNr, VNr), så databasen ville gitt feilen
    // "Duplicate entry ... for key 'ordrelinje.PRIMARY'".
    // (Unik vnr er også nødvendig fordi Handlekurv bruker vnr som key.)
    let linje = kurvKopi.find((elem) => elem.vnr === vnr);
    if (linje) {
      linje.antall += antall;
    } else {
      kurvKopi.push({ vnr: vnr, antall: antall, pris: pris });
    }
    setKurv(kurvKopi);
  };

  // Håndterer endring av inndata i Innlogging.
  const lesInndata = (event) => {
    const target = event.target.name;
    const value = event.target.value;
    if (target === "epost") {
      setEpost(value);
    } else {
      setPassord(value);
    }
  };

  // Håndterer submit i Innlogging. E-post og passord sjekkes av Passport
  // på tjeneren (POST /innlogging), som svarer 401 hvis de er feil.
  // Ved suksess får nettleseren en sesjons-cookie, og vi får brukeren tilbake.
  // NB! Ikke logg passordet til konsollet.
  const sjekkInnlogging = async (event) => {
    event.preventDefault();
    try {
      const innlogget = await loggInn(epost, passord);
      setFeilmelding("");
      setPassord(""); // Ikke hold på passordet lenger enn nødvendig
      setBruker(innlogget);
    } catch (error) {
      setFeilmelding(error.message);
    }
  };

  // Kalles fra Registrering når ny kunde er opprettet (og logget inn).
  const registrert = (nyBruker) => {
    setFeilmelding("");
    setVisRegistrering(false);
    setBruker(nyBruker);
  };

  // Logger ut på tjeneren (sesjonen slettes) og glemmer brukeren i klienten.
  const loggUtBruker = async () => {
    try {
      await loggUt();
    } catch (error) {
      console.error(error.message);
    }
    setBruker(null);
  };

  // Kalles fra Handlekurv hvis tjeneren svarer 401 (f.eks. fordi sesjonen
  // har gått ut eller tjeneren er startet på nytt).
  const sesjonUtløpt = () => {
    setBruker(null);
    setFeilmelding(t("innlogging.sesjonUtløpt"));
  };

  // Kalles fra Handlekurv når ordren er lagret.
  const tømKurv = () => setKurv([]);

  // Håndterer endring i varenummer i Bestilling.
  const lesVnr = (event) => {
    setVnr(event.target.value);
    console.log("lesVnr: " + vnr);
  };

  // Håndterer endring i antall i Bestilling.
  const lesAntall = (event) => {
    setAntall(parseInt(event.target.value));
    console.log("lesAntall: " + antall);
  };

  // Håndterer submit i Bestilling.
  // Antall må være et positivt heltall. parseInt("") gir NaN, og et tomt
  // felt gir startverdien 0, så begge deler stoppes her.
  const bestillVare = (event) => {
    event.preventDefault();
    if (!Number.isInteger(antall) || antall < 1) {
      setFeilmelding(t("butikk.feilAntall"));
      return;
    }
    setFeilmelding("");
    oppdaterKurv();
  };

  let toppDel = null;
  if (sjekkerSesjon) {
    toppDel = null;
  } else if (!bruker && visRegistrering) {
    toppDel = (
      <Registrering
        registrert={registrert}
        avbryt={() => setVisRegistrering(false)}
      />
    );
  } else if (!bruker) {
    toppDel = (
      <Innlogging
        sjekkInnlogging={sjekkInnlogging}
        lesInndata={lesInndata}
        passord={passord}
        visRegistrering={() => {
          setFeilmelding("");
          setVisRegistrering(true);
        }}
      />
    );
  } else {
    toppDel = (
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <p className="text-sm text-slate-600 dark:text-slate-300">
            {t("innlogging.innloggetSom", { navn: bruker.navn, epost: bruker.epost })}
          </p>
          <button onClick={loggUtBruker} className="knapp shrink-0">
            {t("innlogging.loggUt")}
          </button>
        </div>
        <div className="grid items-start gap-6 lg:grid-cols-2">
          <Bestilling
            lesVnr={lesVnr}
            lesAntall={lesAntall}
            bestillVare={bestillVare}
          />
          <Handlekurv
            navn={bruker.navn}
            kurv={kurv}
            tømKurv={tømKurv}
            sesjonUtløpt={sesjonUtløpt}
          />
        </div>
      </div>
    );
  }
  return (
    <div className="space-y-8">
      <div>
        <h1>{t("butikk.tittel")}</h1>
        <p className="mt-2 text-slate-500 dark:text-slate-400">
          {t("butikk.ingress")}
        </p>
      </div>
      {feilmelding && (
        <p
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-300">
          {feilmelding}
        </p>
      )}
      {toppDel}
      <Vareliste varer={varer} />
    </div>
  );
};

export default Butikk;
