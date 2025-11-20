function plussEn(e) {
  if (sessionStorage.getItem("teller") != null) {
    sessionStorage.setItem("teller", Number(sessionStorage.getItem("teller")) + 1);
  } else {
    sessionStorage.setItem("teller", 1);
  }
  document.getElementById("knappemelding").innerHTML =
    "Antall klikk: " + sessionStorage.getItem("teller");
}

function hentNavn(e) {
    if (typeof Storage !== "undefined") {
        document.getElementById("navnemelding").innerHTML =
          localStorage.getItem("navn");
      } else {
        document.getElementById("navnemelding").innerHTML =
          "Nettleseren støtter ikke Web Storage.";
      }
}

function oppdaterNavn(e) {
    if (typeof Storage !== "undefined") {
        navn = document.getElementById("navneboks").value;
        localStorage.setItem("navn", navn);
      } else {
        document.getElementById("navnemelding").innerHTML =
        "Nettleseren støtter ikke Web Storage.";
      }
}

document.getElementById("telleKnapp").addEventListener("click", plussEn);
document.getElementById("henteKnapp").addEventListener("click", hentNavn);
document.getElementById("oppdaterKnapp").addEventListener("click", oppdaterNavn);


