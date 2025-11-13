// Demo av React + Leaflet med Vite som byggeverktøy

import "./App.css";
import React, { useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const Kart = () => {
  const mapRef = useRef(null);
  const latitude = 59.477592;
  const longitude = 9.013953;

  return (
    <MapContainer
      center={[latitude, longitude]}
      zoom={16}
      ref={mapRef}
      style={{ height: "80vh", width: "80vw" }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[latitude, longitude]}>
        <Popup>
          Klikkposisjon: Lat={latitude} Long={longitude}
        </Popup>
      </Marker>
    </MapContainer>
  );
};

function App() {
  return (
    <div>
      <h1>React + Leaflet</h1>
      <Kart />
    </div>
  );
}

export default App;
