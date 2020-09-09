"use strict";

function leggTilLukkeKryss(elem) {
    let span = document.createElement("span");
    let txt = document.createTextNode("\u00D7");
    span.className = "lukk";
    span.appendChild(txt);
    elem.appendChild(span);
}

function leggTilLukkeKryssPåAlle() {
    let oppgaver = document.getElementsByTagName("li");
    for (let i = 0; i < oppgaver.length; i++) {
        let oppgave = oppgaver[i];
        leggTilLukkeKryss(oppgave);
    }
}

function håndterLukking(event) {
    let listeelem = this.parentElement;
    listeelem.style.display = "none";
}

function regLukkeLyttere() {
    let lukkeKnapper = document.getElementsByClassName("lukk");
    for (let i = 0; i < lukkeKnapper.length; i++) {
        let knapp = lukkeKnapper[i];
        knapp.addEventListener("click", håndterLukking);
    }
}

function merkSomFerdig(event) {
    // this.classList.toggle('utført');

    if (event.target.tagName == "LI") { // Ikke "li"!
        event.target.classList.toggle('utført');
    }
}

function leggTilUtførtLyttere() {

    // let oppgaver = document.getElementsByTagName("li");
    // for (let i = 0; i < oppgaver.length; i++) {
    //     oppgaver[i].addEventListener('click', merkSomFerdig);
    // }
    
    let liste = document.querySelector("ul");
    liste.addEventListener('click', merkSomFerdig);
}

function nyttElement(event) {
    let li = document.createElement("li");
    let oppg = document.getElementById("oppgave");
    let inndata = oppg.value;

    if (inndata === '') {
        let melding = document.getElementById("melding");
        melding.innerHTML = "Du glemte å skrive hva du skulle huske på!";
    } else {
        let t = document.createTextNode(inndata);
        li.appendChild(t);
        document.getElementById("huskeliste").appendChild(li);
        oppg.value = "";
        oppg.focus();
    }

    leggTilLukkeKryss(li);
}

function vedFokus(event) {
    let melding = document.getElementById("melding");
    melding.innerHTML = "";
}

function leggTilFokusLytter() { // Eller bruke en modal dialog?
    let oppg = document.getElementById("oppgave");
    oppg.addEventListener("focus", vedFokus);
}

// Alternativ løsning med bruk av onfocus
function leggTilFokusLytter2() {
    let oppg = document.getElementById("oppgave");
    oppg.onfocus = vedFokus;
}

// Alternativ løsning med bruk av anonym funksjon
function leggTilFokusLytter3() {
    let oppg = document.getElementById("oppgave");
    oppg.addEventListener("focus", (event) => {
        let melding = document.getElementById("melding");
        melding.innerHTML = "";
    });
}

function initPage(event) {
    // console.log("DOM is loaded!");
    // debugger;

    leggTilLukkeKryssPåAlle();
    regLukkeLyttere();
    leggTilUtførtLyttere();
    leggTilFokusLytter();

    let ny = document.getElementById("nyKnapp");
    ny.addEventListener("click", nyttElement);
}


window.addEventListener("load", initPage);

// Prøv å utføre setningene inne i initPage
// med og uten defer på importen i HTML-filen.
// Og sjekk feilmeldinger i konsollet.

// Med defer trenger vi strengt tatt ikke
// "å beskytte" initPage med linje 108.
