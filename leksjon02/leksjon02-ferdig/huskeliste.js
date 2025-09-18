"use strict";

function håndterLukking(event) {
  // Når brukeren klikker på krysset,
  // fjerner vi listeelementet (li):
  let listeelem = this.parentElement;
  listeelem.remove();
}

function leggTilLukkeKryss(elem) {
  // Bygger et span-element som inneholder et kryss
  // (unicode-tegn \u00D7):
  let span = document.createElement("span");
  let txt = document.createTextNode("\u00D7");
  span.className = "lukk";

  // Legg span-elementet inn i listeelementet (li)
  // og legg til lytter for klikk på krysset:
  span.appendChild(txt);
  span.addEventListener("click", håndterLukking);
  elem.appendChild(span);
}

function leggTilLukkeKryssPåAlle() {
  // Henter alle listeelementene (li) i dokumentet:
  let oppgaver = document.querySelectorAll("li");

  // Går gjennom alle og legger til lukkekryss:
  for (let i = 0; i < oppgaver.length; i++) {
    let oppgave = oppgaver[i];
    leggTilLukkeKryss(oppgave);
  }
}

function merkSomFerdig(event) {
  // Kommenter inn for testing, og prøv å klikke på
  // forskjellige steder i listeelementet (li), også på lukkekrysset (span):
  // console.log("event.target.tagName=" + event.target.tagName);
  // console.log(this); // ul-elementet

  // Sjekker at det var et listeelement (li) som ble klikket på,
  // og ikke f.eks. lukkekrysset (span):
  if (event.target.tagName == "LI") {
    // Ikke "li"!
    event.target.classList.toggle("utført");
  }
}

function leggTilUtførtLyttere() {
  // Når brukeren klikker på et listeelement (li),
  // skal det markeres som utført (eller fjerne markering).
  // Vi legger til en lytter på hele listen (ul),
  // men sjekker (i metoden merkSomFerdig) om det var
  // et listeelement som ble klikket på:
  let liste = document.querySelector("ul");
  liste.addEventListener("click", merkSomFerdig);
}

function nyttElement(event) {
  // Lager et nytt listeelement (li):
  let li = document.createElement("li");

  // Henter det brukeren skrev i inndata-feltet:
  let oppg = document.querySelector("#oppgave");
  let inndata = oppg.value;

  if (inndata === "") {
    let melding = document.querySelector("#melding");
    melding.innerHTML = "Du glemte å skrive hva du skulle huske på!";
  } else {
    // Lager en tekstnode med det brukeren skrev
    // og legger denne inn i listeelementet (li):
    let t = document.createTextNode(inndata);
    li.appendChild(t);

    // Legger det nye listeelementet (li) inn i listen (ul):
    document.querySelector("#huskeliste").appendChild(li);

    // Tømmer inndata-feltet og setter fokus dit:
    oppg.value = "";
    oppg.focus();
  }

  leggTilLukkeKryss(li); // Legger til lukkekryss på det nye elementet.
}

function vedFokus(event) {
  let melding = document.querySelector("#melding");
  melding.innerHTML = "";
}

function leggTilFokusLytter() {
  // Når inndatafeltet (#oppgave) får fokus,
  // skal tidligere meldinger fjernes (se vedFokus-funksjonen):
  let oppg = document.querySelector("#oppgave");
  oppg.addEventListener("focus", vedFokus);
}

function initPage(event) {
  leggTilLukkeKryssPåAlle();
  leggTilUtførtLyttere();
  leggTilFokusLytter();

  // Legger til lytter for ny-knappen:
  let ny = document.querySelector("#nyKnapp");
  ny.addEventListener("click", nyttElement);
}

// Venter til hele siden er lastet før vi kjører initPage
// (altså et alternativ til defer i script-taggen):
window.addEventListener("load", initPage);
