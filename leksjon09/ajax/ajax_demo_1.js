let xmlhttp;

function settInnAvsnitt() {
  // Hvis vi har fått alle data og OK, oppdateres nettsiden
  if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
    document.getElementById("avsnitt").innerHTML = xmlhttp.responseText;
  }
}

function haandterKlikk() {
  // Oppretter request
  xmlhttp = new XMLHttpRequest();

  // Knytter til "callback-funksjonen"
  xmlhttp.onreadystatechange = settInnAvsnitt;

  // Sender GET-forespørsel asynkront og "bak kulissene"
  xmlhttp.open("GET", "nytt_avsnitt.html", true);
  xmlhttp.send();
}

// Legger til en lytter - må kjøres etter at DOM-treet er bygd opp
document.getElementById("knapp").addEventListener("click", haandterKlikk);
