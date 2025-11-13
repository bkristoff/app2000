// Henter (GET) JSON-data fra gitt URL med Fetch API
async function getData(url) {
  try {
    let res = await fetch(url);
    return await res.json();
  } catch (error) {
    console.log(error);
  }
}

// Trekker ut og viser vnr og navn for hver vare
//
// For at dette skal fungere bør butikk-tjener kjøre
// og dessuten bør føgende kodelinje i server.js
// app.use(cors({ origin: `http://localhost:3000` }));
// byttes ut med:
// app.use(cors({ origin: `*` })); 

async function visJSON() {
  let varer = await getData("http://localhost:3030/varer");
  let html = "";
  varer.forEach((vare) => {
    let div = `<p>${vare.VNr} ${vare.Betegnelse}</p>`;
    html += div;
  });

  document.querySelector("#datadiv").innerHTML = html;
}

document.getElementById("knapp").addEventListener("click", visJSON);
