// De (tenkte) fysiske butikkene til Hobbyhuset.
//
// Posisjonen er gitt som [breddegrad, lengdegrad] (latitude, longitude),
// slik Leaflet vil ha det. NB! GeoJSON bruker motsatt rekkefølge
// (lengdegrad først), se mapdemo/leaflet-geojson.
//
// I en reell løsning ville disse dataene ligget i databasen og blitt
// hentet fra tjeneren med fetch, akkurat som varene (se lib/api.js).

export const butikker = [
  {
    id: "bo",
    navn: "Hobbyhuset Bø",
    adresse: "Hobbyveien 1, 3800 Bø i Telemark",
    posisjon: [59.4105, 9.0665],
  },
  {
    id: "notodden",
    navn: "Hobbyhuset Notodden",
    adresse: "Modellgata 12, 3674 Notodden",
    posisjon: [59.5594, 9.2585],
  },
  {
    id: "porsgrunn",
    navn: "Hobbyhuset Porsgrunn",
    adresse: "Limstiften 5, 3915 Porsgrunn",
    posisjon: [59.1405, 9.6561],
  },
  {
    id: "drammen",
    navn: "Hobbyhuset Drammen",
    adresse: "Penselveien 3, 3015 Drammen",
    posisjon: [59.744, 10.2045],
  },
];
