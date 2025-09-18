// jsondemo.js

// Kode som demonstrerer bruk av JSON

// Ønsker å vise disse dataene på en del av nettsiden.
// Kan tenke oss at dataene kommer fra en server/database.

// Et mer komplekst objekt
let bok = {
  tittel: "Python",
  kapitler: ["Introduction", "Variables", "..."],
  forfatter: {
    fornavn: "Anthony",
    etternavn: "Logan",
  },
  antallSider: 423,
};
console.log(bok);

// Ved overføring av komplekse datastrukturer over
// nettet, må vi "serialisere" dataene, dvs. å gjøre om
// til tekst. For JSON gjøres det med stringify:
let jsonBok = JSON.stringify(bok);
console.log(jsonBok);

// I andre enden kan vi tolke JSON-teksten med parse
// og bygge opp igjen datastrukturen:
let objBok = JSON.parse(jsonBok);

// Sjekk at du har lovlig JSON, f.eks. her:
// https://json.parser.online.fr/

// Tenk at vi har hentet ut teksten jsonBok fra serveren
// og at vi vil presentere dataene på nettsiden, i en div med id=bok.

// To løsninger: Vi kan lage et HTML-template der vi skyter inn
// verdier fra JSON-objektet, eller vi kan bygge opp HTML
// med DOM-metoder.

// objBok = parsert jsonBok = bok

// Kunne også laget en klasse og lagt til disse som metoder
bok.initialer = function () {
  return this.forfatter.fornavn.charAt(0) + this.forfatter.etternavn.charAt(0);
};

// Hjelpefunksjon for å lage punktliste fra array
function lagListe(tab) {
  let str = "<ul>";
  for (let elem of tab) {
    str += "<li>" + elem + "</li>";
  }
  str += "</ul>";
  return str;
}

// Bruker en templatstring
// ${...} blir "regnet ut" / erstattet

let htmlStr = `<h2>Bok: ${bok.tittel}</h2>
<p>Forfatter: ${bok.forfatterNavn()}</p>
<p>Kapitler:</p>
${lagListe(bok.kapitler)}`;

// Vise på nettsiden (må da lage HTML-siden først)
// let div = document.getElementById("bok");
// div.innerHTML = htmlStr;
console.log(htmlStr);

// Lignende løsning:
// https://www.w3schools.com/js/js_json_html.asp
