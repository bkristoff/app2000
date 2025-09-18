// funkdemo.js
// Kode som demonstrerer funksjoner i JavaScript.

// Fire måter å definere funksjoner
// "Vanlig"
function pluss(x, y) {
  return x + y;
}

// Funksjoner er verdier (kan stå på høyresiden av =)
let gange = function (x, y) {
  return x * y;
};

// Lambdauttrykk er kompakt notasjon for å beskrive anonyme funksjoner
let minus = (x, y) => {
  return x - y;
};

// Kan sløyfe krøllparenteser hvis kun 1 setning
let dele = (x, y) => x / y;

console.log(pluss(2, 2));
console.log(gange(2, 3));
console.log(minus(4, 5));
console.log(dele(8, 3));

// Høyere ordens funksjoner = funksjoner som tar andre funksjoner som
// parametre, eller returnerer andre funksjoner.
// map, filter og reduce er tre høyere ordens funksjoner i JavaScript.

// map anvender en funksjonsparameter på alle elementene i en array.
// Hvis minTab == [1,2,3], så vil minTab.map(f) returnere [f(1),f(2),f(3)].

const tab = [1, 2, 3, 4];

// map: legger til 3 på alle elementer
console.log(tab.map((x) => x + 3));

// filter: plukker ut partall fra en array
const partall = tab.filter((x) => x % 2 === 0);
console.log(partall);

// reduce: fra [1,2,3,4] til 1+2+3+4
// eller 1 op 2 op 3 op 4, der op kan være +, *, ...
const f = (total, verdi) => total + verdi;
console.log(tab.reduce(f));

// Lag din egen versjon av map og test den.
let map = function (tab, f) {
  let ny = [];
  for (let i = 0; i < tab.length; i++) {
    ny[i] = f(tab[i]);
  }
  return ny;
};

// Bruker map og et lambdauttrykk for å doble verdiene i en tabell
let mintab = [1, 2, 3, 4, 5];
console.log(map(mintab, (x) => 2 * x));
// Eller opphøye i annen
console.log(map(mintab, (x) => x * x));

// Funksjoner som returnerer funksjoner
function multiplier(factor) {
  return (x) => x * factor;
}
let twice = multiplier(2);
console.log(twice(3));

// Rekursjon = funksjon som kaller seg selv
// fac(5) = 1 * 2 * 3 * 4 * 5
function fac(n) {
  if (n == 1) {
    return 1;
  } else {
    return n * fac(n - 1);
  }
}
console.log(fac(5));

// Rekursjon og traversering av DOM'en

// Lag en pretty-printer for DOM'en
function finnAlleElementer(node, innrykk) {
  let str = " ".repeat(innrykk * 4) + " " + node.nodeType + " ";

  if (node.nodeType == Node.TEXT_NODE) {
    str += node.textContent;
  } else {
    str += node.tagName;
  }

  console.log(str);
  for (barn of node.childNodes) {
    finnAlleElementer(barn, innrykk + 1);
  }
}
let doc = document.getElementsByTagName("html")[0];
finnAlleElementer(doc, 0);

// Anonyme funksjoner brukes ofte i event-håndtering
let knapp = document.getElementById("knapp");
knapp.addEventListener("click", function () {
  alert("Melding");
});
// Eller kanskje til og med i én setning, uten å innføre variabelen knapp.
