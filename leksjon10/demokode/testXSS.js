import { filterXSS } from "xss";

// Tenkt eksempel: Vi har laget en blogg og vil la brukere skrive innlegg.
// Vi vil ikke at brukere skal kunne legge inn HTML eller JavaScript.

// Brukeren skriver dette blogginnlegget inn i et tekstfelt:
const inndata = `Hei verden! <script async>window.alert('XSS');</script>`;

// Vi lagrer følgende i databasen:
const input = `
  <div>
    <p>
    ${inndata}
    </p>
    <p>
    <a href="https://www.example.com">Klikk her</a>
    </p>
  </div>
`;

// Se testXSS.html for hvordan det ser ut i nettleseren til en annen bruker
// når han/hun ser på dette innlegget. Her er HTML-koden som blir lagret i databasen:
console.log(input);

// Løsning: Vi bruker biblioteket xss for å filtrere ut farlig HTML og JavaScript.
// Kan likevel tillate enkelte HTML-elementer og attributter (det kan jo være interessant
// å kunne dele inn i avsnitt og legge inn lenker i et blogginnlegg, for eksempel).
const html = filterXSS(input, {
  whiteList: { p: [], div: [], a: ["href"] }, // kun tillat <p>, <div> og <a href="">
  stripIgnoreTag: true, // fjern HTML-tagger som ikke er i white-listen
  stripIgnoreTagBody: ["script"], // og hele script-elementet
});

// Resultatet: script-elementet er borte, men <p>, <div> og lenken er beholdt.
console.log("Etter filtrering:");
console.log(html);

// Et annet vanlig angrep som IKKE bruker <script>: en hendelsesattributt.
const angrep2 = `<p>Se bildet mitt! <img src="x" onerror="alert('XSS')"></p>`;
console.log("Angrep med onerror:", angrep2);
console.log("Etter filtrering: ", filterXSS(angrep2)); // standard-whitelist fjerner onerror

// Se også testXSSReact.html for hvordan dette ser ut i React.
