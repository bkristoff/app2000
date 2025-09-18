// objdemo.js
// Kode som demonstrerer objektorientering i JavaScript

// Fire måter å lage objekter på

// Lage objekt direkte med objektliteraler (uten å gå veien om en klasse)
let v11 = { vnr: 1, navn: "Hakke", pris: 198.5 };

// Lage objekt ved å legge til egenskaper i Object
let v2 = new Object();
v2.vnr = 2;
v2.navn = "Spett";
v2.pris = 234.5;

// Lage objekt med funksjonskonstruktør
function Vare(vnr, navn, pris) {
  this.vnr = vnr;
  this.navn = navn;
  this.pris = pris;
}

// Alle objekter har en prototype (en slags klasse)
// Kan legge til metoder via prototypen
Vare.prototype.prisInklMva = function () {
  return this.pris * 1.25;
};

let v3 = new Vare(3, "Kniv", 94.0);

// Blir arvet i objektene (v3 er laget før pris-metoden ble lagt til)
console.log(v3.prisInklMva());

// v3 har en prototype som arver fra Object
// Kan også bruke metoder fra Object
console.log(v3.toString());

// Overstyrer toString-metoden (og bruker templatstringer)
Vare.prototype.toString = function () {
  return `${this.vnr} ${this.navn} ${this.prisInklMva()}`;
};
console.log(v3.toString());

// Lage objekt med klasse-syntaks (omtrent som i Java)
// Men class er bare "syntaktisk sukker" (fortsatt prototypebasert)
class Vare2 {
  constructor(vnr, navn, pris) {
    this.vnr = vnr;
    this.navn = navn;
    this.pris = pris;
  }
  prisInklMva() {
    // Ikke function her
    return this.pris * 1.25;
  }
}
let v4 = new Vare2(4, "Øks", 245.0);

// Kopier alle verdiene over i en array
let tab = Object.values(v4);
console.log(tab);

// Et objekt kan behandles som en assosiativ array
console.table(v4);

// Dermed kan vi lage "supergenerell" kode
function endreObjekt(obj, egenskap, verdi) {
  obj[egenskap] = verdi;
}
endreObjekt(v4, "navn", "Liten øks"); // Merk at "navn" nå er en string
console.log(v4);

function dumpObjekt(obj) {
  for (egenskap in obj) {
    console.log("Egenskap = " + egenskap + ", verdi = " + obj[egenskap]);
  }
}
dumpObjekt(v4);

// JavaScript har subklasser, men vi bruker ikke tid på det, se:
// https://www.w3schools.com/js/js_class_inheritance.asp

// Litt artig syntaks til slutt - spread-operatoren:
let pos = { x: 50, y: 10 };
let dim = { bredde: 200, høyde: 50 };
let rekt = { ...pos, ...dim };
console.log(rekt);
