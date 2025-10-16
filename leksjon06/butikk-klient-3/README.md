## Lage butikk-klient-4 (versjon 4 av nettbutikken)

Siste utvidelse blir å legge til HTML-skjema for innlogging. Dette blir ikke en skikkelig autentiseringsløsning (det kommer i en seinere leksjon), men vil demonstrere "conditional rendering": Før brukeren er innlogget blir kun handlekurven vist, etter vellykket innlogging dukker bestillingsskjemaet og handlekurven opp.

# 1. Sjekk at løsningen fungerer

For å teste må du som vanlig kjøre:

```
npm install
npm run dev
```

Og så åpne nettleseren på adresse: localhost:3000

# 2. Innloggingsskjema

Bygg ut Innlogging med følgende HTML-skjema:

```
const Innlogging = ({ sjekkInnlogging, lesInndata }) => {
  return (
    <div>
      <form onSubmit={sjekkInnlogging}>
        <h2>Innlogging</h2>
        <p>Logg inn for å bestille varer.</p>
        <input
          type="text"
          id="brukernavn"
          name="brukernavn"
          placeholder="Brukernavn"
          onChange={lesInndata}
        />
        <input
          type="password"
          id="passord"
          name="passord"
          placeholder="Passord"
          onChange={lesInndata}
        />
        <button>Logg inn</button>
      </form>
    </div>
  );
};
```

# 3. Utvide Butikk med useState hooks

Vi vil ta vare på brukernavn og passord lest inn fra brukeren, og det kan vi bruke useState hooks til. I en ferdig løsning vil vi sjekke innlogging mot databasen.

Etter sjekk av innlogging kan det være behagelig å ha en variabel som bare holder styr på om brukeren er innlogget eller ikke. Det blir en tredje useState hook.

```
let [innlogget, setInnlogget] = useState(false);
let [brukernavn, setBrukernavn] = useState("");
let [passord, setPassord] = useState("");
```

# 4. Lag event-funksjoner i Butikk

Når brukeren har skrevet noe i enten brukernavn-boksen eller passord-boksen, så kjører vi lesInndata-funksjonen:

```
  const lesInndata = (event) => {
    const target = event.target.name;
    const value = event.target.value;
    if (target === "brukernavn") {
      setBrukernavn(value);
    } else {
      setPassord(value);
    }
  };
```

Når brukeren sender inn HTML-skjemaet (submit), så kjører vi sjekkInnlogging-funksjonen:

```
  const sjekkInnlogging = (event) => {
    event.preventDefault();

	  // Dummy-versjon - vi godtar foreløpig alt!
    setInnlogget(true);
  };
```

For å få alt til å "henge sammen", må Butikk sende de to event-funksjonene "ned til" Innlogging som props-parametre:

```
<Innlogging sjekkInnlogging={sjekkInnlogging} lesInndata={lesInndata} />
```

Se steg 6-11 til 6-13 for et mini-eksempel som forklarer denne programmeringsteknikken.

# 5. Conditional rendering

Conditional rendering innebærer at visse deler av nettsiden kun skal bli vist dersom en gitt betingelse er sann.

I vårt eksempel: Hvis brukeren ikke er logget inn, skal innloggingsskjemaet være synlig. Etter vellykket innlogging, skal brukeren i stedet få se bestillingsskjemaet.

Legg til følgende kode på passende sted i Butikk (rett før return-setningen).

```
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
        <Handlekurv brukernavn={brukernavn} kurv={kurv} />
      </div>
    );
  }
```

Deretter kan vi bruke toppDel i selve return-setningen:

```
<>
  <h1>Nettbutikken</h1>
  {toppDel}
  <Vareliste varer={varer} />
</>
```

# 6. Sjekk ferdig løsning

Du skal nå ha en versjon som ligger ganske tett opp til den "ferdige" versjonen (versjon 4).

Bruk likevel litt tid til å gå gjennom alle kodefilene og notér ned ting du ikke forstår.
