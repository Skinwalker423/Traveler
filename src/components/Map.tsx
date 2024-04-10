import { useNavigate } from "react-router-dom";
import styles from "./Map.module.css";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import useLocationContext from "../hooks/useLocationContext";
import { useEffect, useState } from "react";
import { useGeolocation } from "../hooks/useGeoLocation";
import Button from "./Button";
import useUrlPosition from "../hooks/useUrlPosition";

const Map = () => {
  const { lat, lng } = useUrlPosition();
  const { cities } = useLocationContext();

  const [position, setPosition] =
    useState<[lat: number, lng: number]>();

  const {
    isLoading: isLoadingPosition,
    position: geolocationPosition,
    getPosition,
  } = useGeolocation();

  useEffect(() => {
    if (lat && lng)
      setPosition([parseInt(lat), parseInt(lng)]);
  }, [lat, lng]);
  useEffect(() => {
    if (geolocationPosition)
      setPosition([
        geolocationPosition.lat,
        geolocationPosition.lng,
      ]);
  }, [geolocationPosition]);

  if (!position) return null;

  return (
    <div className={styles.mapContainer}>
      {!geolocationPosition && (
        <Button type='position' onClick={getPosition}>
          {isLoadingPosition
            ? "Loading..."
            : "Use your position"}
        </Button>
      )}
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
        <MapForm />
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

export const MapForm = () => {
  const navigate = useNavigate();
  useMapEvents({
    click(e) {
      navigate(
        `form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`
      );
    },
  });

  return null;
};

export default Map;
