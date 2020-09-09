// Valgte tabellen Ansatt fra Hobbyhuset. Eksporterte til JSON fra
// MySQL Workbench (se Ansatt.json). Utgangspunktet er da følgende
// JSON (merk bruk av ` for å kunne bruke "): 

let jsonTab = `
[
	{
		"AnsNr" : 1,
		"Fornavn" : "Georg",
		"Etternavn" : "Barth",
		"Adresse" : "Kringsjågrenda 3F",
		"PostNr" : "3841",
		"Fødselsdato" : "1982-10-20",
		"Kjønn" : "M",
		"Stilling" : "Lagerleder",
		"Årslønn" : 604900.00
	},
	{
		"AnsNr" : 2,
		"Fornavn" : "Gunnlaug",
		"Etternavn" : "Angeltveit",
		"Adresse" : "Langmyrgrenda 9",
		"PostNr" : "3800",
		"Fødselsdato" : "1969-03-29",
		"Kjønn" : "K",
		"Stilling" : "Markedssjef",
		"Årslønn" : 643200.00
	},
	{
		"AnsNr" : 3,
		"Fornavn" : "Morgan",
		"Etternavn" : "Dalland",
		"Adresse" : "Jansbergveien 19",
		"PostNr" : "3830",
		"Fødselsdato" : "1974-01-10",
		"Kjønn" : "M",
		"Stilling" : "Innkjøper",
		"Årslønn" : 670500.00
	},
	{
		"AnsNr" : 6,
		"Fornavn" : "Vilde",
		"Etternavn" : "Aksnes",
		"Adresse" : "Minister Ditleffs vei 44",
		"PostNr" : "3810",
		"Fødselsdato" : "1977-10-11",
		"Kjønn" : "K",
		"Stilling" : "Databaseadministrator",
		"Årslønn" : 693200.00
	},
	{
		"AnsNr" : 7,
		"Fornavn" : "Henriette",
		"Etternavn" : "Brobakken",
		"Adresse" : "Stubberud Sognsvann 1",
		"PostNr" : "3800",
		"Fødselsdato" : "1971-10-01",
		"Kjønn" : "K",
		"Stilling" : "Daglig leder",
		"Årslønn" : 833800.00
	},
	{
		"AnsNr" : 8,
		"Fornavn" : "Synøve",
		"Etternavn" : "Bakketun",
		"Adresse" : "Vassøyveien 7",
		"PostNr" : "3840",
		"Fødselsdato" : "1985-05-15",
		"Kjønn" : "K",
		"Stilling" : "Kundebehandler",
		"Årslønn" : 518100.00
	},
	{
		"AnsNr" : 9,
		"Fornavn" : "Ragnvald",
		"Etternavn" : "Allum",
		"Adresse" : "Utsikten 4",
		"PostNr" : "3812",
		"Fødselsdato" : "1992-03-07",
		"Kjønn" : "M",
		"Stilling" : "Kundebehandler",
		"Årslønn" : 484700.00
	},
	{
		"AnsNr" : 11,
		"Fornavn" : "Oliver",
		"Etternavn" : "Abrahamsen",
		"Adresse" : "Tarjei Vesaas' vei 3A",
		"PostNr" : "3812",
		"Fødselsdato" : "1989-01-20",
		"Kjønn" : "M",
		"Stilling" : "Lagermedarbeider",
		"Årslønn" : 466900.00
	},
	{
		"AnsNr" : 13,
		"Fornavn" : "Oda",
		"Etternavn" : "Cappelen",
		"Adresse" : "Norheimskneiken 12",
		"PostNr" : "3800",
		"Fødselsdato" : "1991-02-28",
		"Kjønn" : "K",
		"Stilling" : "Produktutvikler",
		"Årslønn" : 653100.00
	},
	{
		"AnsNr" : 16,
		"Fornavn" : "Andrine",
		"Etternavn" : "Ebbesen",
		"Adresse" : "Kristianias gate 9",
		"PostNr" : "3800",
		"Fødselsdato" : "1988-12-27",
		"Kjønn" : "K",
		"Stilling" : "Regnskapssekretær",
		"Årslønn" : 532300.00
	},
	{
		"AnsNr" : 17,
		"Fornavn" : "Karl Anton",
		"Etternavn" : "Hoff",
		"Adresse" : "Furustia 3",
		"PostNr" : "3840",
		"Fødselsdato" : "1997-08-03",
		"Kjønn" : "M",
		"Stilling" : "Kundebehandler",
		"Årslønn" : 472300.00
	},
	{
		"AnsNr" : 18,
		"Fornavn" : "Johanna",
		"Etternavn" : "Li",
		"Adresse" : "Krogsteinveien 101A",
		"PostNr" : "3841",
		"Fødselsdato" : "1996-05-17",
		"Kjønn" : "K",
		"Stilling" : "Kundebehandler",
		"Årslønn" : 478600.00
	}
]
`;


// Hjelpefunksjon som gjør hele jobben, altså konverterer en
// "databasetabell" til HTML-presentasjon:
function lagHTMLTabell(tab) {
	let str = "<table>";

	// Bruker nøklene i første rad som overskrifter
	let rad0 = tab[0];
	for (kol in rad0) {
		str += `<th>${kol}</th>`;
	}

	// Lager radene
	for (rad of tab) {
	  str += "<tr>";
	  for (attributt in rad) {
		  str += `<td>${rad[attributt]}</td>`;
	  }
	  str += "</tr>";
	}

	str += "</table>";
	return str;
}


// "Hovedprogrammet":
let tab = JSON.parse(jsonTab); // Fra JSON til datastruktur
let htmlStr = lagHTMLTabell(tab); // Fra datastruktur til HTML
let div = document.getElementById("tabell"); // Få tak i div'en
div.innerHTML = htmlStr; // Sett inn HTML-tabellen

// Koden fungerer for en vilkårlig tabell / spørreresultat.
