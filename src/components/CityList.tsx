import { useEffect, useState } from "react";
import styles from "./CityList.module.css";

const CityList = () => {
  const [cities, setCities] = useState<any>([]);

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
    return <p key={city.id}>{city.cityName}</p>;
  });

  return (
    <ul className={styles.cityList}>{renderCities}</ul>
  );
};

export default CityList;
