import { useState, useEffect } from "react";

import Vareliste from "../components/Vareliste.jsx";
import Innlogging from "../components/Innlogging.jsx";
import Bestilling from "../components/Bestilling.jsx";
import Handlekurv from "../components/Handlekurv.jsx";

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
// (REST-basert API basert på Express). Bruker fetch API
// for å gjøre AJAX-kall, samt hooks useState og useEffect.
// Generelt kan useEffect utføre en handling hver gang en variabel
// endrer verdi, i vårt tilfelle blir handlingen utført kun én gang.

const Butikk = () => {
  // Klienten bruker kun denne ene ruten:
  const url = `http://localhost:3030/varer`;

  let [innlogget, setInnlogget] = useState(false);
  let [brukernavn, setBrukernavn] = useState("");
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

  // Hent varelisten fra webtjeneren med useEffect/fetch ved oppstart.
  // Generelt vil handlingen bli utført når en av variablene vi
  // sender med som andre parameter endrer verdi (her url).
  const [varer, setVarer] = useState([]);
  useEffect(() => {
    const hentVarer = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setVarer(data);
      } catch (error) {
        console.error(error.message);
      }
    };
    hentVarer();
  }, [url]);

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

    // TODO: Bør sjekke om varen allerede er i handlekurven!
    kurvKopi.push({ vnr: vnr, antall: antall, pris: pris });
    setKurv(kurvKopi);
  };

  // Håndterer endring av inndata i Innlogging.
  const lesInndata = (event) => {
    const target = event.target.name;
    const value = event.target.value;
    if (target === "brukernavn") {
      setBrukernavn(value);
    } else {
      setPassord(value);
    }
  };

  // Håndterer submit i Innlogging.
  const sjekkInnlogging = async (event) => {
    console.log(`sjekkInnlogging: epost = ${brukernavn}, passord = ${passord}`);
    event.preventDefault();

    const response = await fetch("http://localhost:3030/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ epost: brukernavn, passord: passord }),
      credentials: "include",
    });

    if (response.ok) {
      const data = await response.json();
      setInnlogget(true);
      console.log("Innlogget:", data.user);
    } else {
      console.error("Innlogging feilet");
    }
  };

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
  const bestillVare = (event) => {
    event.preventDefault();
    oppdaterKurv();
  };

  let toppDel = null;
  if (!innlogget) {
    toppDel = (
      <Innlogging sjekkInnlogging={sjekkInnlogging} lesInndata={lesInndata} />
    );
  } else {
    toppDel = (
      <div>
        <Bestilling
          lesVnr={lesVnr}
          lesAntall={lesAntall}
          bestillVare={bestillVare}
        />
        &nbsp;
        <Handlekurv brukernavn={brukernavn} kurv={kurv} />
      </div>
    );
  }
  return (
    <div className="space-y-4">
      <h1>Nettbutikken</h1>
      &nbsp;
      {toppDel}
      &nbsp;
      <Vareliste varer={varer} />
    </div>
  );
};

export default Butikk;
