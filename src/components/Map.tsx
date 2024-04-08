import {
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import styles from "./Map.module.css";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
} from "react-leaflet";

const Map = () => {
  const [searchParams, setSearcghParams] =
    useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  const navigate = useNavigate();

  const updateUrl = (lat: string, lng: string) => {
    setSearcghParams({
      lat,
      lng,
    });
  };
  console.log("nav", navigate, lat, lng, updateUrl);
  if (!lat || !lng) return null;

  return (
    <MapContainer
      className={styles.mapContainer}
      center={[parseInt(lat), parseInt(lng)]}
      zoom={13}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      <Marker position={[parseInt(lat), parseInt(lng)]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
