import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import ikon from "leaflet/dist/images/marker-icon.png";
import ikon2x from "leaflet/dist/images/marker-icon-2x.png";
import skygge from "leaflet/dist/images/marker-shadow.png";
import { butikker } from "../lib/butikker.js";

// Kart over de fysiske butikkene, laget med React Leaflet og kartdata fra
// OpenStreetMap (se også mapdemo/react-leaflet).

// Fiks for markørikonet: Leaflet finner standardikonet via en sti i CSS-en,
// og den stien blir feil når Vite bygger appen (filnavnene får en hash).
// Vi importerer derfor bildene selv (over) og gir Leaflet riktige URL-er.
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: ikon,
  iconRetinaUrl: ikon2x,
  shadowUrl: skygge,
});

// Kartutsnittet tilpasses slik at alle butikkene blir synlige.
const alleButikker = L.latLngBounds(butikker.map((b) => b.posisjon));

const Butikker = () => {
  const { t } = useTranslation();
  const [valgt, setValgt] = useState(null);

  // Med ref får vi tak i selve Leaflet-kartobjektet, slik at vi kan
  // styre kartet fra vanlig React-kode (her: fly til en butikk).
  const kartRef = useRef(null);

  const visButikk = (butikk) => {
    setValgt(butikk.id);
    kartRef.current?.flyTo(butikk.posisjon, 15);
  };

  const visAlle = () => {
    setValgt(null);
    kartRef.current?.flyToBounds(alleButikker, { padding: [40, 40] });
  };

  return (
    <div className="space-y-8">
      <div>
        <h1>{t("butikker.tittel")}</h1>
        <p className="mt-2 text-slate-500 dark:text-slate-400">
          {t("butikker.ingress")}
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Liste over butikkene. Klikk flytter kartet til butikken. */}
        <ul className="space-y-3">
          {butikker.map((butikk) => (
            <li key={butikk.id}>
              <button
                onClick={() => visButikk(butikk)}
                className={`w-full rounded-xl border p-4 text-left shadow-sm transition hover:shadow-md ${
                  valgt === butikk.id
                    ? "border-merke-500 bg-merke-50 dark:border-merke-300 dark:bg-slate-700"
                    : "border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800"
                }`}>
                <h3>{butikk.navn}</h3>
                <p className="mt-1 text-sm">{butikk.adresse}</p>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  {t("butikker.åpningstider")}
                </p>
              </button>
            </li>
          ))}
          <li>
            <button onClick={visAlle} className="knapp w-full">
              {t("butikker.visAlle")}
            </button>
          </li>
        </ul>

        {/* relative z-0 holder kartet "under" den faste menyen øverst.
            Leaflet bruker høye z-index-verdier internt. */}
        <div className="relative z-0 h-[28rem] overflow-hidden rounded-xl border border-slate-200 shadow-sm lg:col-span-2 dark:border-slate-700">
          <MapContainer
            ref={kartRef}
            bounds={alleButikker}
            boundsOptions={{ padding: [40, 40] }}
            className="h-full w-full">
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {butikker.map((butikk) => (
              <Marker
                key={butikk.id}
                position={butikk.posisjon}
                eventHandlers={{ click: () => setValgt(butikk.id) }}>
                <Popup>
                  <strong>{butikk.navn}</strong>
                  <br />
                  {butikk.adresse}
                  <br />
                  {t("butikker.åpningstider")}
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default Butikker;
