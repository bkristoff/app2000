# Leksjon 9. Single Page Web Applications (SPA)

Denne leksjonen handler om å koble sammen frontend og backend, så vi skal nå lage en komplett løsning av nettbutikken.

- Leksjon 9: https://dbsys.info/2000/leksjon09/index.html

Det blir også en introduksjon til kartprogrammering og flerspråklighet.

Eksempelkoden er fordelt på et antall undermapper. Kort forklaring følger, men flere README-filer ligger nede i hver mappe.

## 1. AJAX

AJAX er en programmeringsteknikk som bruker XmlHttpRequest-objektet i nettleseren til å sende asynkrone HTTP-forespørsler til webtjeneren. Dette kan brukes for å bygge SPA-løsninger. Mappen ajax inneholder et antall mini-prosjekter som demonstrerer enkel bruk.

## 2. Fetch API

Mini-programmer som demonstrerer bruk av Fetch API for å kommunisere med nettbutikk-tjeneren.

- Dette er kanskje den mest aktuelle måten å knytte sammen frontend og backend.
- I nåværende versjon av nettbutikken (se under), bruker jeg imidlertid biblioteket Axios.

## 3. Node

Mini-programmer som demonstrerer hvordan man kan lage sin egen webtjener med Node.js.

- Dette er nok av mer teoretisk interesse, men for spesielt interesserte er det kanskje interessant å se hva man kan gjøre med Node.js?

## 4. Next Route Handler

Demoprosjekt for å bygge REST API med Next "route handlers".

- En alternativ teknikk til Express.
- Next er et rammeverk som kan brukes både frontend og backend.

## 5. Nettbutikk

Inneholder undermapper for klient og tjener.

- Viser hvordan de kan kobles sammen med bruk av Axios. Bytt gjerne ut med Fetch.
- Varelageret blir hentet fra databasen med GET-kall.
- Brukerdata blir hentet fra databasen ved innlogging.
- Nye ordrer blir satt inn med POST-kall, og demonstrerer også bruk av transaksjoner (= sammensatte operasjoner mot databasen).

## 6. Kart og useRef

Flere undermapper som viser ulike teknikker for "kartprogrammering".

- Bruker både Leaflet og OpenLayers som bibliotek.
- Bruker kartdata både fra OpenStreetMap og Statens Kartverk.
- Ett eksempel også på innpassing i React.

## 7. Flerspråklighet

En enkel React-demo som viser bruk av i18next for å få til flerspråklighet.
