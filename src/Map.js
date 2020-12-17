import React from "react";
import "./Map.css";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import { drawDataOnMap } from "./util";


// change map center and zoom value when country is changed
function ChangeMap({ center, zoom }) {
  const map = useMap();
  map.setView(center, zoom);
  return null;
}


function Map({ countries, casesType, center, zoom }) {
  return (
    <div className="map">
    <MapContainer className="map__mapView">
    <ChangeMap center={center} zoom={zoom}/>
    <TileLayer
      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    {/* loop through countries and draw circles to indicate infected areas */}
    {drawDataOnMap(countries, casesType)}
    </MapContainer>
    </div>
  );
}

export default Map;