import {
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import styles from "./Map.module.css";

const Map = () => {
  const [searchParams, setSearcghParams] =
    useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  const navigate = useNavigate();
  console.log("nav", navigate);

  const updateUrl = (lat: string, lng: string) => {
    setSearcghParams({
      lat,
      lng,
    });
  };

  return (
    <div className={styles.mapContainer}>
      <h2>Map Coordinates:</h2>
      <p>Lat: {lat}</p>
      <p>Long: {lng}</p>
      <button onClick={() => updateUrl("25.5", "20")}>
        Update
      </button>
      <div
        role='presentation'
        onClick={() => {
          navigate(`/app/form?lat=${lat}&lng=${lng}`);
          console.log("clicked");
        }}
        className={styles.mapTest}
      ></div>
    </div>
  );
};

export default Map;
