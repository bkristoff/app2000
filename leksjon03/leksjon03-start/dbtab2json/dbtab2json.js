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
  // Lag overskriftsrad her
  str += "</tr>";

  for (let rad of vareTab) {
    str += "<tr>";
    // Lag en datarad her (en tr med td-elementer for hver verdi i denne raden)
    str += "</tr>";
  }
  str += "</table>";
  return str;
}

// Generell løsning: Lager HTML-tabell av en vilkårlig
// databasetabell/spørreresultat representert på JSON-format.
// Merk at parameteren nå kalles for tab (og ikke vareTab som over).
function lagHTMLTabell(tab) {
  let str = '<table border="1">';

  // Lag overskriftsrad uten å "hardkode" kolonnenavn.
  // Tips: Kolonnenavnene er en del av JSON-dataene.

  // Løkke som lager tr-elementer for alle dataradene.

  str += "</table>";
  return str;
}

// Gjør om fra JSON (tekst) til objektstruktur

// Lag HTML-tabell av datastrukturen

// Sett inn i div-elementet:
