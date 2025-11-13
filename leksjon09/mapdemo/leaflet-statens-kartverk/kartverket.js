// Opprette lag (layer) for terreng med kart fra Statens Kartverk
// Sentrerer kartet på Lifjellstua med max zoom-faktor 18
var terreng = L.tileLayer(
  "https://cache.kartverket.no/v1/wmts/1.0.0/topo/default/webmercator/{z}/{y}/{x}.png",
  {
    attribution: "© Kartverket",
    maxZoom: 18,
  }
);

// Oppretter layer for 3 hytter
var h1 = L.marker([59.478242, 9.013703]).bindPopup("Hytte 1"),
  h2 = L.marker([59.477442, 9.013203]).bindPopup("Hytte 2"),
  h3 = L.marker([59.476642, 9.014703]).bindPopup("Hytte 3");
var hytter = L.layerGroup([h1, h2, h3]);

// Oppretter kart-objekt med begge layers
var map = L.map("map", {
  center: [59.477042, 9.013703],
  zoom: 17,
  layers: [terreng, hytter],
});

// Oppretter "layer control" for å kunne skru hyttene av og på
var terrengKart = {
  terreng: terreng,
};
var overlayKart = {
  hytter: hytter,
};
var layerControl = L.control.layers(terrengKart, overlayKart).addTo(map);
