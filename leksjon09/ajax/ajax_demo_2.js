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

// Hent varetabell ved hjelp av AJAX-kall med XMLHttpRequest
function hentJSON(str) {
  let xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      let tab = JSON.parse(xmlhttp.responseText);
      let htmlStr = lagHTMLTabell(tab);
      document.getElementById("datadiv").innerHTML = htmlStr;
    }
  };
  xmlhttp.open("GET", "http://localhost:3030/varer", true);
  xmlhttp.send();
}

document.getElementById("knapp").addEventListener("click", hentJSON);
