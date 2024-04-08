import { useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
} from "react-leaflet";
import useLocationContext from "../hooks/useLocationContext";
import { useEffect, useState } from "react";

const Map = () => {
  const [searchParams, setSearcghParams] =
    useSearchParams();
  const { cities } = useLocationContext();

  const [position, setPosition] =
    useState<[lat: number, lng: number]>();

  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  useEffect(() => {
    if (lat && lng)
      setPosition([parseInt(lat), parseInt(lng)]);
  }, [lat, lng]);

  const updateUrl = (lat: string, lng: string) => {
    setSearcghParams({
      lat,
      lng,
    });
  };
  console.log("nav", updateUrl, setPosition);
  if (!position) return null;

  return (
    <div className={styles.mapContainer}>
      <MapContainer
        className={styles.map}
        center={position}
        zoom={8}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'
        />
        {cities.map((city) => {
          return (
            <Marker
              key={city.id}
              position={[
                city.position.lat,
                city.position.lng,
              ]}
            >
              <Popup>{city.notes}</Popup>
            </Marker>
          );
        })}
        <ChangeCenter position={position} />
      </MapContainer>
    </div>
  );
};

export const ChangeCenter = ({
  position,
}: {
  position: [lat: number, lng: number];
}) => {
  const map = useMap();
  map.setView(position);
  return null;
};

export default Map;
