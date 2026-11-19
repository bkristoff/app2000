// Demo av Web Storage: sessionStorage og localStorage.
// Alle verdier lagres som strenger.

function plussEn() {
  // getItem gir null hvis nøkkelen ikke finnes; Number(null) er 0.
  const teller = Number(sessionStorage.getItem("teller")) + 1;
  sessionStorage.setItem("teller", teller);
  document.getElementById("knappemelding").textContent = "Antall klikk: " + teller;
}

function hentNavn() {
  const navn = localStorage.getItem("navn");
  // NB! Bruk textContent, ikke innerHTML, for data du ikke har kontroll på.
  // Med innerHTML kan en lagret verdi som <img src=x onerror="alert('XSS')">
  // kjøre JavaScript (XSS). Prøv gjerne å bytte til innerHTML og lagre den verdien!
  document.getElementById("navnemelding").textContent =
    navn ?? "(ingen verdi lagret)";
}

function oppdaterNavn() {
  const navn = document.getElementById("navneboks").value;
  localStorage.setItem("navn", navn);
  document.getElementById("navnemelding").textContent = "Lagret!";
}

document.getElementById("telleKnapp").addEventListener("click", plussEn);
document.getElementById("henteKnapp").addEventListener("click", hentNavn);
document.getElementById("oppdaterKnapp").addEventListener("click", oppdaterNavn);
