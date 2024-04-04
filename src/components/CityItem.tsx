import { City } from "../types";

import styles from "./CityItem.module.css";
import { formatDate } from "../utils";

type CityProps = {
  city: City;
};

const CityItem = ({ city }: CityProps) => {
  const formattedDate = formatDate(city.date);

  return (
    <li className={styles.cityItem}>
      <span className={styles.emoji}>{city.emoji} </span>
      <h3 className={styles.name}>{city.cityName}</h3>
      <time className={styles.date}>{formattedDate}</time>
    </li>
  );
};

export default CityItem;
