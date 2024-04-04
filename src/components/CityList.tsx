import { useContext } from "react";
import styles from "./CityList.module.css";
import CityItem from "./CityItem";
import { LocationContext } from "../context/LocationContext";

const CityList = () => {
  const { cities } = useContext(LocationContext);

  console.log("cities", cities);

  if (!cities.length) return null;

  const renderCities = cities.map((city) => {
    return <CityItem city={city} key={city.id} />;
  });

  return (
    <ul className={styles.cityList}>{renderCities}</ul>
  );
};

export default CityList;
