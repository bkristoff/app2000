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

Ett av demo-programmene kommuniserer med tjenerdelen av nettbutikken, så man må først starte MySQL-databasen, deretter butikk-tjener og til slutt kjøre klienten.

Man må også gjøre en liten justering i nettbutikken. Installer npm-pakken cors og legg til følgende på passende sted i fil server.js:
