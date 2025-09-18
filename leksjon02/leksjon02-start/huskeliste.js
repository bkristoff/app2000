"use strict";

function initPage(event) {
  console.log("DOM is loaded!");
}

window.addEventListener("load", initPage);

// Prøv å utføre setningene inne i initPage
// med og uten defer på importen i HTML-filen.
// Og sjekk feilmeldinger i konsollet.

// Med defer kunne vi kalle direkte på initPage
// (trenger ikke å vente eksplisitt på window load).
// initPage();
