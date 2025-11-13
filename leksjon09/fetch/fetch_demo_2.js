// Kilde
// https://betterprogramming.pub/build-a-crud-js-app-with-fetches-f82143a48b6d

// URL til alle varer

// For at dette skal fungere bør butikk-tjener kjøre
// og dessuten bør føgende kodelinje i server.js
// app.use(cors({ origin: `http://localhost:3000` }));
// byttes ut med:
// app.use(cors({ origin: `*` })); 

function urlVarer() {
  return "http://localhost:3030/varer/";
}

// URL til en bestemt vare, med varenummer fra HTML-skjemaet.
function urlAktivVare() {
  let txtVNr = document.querySelector('#VNr');
  return urlVarer() + txtVNr.value;
}

// URL til et utvalg av varer med spørreparametre for paginering
function urlVarerSide(snr, ant) {
  return urlVarer() + "paginert?snr=" + snr + "&ant=" + ant;
}

// JSON-representasjon av vare-info fra HTML-skjemaet,
// utvidet med standardverdier for noen av kolonnene.
function skjemadata() {
  let form = document.getElementById('form');
  let formData = new FormData(form);
  formData.append('Antall', 0); // null
  formData.append('Hylle', '');
  formData.append('Slettet', 0);
  formData.append('Bildefil', '');

  // Konverterer formData til objekt
  let object = {};
  formData.forEach(function(value, key){
    object[key] = value;
  });

  // Debugging
  // console.log("Skjemadata: " + JSON.stringify(object));

  return object;
}

// Konverterer en JSON "databasetabell" til HTML-presentasjon.
function lagHTMLTabell(tab) {
  let str = "<table>";

  // Bruker nøklene i første rad som overskrifter
  let rad0 = tab[0];
  for (let kol in rad0) {
    str += `<th>${kol}</th>`;
  }

  // Lager radene
  for (let rad of tab) {
    str += "<tr>";
    for (let attributt in rad) {
      str += `<td>${rad[attributt]}</td>`;
    }
    str += "</tr>";
  }

  str += "</table>";
  return str;
}

// Viser en samling av varer som HTML-tabell
async function visVarer(varer) {
  document.querySelector("#datadiv").innerHTML = lagHTMLTabell(varer);
}

// Henter alle varer 
async function hentAlleVarer() {
  fetch(urlVarer())
    .then((response) => response.json())
    .then((varer) => visVarer(varer));
}

// Henter én vare.
async function hent1Vare() {
  fetch(urlAktivVare())
    .then((response) => response.json())
    .then((varer) => visVarer(varer));
}

// Henter en "side" med varer.
async function side3Varer() {
  fetch(urlVarerSide(3, 10))
    .then((response) => response.json())
    .then((varer) => visVarer(varer));
}

// Dumper respons fra INSERT/UPDATE/DELETE i konsollet.
// TODO Bør gi respons på selve nettsiden.
async function visRespons(data) {
  console.log(data);
}

// Setter inn ny vare basert på data fra HTML-skjema
async function nyVare() {
  let vare = skjemadata();

  // console.log("Skjemadata: " + JSON.stringify(vare));
  
  fetch(urlVarer(), {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(vare)
  })
  .then(res => res.json())
  .then(res => (visRespons(res)));
}

// Oppdaterer vare med gitt VNr basert på data fra HTML-skjema
async function oppdaterVare() {
  let vare = skjemadata();
  fetch(urlVarer(), {
    method: "PUT",
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(vare)
  })
  .then(res => res.json())
  .then(res => (visRespons(res)));
}

// Sletter vare med gitt VNr
async function slettVare() {
  let txtVNr = document.querySelector('#VNr');
  let data = {VNr: txtVNr.value};
  fetch(urlVarer(), {
    method: "DELETE",
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(res => res.json())
  .then(res => (visRespons(res)));
}

// Registrering av knappelyttere
document.getElementById("btnHent1").addEventListener("click", hent1Vare);
document.getElementById("btnHentAlle").addEventListener("click", hentAlleVarer);
document.getElementById("btnSide3").addEventListener("click", side3Varer);
document.getElementById("btnNy").addEventListener("click", nyVare);
document.getElementById("btnOppdater").addEventListener("click", oppdaterVare);
document.getElementById("btnSlett").addEventListener("click", slettVare);
