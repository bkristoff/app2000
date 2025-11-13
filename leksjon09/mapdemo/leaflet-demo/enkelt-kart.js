// Opprette kart-objekt
var map = L.map("map").setView([59.477042, 9.013703], 17);

// Legge til kartdata (terreng) fra OpenStreetMap
// Sentrerer kartet på Lifjellstua med passelig zoom-faktor 19
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

// Tegner grafikk på kartet, først en "marker"
var marker = L.marker([59.477042, 9.013703]).addTo(map);

// Deretter en sirkel litt ved siden av
var circle = L.circle([59.477592, 9.013953], {
  color: "red",
  fillColor: "#f03",
  fillOpacity: 0.5,
  radius: 10,
}).addTo(map);

// Så en polylinje
var polylinje = L.polyline([
  [59.477042, 9.013703],
  [59.477292, 9.013853],
  [59.477592, 9.013953],
]).addTo(map);

// Håndtere musklikk i kartet, viser posisjon
var popup = L.popup();
function onMapClick(e) {
  popup
    .setLatLng(e.latlng)
    .setContent("Klikkposisjon: " + e.latlng.toString())
    .openOn(map);
}
map.on("click", onMapClick);
