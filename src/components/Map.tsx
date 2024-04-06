import { useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";

const Map = () => {
  const [searchParams, setSearcghParams] =
    useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

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
    </div>
  );
};

export default Map;
