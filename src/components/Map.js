import React from "react";

import { MapContainer, TileLayer } from "react-leaflet";

import { showDataOnMap } from "../hooks/utils";

import "./Map.css";

const Map = ({ countries, center, zoom, casesType }) => {
  return (
    <div className="Map">
      <MapContainer center={center} zoom={zoom}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {showDataOnMap(countries, casesType)}
      </MapContainer>
    </div>
  );
};

export default Map;
