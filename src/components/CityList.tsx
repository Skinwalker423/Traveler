import { useContext } from "react";
import styles from "./CityList.module.css";
import CityItem from "./CityItem";
import { LocationContext } from "../context/LocationContext";
import Spinner from "./Spinner";

const CityList = () => {
  const { cities, isLoading } = useContext(LocationContext);

  if (isLoading) return <Spinner />;

  if (!cities.length) return null;

  const renderCities = cities.map((city) => {
    return <CityItem city={city} key={city.id} />;
  });

  return (
    <ul className={styles.cityList}>{renderCities}</ul>
  );
};

export default CityList;
