# Kart på web

Denne mappen inneholder undermapper som demonstrer grunnleggende kartfunksjonalitet i en webapplikasjon. Hver undermappe blir kort beskrevet under. Jeg har valgt å jobbe med følgende teknologier:

- **Leaflet** er et JavaScript-bibliotek for å lage interaktive kart med funksjoner som zooming, panorering, markører og popups.
- **OpenStreetMap** er et eksempel på åpne kartdata, som kan brukes med blant annet Leaflet.
- **React Leaflet** er (som navnet antyder) et bibliotek som integrerer Leaflet med React.

Dere står fritt til å velge andre løsninger, f.eks. **OpenLayers** eller **Google Maps API**.

**Tips**: For å bli kjent med "kartprogrammering" kan det være lurt å lage noen helt enkle varianter først, der man kun bygger løsningen med **HTML**, **CSS** og **JavaScript**. Deretter kan man integrere kartfunksjonaliteten med **React**. Det er også strategien valgt her.

**Geografiske data** er informasjon som er knyttet til bestemte steder på jordens overflate, og kan beskrive både selve terrenget med f.eks. hav, land, forskjellige arealtyper, høydekurver og fjelltopper, men også "objekter" som veier, stier og bygninger. Slike data blir ofte organisert i flere **lag** (**layers**) som kan slås av og på.

## Minimal Leaflet-demo (leaflet-demo)

Dette er den aller enkleste løsningen.

- Den består av en HTML-fil (med inline CSS) og en tilhørende JavaScript-fil.
- Leaflet-biblioteket blir lenket inn fra unpkg (CDN).
- Løsningen bruker kartdata fra OpenStreetMap.

Nettsiden viser et kart over et ganske lite område sentrert ved Lifjellstua, tegner noen få grafikk-objekter i kartutsnittet (markør, sirkel og polylinje) og demonstrerer hvordan man kan fange museklikk i kartet.

## Leaflet med "layers" (leaflet-layers)

Denne er bygd opp på samme måte som leaflet-demo, men demonstrerer hvordan man kan organisere et kart i flere "lag" (layers).

- Basiskartet (terrenget) er hentet fra OpenStreetMap som før.
- Oppå der blir det lagt til en layer med tre markører (tenk hytter).
- "Topplaget" kan skrus av og på med en egen kontroll.

## Leaflet med GeoJSON (leaflet-geojson)

Denne ligner på leaflet-layers, men her blir det lagt til lag for hytter og stier, representert på GeoJSON-formatet.

Tenk at dere lagrer data om hytter og stier i databasen.

## React + Leaflet (react-leaflet)

En enkel kart-demo som kombinerer React og kart-biblioteket Leaflet med data fra OpenStreetMap.

- Først laget jeg en "tom" React-løsning med Vite som byggeverktøy.
- Installerte deretter React og React Leaflet
- Selve kartet er laget som en React-komponent og tatt inn på nettsiden ved hjelp av hook-en useRef.

Løsningen er inspirert fra følgende tutorial:

- https://medium.com/@timndichu/getting-started-with-leaflet-js-and-react-rendering-a-simple-map-ef9ee0498202

## Data fra Statens Kartverk (leaflet-statens-kartverk)

En variant av det enkle demo-programmet, men plugger inn data fra Statens Kartverk i stedet.

## OpenLayers (open-layers-demo)

Demokode som viser bruk av OpenLayers (alternativ til Leaflet) og bruk av data fra Statens Kartverk.
