// Kilde: https://github.com/jhlywa/chess.js/blob/master/README.md

// Koden under bruker chess.js for å spille et tilfeldig sjakkparti.
// Sjakkpartiet (alle trekkene) blir skrevet ut i konsollet på PGN-format.
// Partiet kan visualiseres ved å lime inn PGN-filen f.eks her:
// https://lichess.org/analysis

const { Chess } = require('chess.js');
const chess = new Chess();
 
while (!chess.game_over()) {
    const moves = chess.moves();
    const move = moves[Math.floor(Math.random() * moves.length)];
    chess.move(move);
}

console.log(chess.pgn());

// Denne JavaScript-filen er basert på bruk av Node.js (altså "JavaScript
// på tjenersiden") og npm.
//
// Hvis du har installert Node.js og npm, så kan du kjøre dette fra
// kommandovinduet (Start-menyen og cmd i Windows):
//
// c:
// cd \
// mkdir sjakkdemo3
// cd sjakkdemo3
// npm init
// npm install chess.js
// node c:\sjakkdemo3\index.js
//
// Denne koden og Node.js/npm kan ikke uten videre brukes på klientsiden i
// nettleseren (frontend), blant annet på grunn av setningen på linje 8.
// Vi ser også at hjelpebiblioteket chess.js er plassert langt nede i 
// mappen node_modules. Det finnes verktøy (Babel, Browserify, Webpack)
// som kan "oversette/pakke" JavaScript-koden slik at den kan brukes i
// vanlige frontend web-prosjekter. Det kommer vi tilbake til.
