import Spinner from "./Spinner";
import Message from "./Message";

import styles from "./CountryList.module.css";
import CountryItem from "./CountryItem";
import useLocationContext from "../hooks/useLocationContext";

const CountryList = () => {
  const { cities, isLoading } = useLocationContext();

  if (isLoading) return <Spinner />;

  if (!cities.length)
    return (
      <Message message='Add your first city by clicking on a city on the map' />
    );

  let countries: {
    id: string;
    emoji: string;
    country: string;
  }[] = [];

  cities.forEach((city) => {
    if (
      !countries.find(
        (country) => country.country === city.country
      )
    ) {
      countries = [
        ...countries,
        {
          id: city.country,
          country: city.country,
          emoji: city.emoji,
        },
      ];
    }
  });

  return (
    <ul className={styles.countryList}>
      {countries.map((country) => {
        return (
          <CountryItem
            key={country.country}
            country={country}
          />
        );
      })}
    </ul>
  );
};

export default CountryList;
