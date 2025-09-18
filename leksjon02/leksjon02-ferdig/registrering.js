"use strict";

function sjekkSkjema(e) {
  // Avleser det brukeren har skrevet i fornavn-feltet:
  let fornavn = document.querySelector("#fornavn").value;

  if (fornavn.length < 5) {
    alert("For kort fornavn " + fornavn + "!");
    e.preventDefault(); // Hindrer at skjemaet sendes
    return false;
  }
  return true; // Skjemaet kan sendes
}

// Fordi vi bruker defer i HTML-filen er DOM'en bygd opp når vi kommer hit.

// Får tak i skjemaet og legger til en lytter for klikk på submit-knappen:
let skjema = document.querySelector("form");
skjema.addEventListener("submit", sjekkSkjema);
