import "./style.css";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
// Fjern OSM-importen hvis du ikke skal bruke den:
// import OSM from 'ol/source/OSM';

// Legg til WMTS-støtte
import WMTS from "ol/source/WMTS";
import WMTSTileGrid from "ol/tilegrid/WMTS";
import { fromLonLat, get as getProjection } from "ol/proj";
import { getTopLeft, getWidth } from "ol/extent";

// Sett opp WMTS tilegrid for EPSG:3857
const projection = getProjection("EPSG:3857");
const projectionExtent = projection.getExtent();
const size = getWidth(projectionExtent) / 256;
const resolutions = new Array(14);
const matrixIds = new Array(14);
for (let z = 0; z < 14; ++z) {
  resolutions[z] = size / Math.pow(2, z);
  matrixIds[z] = "EPSG:3857:" + z;
}

// Kartverket N50 (topo4) som bakgrunn
const kartverketTopo = new TileLayer({
  source: new WMTS({
    url: "https://opencache.statkart.no/gatekeeper/gk/gk.open_wmts?",
    layer: "topo4",
    matrixSet: "EPSG:3857",
    format: "image/png",
    style: "default",
    attributions: "Kartgrunnlag: © Kartverket",
    crossOrigin: "anonymous",
    tileGrid: new WMTSTileGrid({
      origin: getTopLeft(projectionExtent),
      resolutions,
      matrixIds,
    }),
  }),
});

const map = new Map({
  target: "map",
  layers: [kartverketTopo],
  view: new View({
    center: fromLonLat([10.75, 59.91]), // Oslo
    zoom: 6,
  }),
});
