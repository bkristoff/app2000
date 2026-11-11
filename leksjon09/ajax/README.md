# AJAX-demo

Disse demo-programmene må kjøres på en webtjener, ellers får man en såkalt CORS-feil.

Spesielt interesserte kan lese mer om det her:

- https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS/Errors/CORSRequestNotHttp?utm_source=devtools&utm_medium=firefox-cors-errors&utm_campaign=default

Den enkle løsningen er å kopiere demo-programmene og hjelpefilene ut på en webtjener som itfag.usn.no (med f.eks. FileZilla), eller man kan starte en lokal webtjener, og det aller enkleste er bare å bruke "preview" i VS Code.

Eller man kan programmere en webtjener med Node.js og kjøre filene via denne. Mappen som heter node inneholder flere eksempler på dette, filen som heter demo_2.js kan brukes til dette. Oppskriften blir:

- Kopier filene fra denne mappen (ajax) ned i mappen node.
- Åpne mappen node i VS Code
- Start webtjeneren: node ./demo_2.js
- Åpne nettleseren på adresse http://localhost:8080/ajax_demo_1.html (og tilsvarende for resten av demo-programmene)

## Forutsetning

Demo-program 2 kommuniserer med tjenerdelen av nettbutikken, så man må først starte MySQL-databasen, og deretter butikk-tjener (`node server.js` i mappen nettbutikk/butikk-tjener). Åpne så ajax_demo_2.html.

Siden demo-siden og tjeneren kjører på ulike adresser (porter), må tjeneren tillate kall fra andre "origins" (CORS). Dette er allerede gjort i nettbutikk/butikk-tjener/server.js med npm-pakken cors:

```js
import cors from "cors";

// Godta kall fra alle klienter:
app.use(cors({ origin: "*" }));
```

I en reell løsning bør man bare tillate de klientene man stoler på, f.eks. `cors({ origin: "http://localhost:5173" })`.
