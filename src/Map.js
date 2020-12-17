import React from "react";
import "./Map.css";
import { MapContainer, TileLayer, useMap } from "react-leaflet";


// change map center and zoom value when country is changed
function ChangeMap({ center, zoom }) {
  const map = useMap();
  map.setView(center, zoom);
  return null;
}


function Map({ center, zoom }) {
  return (
    <div className="map">
    <MapContainer>
    <ChangeMap center={center} zoom={zoom}/>
    <TileLayer
      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    </MapContainer>
    </div>
  );
}

export default Map;