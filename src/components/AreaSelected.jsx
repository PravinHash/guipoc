import { useEffect, useState } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";

export default function AreaSelect({bounds, setBounds}) {
  const map = useMap();

  useEffect(() => {
    if (!map.selectArea) return;

    map.selectArea.enable();

    map.on("areaselected", (e) => {
      console.log(e.bounds.toBBoxString()); // lon, lat, lon, lat
      setBounds(e.bounds.toBBoxString())
      // L.rectangle(e.bounds, { color: "blue", weight: 1 }).addTo(map);
    });

    const bounds = map.getBounds().pad(-0.25);
    map.selectArea.setValidate((layerPoint) => {
      return bounds.contains(this._map.layerPointToLatLng(layerPoint));
    });

    map.selectArea.setValidate();
  }, [map, setBounds]);

  return null;
}
