import { City } from "../types";

import styles from "./CityItem.module.css";
import { formatDate } from "../utils";
import { Link } from "react-router-dom";
import useLocationContext from "../hooks/useLocationContext";

type CityProps = {
  city: City;
};

const CityItem = ({ city }: CityProps) => {
  const formattedDate = formatDate(city.date);
  const { currentCity } = useLocationContext();

  const isActive = currentCity?.id === city.id;

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/cities/${city.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      console.log("city deleted", data);
    } catch (error) {}
  };

  return (
    <li
      className={`${
        isActive && styles["cityItem--active"]
      }`}
    >
      <Link
        className={styles.cityItem}
        to={`/app/cities/${city.id}?lat=${city.position.lat}&lng=${city.position.lng}`}
      >
        <span className={styles.emoji}>{city.emoji} </span>
        <h3 className={styles.name}>{city.cityName}</h3>
        <time className={styles.date}>{formattedDate}</time>
        <button
          className={styles.deleteBtn}
          onClick={handleDelete}
        >
          &times;
        </button>
      </Link>
    </li>
  );
};

export default CityItem;
