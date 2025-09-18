// JSON-data vi tenker oss kommer over nettet fra en database
let jsonTab = `[
	{
		"VNr" : "10820",
		"Betegnelse" : "Dukkehår, hvitt",
		"Pris" : 53.50,
		"KatNr" : 13,
		"Antall" : 106,
		"Hylle" : "E12"
	},
	{
		"VNr" : "10822",
		"Betegnelse" : "Dukkehår, lys brunt",
		"Pris" : 53.50,
		"KatNr" : 13,
		"Antall" : 0,
		"Hylle" : "E12"
	},
	{
		"VNr" : "10830",
		"Betegnelse" : "Nisseskjegg, 30 cm",
		"Pris" : 66.50,
		"KatNr" : 13,
		"Antall" : 42,
		"Hylle" : ""
	},
	{
		"VNr" : "10835",
		"Betegnelse" : "Trollhår, hvitt",
		"Pris" : 95.00,
		"KatNr" : 13,
		"Antall" : 0,
		"Hylle" : "E12"
	},
	{
		"VNr" : "10854",
		"Betegnelse" : "Bomullsgarn, grått",
		"Pris" : 45.50,
		"KatNr" : 6,
		"Antall" : 0,
		"Hylle" : "C07"
	},
	{
		"VNr" : "11630",
		"Betegnelse" : "Skinnsnor, natur",
		"Pris" : 53.50,
		"KatNr" : 13,
		"Antall" : 0,
		"Hylle" : "E02"
	},
	{
		"VNr" : "12054",
		"Betegnelse" : "Hengebjørk",
		"Pris" : 412.50,
		"KatNr" : 14,
		"Antall" : 0,
		"Hylle" : "D01"
	},
	{
		"VNr" : "12055",
		"Betegnelse" : "Røsslyng",
		"Pris" : 274.50,
		"KatNr" : 14,
		"Antall" : 0,
		"Hylle" : "D01"
	},
	{
		"VNr" : "12056",
		"Betegnelse" : "Einer 'Blåmann'",
		"Pris" : 220.50,
		"KatNr" : 14,
		"Antall" : 0,
		"Hylle" : "D01"
	},
	{
		"VNr" : "12088",
		"Betegnelse" : "Einer 'Tyrihans'",
		"Pris" : 247.00,
		"KatNr" : 14,
		"Antall" : 0,
		"Hylle" : "D01"
	},
	{
		"VNr" : "12089",
		"Betegnelse" : "Gran, standard",
		"Pris" : 166.00,
		"KatNr" : 14,
		"Antall" : 0,
		"Hylle" : "D01"
	},
	{
		"VNr" : "12090",
		"Betegnelse" : "Hvitgran",
		"Pris" : 221.00,
		"KatNr" : 14,
		"Antall" : 0,
		"Hylle" : "D01"
	},
	{
		"VNr" : "12091",
		"Betegnelse" : "Sølvgran 'Globosa'",
		"Pris" : 329.50,
		"KatNr" : 14,
		"Antall" : 0,
		"Hylle" : "D01"
	},
	{
		"VNr" : "12092",
		"Betegnelse" : "Europabarlind",
		"Pris" : 274.50,
		"KatNr" : 14,
		"Antall" : 0,
		"Hylle" : "D01"
	},
	{
		"VNr" : "13001",
		"Betegnelse" : "Glasskuler, 100 gr",
		"Pris" : 44.00,
		"KatNr" : 13,
		"Antall" : 0,
		"Hylle" : "E11"
	},
	{
		"VNr" : "92606",
		"Betegnelse" : "Gipsform nisser 6-14cm",
		"Pris" : 122.00,
		"KatNr" : 13,
		"Antall" : 46,
		"Hylle" : "E11"
	}
]`;

// Enkel variant: Funksjon som presenterer JSON-data
// som HTML-tabell - koden er tilpasset Vare-eksempel.
function lagHTMLVareTabell(vareTab) {
  let str = '<table border="1">';
  str += "<tr>";
  str += "<th>VNr</th>";
  str += "<th>Betegnelse</th>";
  str += "<th>Pris</th>";
  str += "<th>KatNr</th>";
  str += "<th>Antall</th>";
  str += "<th>Hylle</th>";
  str += "</tr>";

  for (let rad of vareTab) {
    str += "<tr>";
    str += `<td>${rad["VNr"]}</td>`;
    str += `<td>${rad["Betegnelse"]}</td>`;
    str += `<td>${rad["Pris"]}</td>`;
    str += `<td>${rad["KatNr"]}</td>`;
    str += `<td>${rad["Antall"]}</td>`;
    str += `<td>${rad["Hylle"]}</td>`;
    str += "</tr>";
  }
  str += "</table>";
  return str;
}

// Generell løsning: Lager HTML-tabell av en vilkårlig
// "databasetabell" representert på JSON-format.
function lagHTMLTabell(tab) {
  let str = '<table border="1">';

  // Lager "overskriftsrad"
  let rad0 = tab[0];
  str += "<tr>";
  for (let attributt in rad0) {
    str += `<th>${attributt}</th>`;
  }
  str += "</tr>";

  // Lager "dataradene"
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

// Gjør om fra JSON (tekst) til objektstruktur
let tab = JSON.parse(jsonTab);

// Lag HTML-tabell av datastrukturen
let htmlStr = lagHTMLTabell(tab);

// Sett inn i div-elementet:
let div = document.getElementById("varetabell");
div.innerHTML = htmlStr;
