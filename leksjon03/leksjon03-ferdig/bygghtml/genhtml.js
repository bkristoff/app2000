// Løsningsforslag til oppgave 2 (første punkt) i leksjon 3

// En funksjon som lager et h1-element med gitt tittel
function createHeader(title) {
  const h1 = document.createElement("h1");
  h1.textContent = title;
  return h1;
}

// Event-funksjon som legger til et h1-element i en div
function addHeaderToDiv(event) {
  const div = document.querySelector("#content");
  const h1 = createHeader("Demo page");
  div.appendChild(h1);
}

// Alternativ funksjon som også bygger en overskrift,
// men nå som en tekststreng.
function createHeaderStr(str) {
  return `<h1>${str}</h1>`;
}

// Event-funksjon som legger til et h1-element i en div,
// men som bruker den alternative metoden.
function addHeaderStrToDiv(event) {
  const div = document.querySelector("#content");
  const str = createHeaderStr("Demo page 2");

  // I denne løsningen blir HTML-koden tolket
  // før vi (som over) får et ekte h1-element i DOM-treet.
  div.innerHTML += str;

  // Merk: += for å legge til, ikke overskrive
  // Dermed får vi begge overskriftene
}

const btn = document.querySelector("#btn");

// Registrerer begge event-funksjonene som lyttere
btn.addEventListener("click", addHeaderToDiv);
btn.addEventListener("click", addHeaderStrToDiv);
