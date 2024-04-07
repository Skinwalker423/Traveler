import styles from "./City.module.css";
import { formatDate } from "../utils";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchCityById } from "../actions";
import type { City } from "../types";
import Spinner from "./Spinner";
import useLocationContext from "../hooks/useLocationContext";

function City() {
  // TEMP DATA
  const params = useParams();
  const { setIsLoading, isLoading } = useLocationContext();
  const [city, setCity] = useState<City | null>();
  console.log("params", params);
  // const currentCity = {
  //   cityName: "Lisbon",
  //   emoji: "🇵🇹",
  //   date: "2027-10-31T15:59:59.138Z",
  //   notes: "My favorite city so far!",
  // };

  useEffect(() => {
    setIsLoading(true);
    if (params.cityId) {
      fetchCityById(params.cityId)
        .then((data) => {
          setCity(data);
        })
        .finally(() => setIsLoading(false));
    }
  }, [params.cityId, setIsLoading]);

  if (!params.cityId) return null;
  if (isLoading) return <Spinner />;

  console.log("city", city);

  if (!city) return null;

  const { cityName, emoji, date, notes } = city;

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

      <div>{/* <ButtonBack /> */}</div>
    </div>
  );
}

export default City;
