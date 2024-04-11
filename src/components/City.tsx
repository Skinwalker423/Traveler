import styles from "./City.module.css";
import { formatDate } from "../utils";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import type { City } from "../types";
import Spinner from "./Spinner";
import useLocationContext from "../hooks/useLocationContext";
import Button from "./Button";

function City() {
  // TEMP DATA
  const params = useParams();
  const { isLoading, currentCity, fetchCurrentCity } =
    useLocationContext();
  // const [city, setCity] = useState<City | null>();
  console.log("params", params);

  useEffect(() => {
    if (params.cityId) fetchCurrentCity(params.cityId);
  }, [params.cityId]);

  if (!params.cityId) return null;
  if (isLoading) return <Spinner />;

  if (!currentCity) return null;

  const { cityName, emoji, date, notes } = currentCity;

  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City name</h6>
        <h3>
          <span>{emoji}</span> {cityName}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>You went to {cityName} on</h6>
        <p>{formatDate(date || null)}</p>
      </div>

      {notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${cityName}`}
          target='_blank'
          rel='noreferrer'
        >
          Check out {cityName} on Wikipedia &rarr;
        </a>
      </div>

      <div>
        <Button theme='back'>Back</Button>
      </div>
    </div>
  );
}

export default City;
