import { City } from "../types";

import styles from "./CityItem.module.css";
import { formatDate } from "../utils";
import { Link } from "react-router-dom";

type CityProps = {
  city: City;
};

const CityItem = ({ city }: CityProps) => {
  const formattedDate = formatDate(city.date);

  return (
    <li>
      <Link
        className={styles.cityItem}
        to={`/app/cities/${city.id}?lat=${city.position.lat}&lng=${city.position.lng}`}
      >
        <span className={styles.emoji}>{city.emoji} </span>
        <h3 className={styles.name}>{city.cityName}</h3>
        <time className={styles.date}>{formattedDate}</time>
      </Link>
    </li>
  );
};

export default CityItem;
