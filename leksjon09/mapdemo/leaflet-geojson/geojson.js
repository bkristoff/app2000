// Oppretter lag (layer) for terreng fra OpenStreetMap
// Sentrerer kartet på Lifjellstua med passelig zoom-faktor 19
var terreng = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
});

// Tre hytter på GeoJSON-format
const hytterGeoJSON = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: { name: "Hytte 1" },
      geometry: { type: "Point", coordinates: [9.013703, 59.478242] },
    },
    {
      type: "Feature",
      properties: { name: "Hytte 2" },
      geometry: { type: "Point", coordinates: [9.013203, 59.477442] },
    },
    {
      type: "Feature",
      properties: { name: "Hytte 3" },
      geometry: { type: "Point", coordinates: [9.014703, 59.476642] },
    },
  ],
};

// To turstier (mellom Hytte 1–2 og Hytte 2–3) på GeoJSON-format
const stierGeoJSON = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: { name: "Sti 1 (Hytte 1 ↔ Hytte 2)" },
      geometry: {
        type: "LineString",
        coordinates: [
          [9.013703, 59.478242], // Hytte 1
          [9.013203, 59.477442], // Hytte 2
        ],
      },
    },
    {
      type: "Feature",
      properties: { name: "Sti 2 (Hytte 2 ↔ Hytte 3)" },
      geometry: {
        type: "LineString",
        coordinates: [
          [9.013203, 59.477442], // Hytte 2
          [9.014703, 59.476642], // Hytte 3
        ],
      },
    },
  ],
};

// Lager GeoJSON-lag med markører for hytter
const hytterLayer = L.geoJSON(hytterGeoJSON, {
  pointToLayer: (feature, latlng) =>
    L.marker(latlng, { title: feature.properties?.name }),
  onEachFeature: (feature, layer) => {
    if (feature.properties?.name) layer.bindPopup(feature.properties.name);
  },
});

// Lager GeoJSON-lag med stil for stier
const stierLayer = L.geoJSON(stierGeoJSON, {
  style: {
    color: "#006400",
    weight: 4,
    opacity: 0.9,
  },
  onEachFeature: (feature, layer) => {
    if (feature.properties?.name) layer.bindPopup(feature.properties.name);
  },
});

// Oppretter kart-objekt med bakgrunn + GeoJSON-lag
var map = L.map("map", {
  center: [59.477042, 9.013703],
  zoom: 17,
  layers: [terreng, hytterLayer, stierLayer],
});

// Layer control for å kunne skru lag av/på
var terrengKart = { Terreng: terreng };
var overlayKart = {
  Hytter: hytterLayer,
  Turstier: stierLayer,
};
var layerControl = L.control.layers(terrengKart, overlayKart).addTo(map);
