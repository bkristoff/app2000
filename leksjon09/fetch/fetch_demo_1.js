// For at dette skal fungere må butikk-tjener kjøre (node server.js),
// og tjeneren må tillate kall fra andre "origins" (CORS). Det er allerede
// gjort i server.js med: app.use(cors({ origin: "*" }));

// Henter (GET) JSON-data fra gitt URL med Fetch API.
// NB! fetch kaster bare unntak ved nettverksfeil (f.eks. at tjeneren ikke
// kjører). Ved feilkode som 404 eller 500 må vi selv sjekke res.ok.
async function getData(url) {
  let res = await fetch(url);
  if (!res.ok) {
    throw new Error(`HTTP-feil ${res.status}`);
  }
  return await res.json();
}

// Trekker ut og viser vnr og navn for hver vare
async function visJSON() {
  let datadiv = document.querySelector("#datadiv");
  try {
    let varer = await getData("http://localhost:3030/varer");
    let html = "";
    varer.forEach((vare) => {
      html += `<p>${vare.VNr} ${vare.Betegnelse}</p>`;
    });
    datadiv.innerHTML = html;
  } catch (error) {
    // Vises f.eks. hvis butikk-tjener ikke kjører.
    datadiv.textContent = "Noe gikk galt: " + error.message;
  }
}

document.getElementById("knapp").addEventListener("click", visJSON);
