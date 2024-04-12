import {
  ReactNode,
  createContext,
  useEffect,
  useState,
} from "react";
import { City } from "../types";

interface LocationContextType {
  cities: City[];
  isLoading: boolean;
  currentCity?: City;
  fetchCurrentCity: (cityId: string) => Promise<void>;
  addCityToList: (city: City) => void;
  removeCityFromList: (cityId: string) => void;
}

export const LocationContext = createContext(
  {} as LocationContextType
);

export const LocationProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [cities, setCities] = useState<City[]>([]);
  const [currentCity, setCurrentCity] = useState<
    City | undefined
  >();
  const [isLoading, setIsLoading] = useState(false);

  const addCityToList = (city: City) => {
    setCities((cities) => [...cities, city]);
  };
  const removeCityFromList = (cityId: string) => {
    const filteredCities = cities.filter(
      (city) => city.id !== cityId
    );
    setCities(filteredCities);
  };

  const fetchCurrentCity = async (
    cityId: string
  ): Promise<void> => {
    if (!cityId) {
      setIsLoading(false);
      return;
    }
    try {
      setIsLoading(true);
      const response = await fetch(
        `http://localhost:3000/cities/${cityId}`
      );

      const data = await response.json();
      setCurrentCity(data);
    } catch (error: any) {
      console.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchCities = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          "http://localhost:3000/cities"
        );
        const citiesData = await response.json();

        setCities(citiesData);
      } catch (error: any) {
        console.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCities();
  }, []);

  const value = {
    cities,
    isLoading,
    currentCity,
    fetchCurrentCity,
    addCityToList,
    removeCityFromList,
  };

  return (
    <LocationContext.Provider value={value}>
      {children}
    </LocationContext.Provider>
  );
};
