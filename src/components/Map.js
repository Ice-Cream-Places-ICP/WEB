import { useEffect, useRef, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import axios from "axios";
import Loading from "./Loading";

const Map = ({ mapData, pinDraggable, setCoordinatesFromPin }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [coordinates, setCoordinates] = useState(null);
  const [zoom] = useState(15);
  const [API_KEY] = useState("vLHKYRibwagmfXcNeclN");
  const [loading, setLoading] = useState(true);

  var marker = new maplibregl.Marker({ draggable: pinDraggable });

  const onDragEnd = () => {
    setCoordinatesFromPin(marker.getLngLat());
  };

  useEffect(() => {
    if (!coordinates) return;
    if (map.current) return;
    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${API_KEY}`,
      center:
        !mapData.location.coordinates[0] || !mapData.location.coordinates[1]
          ? [coordinates[0], coordinates[1]]
          : [mapData.location.coordinates[0], mapData.location.coordinates[1]],
      zoom: zoom,
    });
    map.current.on("load", () => {
      mapContainer.current.style.visibility = "visible";
      setLoading(false);
    });
    map.current.addControl(new maplibregl.NavigationControl(), "top-right");
    console.log(mapData);
    if (!mapData.location.coordinates[0] || !mapData.location.coordinates[1])
      marker.setLngLat([coordinates[0], coordinates[1]]);
    else
      marker.setLngLat([
        mapData.location.coordinates[0],
        mapData.location.coordinates[1],
      ]);

    marker.addTo(map.current);
    marker.on("dragend", onDragEnd);
  }, [coordinates]);

  useEffect(() => {
    const populateCoordinates = async () => {
      if (
        !mapData.location.coordinates[0] ||
        !mapData.location.coordinates[1]
      ) {
        let coord = await axios
          .get(
            `https://api.maptiler.com/geocoding/${mapData.country},${mapData.postCode},${mapData.city},${mapData.streetName},${mapData.streetNumber}.json?key=${API_KEY}`
          )
          .then((response) => response.data.features[0].geometry.coordinates)
          .catch((error) => false);
        if (!coord) {
          coord = await axios
            .get(
              `https://api.maptiler.com/geocoding/${mapData.country},${mapData.city}.json?key=${API_KEY}`
            )
            .then((response) => response.data.features[0].geometry.coordinates)
            .catch((error) => false);
        }
        if (!coord) {
          setCoordinates([0, 0]);
          return;
        }
        setCoordinates(coord);
        console.log(coord);
      } else
        setCoordinates([
          mapData.location.coordinates[0],
          mapData.location.coordinates[1],
        ]);
    };

    populateCoordinates();
  }, []);

  return (
    <div className="map-wrap">
      {loading && <Loading />}
      <div
        ref={mapContainer}
        className="map"
        style={{ visibility: "hidden" }}
      />
    </div>
  );
};

export default Map;
