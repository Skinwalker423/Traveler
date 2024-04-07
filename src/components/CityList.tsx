import styles from "./CityList.module.css";
import CityItem from "./CityItem";
import Spinner from "./Spinner";
import Message from "./Message";
import useLocationContext from "../hooks/useLocationContext";

const CityList = () => {
  const { cities, isLoading } = useLocationContext();

  if (isLoading) return <Spinner />;

  if (!cities.length)
    return (
      <Message message='Add your first city by clicking on a city on the map' />
    );

  const renderCities = cities.map((city) => {
    return <CityItem city={city} key={city.id} />;
  });

  return (
    <ul className={styles.cityList}>{renderCities}</ul>
  );
};

export default CityList;
