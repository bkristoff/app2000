# Leksjon 2. JavaScript: DOM-en og event-håndtering

I denne leksjonen skal vi lære grunnleggende JavaScript og kode to eksempler:

- Huskeliste
- Brukerregistrering (inndatavalidering)

## 1. Introduksjon til JavaScript

- Åpne [leksjon 2] (https://dbsys.info/2000/leksjon02/index.html)
- Åpne [JavaScript Tutorial] (https://www.w3schools.com/js/default.asp)

Antar at dere kan litt Java (eller tilsvarende språk):

- Mye er likt. Vi fokuserer på det som er annerledes enn i Java.
- JavaScript blir **interpretert**, mens Java blir **kompilert**.
- JavaScript er **dynamisk typet**, mens Java er **statisk typet**.
- Et JavaScript-program kjører (på klientsiden) som **del av en nettside** (og ikke som et selvstendig program).

### 1-a. Kjøre JavaScript-kode på ulike måter

Kjør JavaScript fra konsollet i nettleseren:

- Start Visual Studio Code (VS Code) og nettleser Firefox eller Chrome.
- Lag tom mappe og åpne denne i VS Code.
- Lag en minimal HTML-side index.html ved å bruke snippets (skriv ! i kodevinduet og trykk enter). Legg til en overskrift.
- Åpne siden i nettleseren og åpne Inspector (CTRL+SHIFT+I i Firefox). Velg Console.
- Skriv alert("Hei verden!");

Hvis du har installert Node.js, kan du kjøre JavaScript fra terminalvinduet i VS Code:

- Lag fil index.js
- Skriv kode inn på filen: console.log("Hei verden!");
- Åpne terminalvindu fra meny Terminal | New terminal (CTRL + SHIFT + ø).
- Kjør skript fra terminalvindu: node index.js (krever at du er i riktig mappe)

Kjør JavaScript i nettleseren via script-taggen:

- Se [hvor script-taggen skal plasseres] (https://www.w3schools.com/js/js_whereto.asp)
- Prøv ut å legge script-taggen i henholdsvis head og body.
- Eksempelkode: document.write("Hei verden!");
- Flytt deretter koden ut på en egen fil (index.js) og lenk til filen fra script-taggen.

Organisering av filer

- Lag tre filer index.html, index.css, index.js.
- Legg til en enkel stilregel på index.css og test at det fungerer (f.eks. sett farge på h1).
- Man kan eventuelt lage undermapper for css, for bilder og for js.
- Vi skal bruke såkalte rammeverk (en slags ferdige biblioteker), som har sine egne anbefalinger for mappestruktur.

### 1-c. Grunnleggende mekanismer i JavaScript

- Vi ser spesielt på ting som er litt annerledes enn i Java.
- Tester ut JavaScript til dels i konsollet i nettleseren og til dels fra terminalvinduet i VS Code.

Utskrift til konsollet

```
console.log(2+2);
2+2;
```

Deklarere variabler og konstanter

```
let x = 5;
x++;
x;
const PI = 3.14;
```

Kommentar: "var" er den "gammeldagse" varianten av "let":

- Ikke bruk "var" (lett å gjøre feil)!
- Les eventuelt om [hoisting] (https://javascript.info/var)

Dynamisk typing

```
x = "7"; // x var inntil nylig et tall (se over)
```

To slags likheter

```
5 == 5;
5 == "5";  // 5 !== "5"
5 === "5"; // 5 !=== "5"
```

Typekonvertering

```
2 + 3 + "5";
```

Finne datatypen til en verdi/variabel

```
typeof 5;
typeof x;
typeof "5";
typeof "true";
typeof undefined;
```

Datatyper i JavaScript

- Primitive typer: numbers, string, boolean, undefined
- Sammensatte typer: objects, function
- Arrays og null er objekter

Unngå typefeil. Sett inn på 1. linje i JS-skript:

```
"use strict";
```

TypeScript

- [JavaScript med syntaks for datatyper] (https://www.typescriptlang.org/)

Kontrollstrukturer

- Fungerer stort sett som i Java
- if, switch, for, while

Funksjoner

- Kan lage selvstendige funksjoner (utenfor klasse)
- For å skrive flere kodelinjer i Console uten at koden blir utført: SHIFT+ENTER

```
function pluss(a,b) {
  return a+b;
}
console.log(pluss(2,3));
```

Arrays

```
let tab = [2,4,6,8];
console.log(tab);
console.table(tab);  // PrettyPrint
for (let n of tab) { // Gjennomløp uten å bruke indekser
  console.log(n);
}
```

Objekter (uten å lage klasse først)

```
let vare1 = { vnr:7, navn:"Hakke", pris:198.50 };
vare1;
console.log(vare1);
console.table(vare1); // Tabeller er objekter
for (let p in vare1) { // Gjennomløpe egenskapene!
  console.log(p);
}
let vare2 = { vnr:8, navn:"Spett", pris:50.00 };
```

Representere databasetabell i JS = Array av "rad-objekter"

```
let dbtab = [vare1, vare2];
dbtab;
console.log(dbtab);
console.table(dbtab);
```

### 1-d. Extensions for VS Code

- Live Server (slipper oppdatering med F5)
- ESLint (finner og retter opp kodefeil)
- Prettier (automatisk syntaksfarging og innrykk)

### 1-e. Debuggeren

En debugger gjør det mulig å stoppe utførelsen på bestemte linjer (breakpoint), og deretter gå stegvis videre, mens man undersøker verdien til ulike variabler/uttrykk.

- Finn logisk feil i koden under, enten ved å bruke debuggeren i nettleseren, eller (bedre) i VS Code.
- Sett Breakpoint på første setning i funksjonen, sett Watch på variablene sum og i, og kjør så Step over.
- Start med kall på sum(2,5).
- Tips: Stopper løkka litt for tidlig?

```
function sum(fra, til) {
  let sum = 0;
  debugger; // Setter breakpoint
  for (let i = fra; i < til; i++) {
    sum += i;
  }
  return sum;
}
```

## 2. Jobbe med DOM'en fra JavaScript

Åpne Inspector i Firefox, se på DOM'en

- https://www.w3schools.com/js/js_htmldom.asp

Hvis hver node i DOM'en er et objekt, hvordan kunne vi laget noe slikt i Java?

Plassering av JS

- https://www.w3schools.com/js/js_whereto.asp
- head, body
- async, defer

Output

- https://www.w3schools.com/js/js_output.asp
- innerHTML
- document.write
- window.alert
- console.log

Finne HTML-elementer

- https://www.w3schools.com/js/js_htmldom_elements.asp

```
let elem = document.querySelector("p"); // finn første p
let elem = document.querySelectorAll("p"); // finn alle p'er
```

Kan søke med et CSS-uttrykk, f.eks. "main li:last-child"

Disse fungerer fortsatt, men querySelector er enklere og bedre?

```
let elem = document.getElementById("minid");
let elem = document.getElementsByTagName("p");
let elem = document.getElementsByClassName("intro");
let elem = document.forms["frm1"];
```

Navigere DOM'en

- https://www.w3schools.com/js/js_htmldom_navigation.asp

- parentNode
- childNodes[nodenumber]
- firstChild
- lastChild
- nextSibling
- previousSibling

Endre nettsiden

- https://www.w3schools.com/js/js_htmldom_html.asp
- https://www.w3schools.com/js/js_htmldom_css.asp

```
document.querySelector("p").innerHTML = ...

document.getElementById("minid").innerHTML = ...
document.getElementById("minid").src = "fil.jpg";
document.getElementById(minid).style.color = "blue";
```

Legge til elementer/noder

- https://www.w3schools.com/js/js_htmldom_nodes.asp

```
let avsnitt = document.createElement("p");
let node = document.createTextNode("ny tekstnode");
avsnitt.appendChild(node);
let elem = document.getElementById("mindiv");
elem.appendChild(avsnitt);
```

- nodeName, nodeType, nodeValue

## 3. Håndtere hendelser - events

https://www.w3schools.com/js/js_htmldom_events.asp

- onload, onclick, onmousedown, onmouseup, ...

```
<button type="button" onclick="f()">Klikk her!</button>
```

Pluss deklarere funksjon f(e) i JS-fil.

- Eller legge til event-funksjon med JS (+ definere funksjon)

```
document.getElementById("minKnapp").onclick = f;
```

Eller registrere lyttere

- Skiller HTML og JS tydelig
- Kan legge til flere Lyttere
- Må vente til DOM'en er opprettet
- https://www.w3schools.com/js/js_htmldom_eventlistener.asp

```
document.getElementById("minKnapp").addEventListener("click", f);
elem.removeEventListener("mousemove", f);
elem.addEventListener(event, function, useCapture);
```

3. parameter styrer event bubbling (default) / event capture. Spesielt interesserte: Se Net Ninja video

## 4. Miniprosjekt: Huskeliste (Todo list)

Funksjonalitet:

- Vise ei liste med oppgaver
- Tekstboks + knapp for å legge til ny oppgave
- Mulighet for å merke/vise oppgaver som utført/ikke utført
- Mulighet for å slette oppgaver
- Annenhver rad skal være grå
- Rader skal bli mørkegrå ved hovering (flytter musmarkøren over)
- Bruk semantiske tagger fra HTML5

Bygge løsning i flere steg:

1. Bli kjent med HTML+CSS. Lenke opp tom JS-fil.
2. Dummy-variant av knapp for ny oppgave (alert)
3. Lukkeknapper
4. Merke oppgaver som utført
5. Fullføre knapp for ny oppgave

Løsningen vil bli en forenklet versjon av følgende

- [TODO-app] (https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_todo)
- Se også [TODO-app i mange språk] (https://todomvc.com/)

## 5. Brukerregistrering (inndatavalidering)

Bygg løsning i flere steg:

- Opprett index.html + index.css + index.js (og koble de sammen)
- Lage skjema (HTML form) for brukerregistrering
- Sende skjema til [PHP-skript] https://itfag.usn.no/~kristoff/app2000/leksjon02/ekko.php
- Lage eksempel på inndatavalidering i HTML5

Hvordan stoppe innsending av skjema med JS?

- Aktuelt når skjemavalidering feiler.

```
return false / e.preventDefault
```
