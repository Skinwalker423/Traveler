import { useEffect, useState } from "react";
import styles from "./CityList.module.css";
import { City } from "../types";
import CityItem from "./CityItem";

const CityList = () => {
  const [cities, setCities] = useState<City[]>([]);

  const fetchCities = async () => {
    const response = await fetch(
      "http://localhost:3000/cities"
    );
    const citiesData = await response.json();
    if (citiesData.length) {
      setCities(citiesData);
    }
    console.log("response", response);
  };

  useEffect(() => {
    fetchCities();
  }, []);

  if (!cities.length) return null;

  const renderCities = cities.map((city) => {
    return <CityItem city={city} key={city.id} />;
  });

  return (
    <ul className={styles.cityList}>{renderCities}</ul>
  );
};

export default CityList;
