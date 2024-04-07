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
  const [currentCity, setCurrentCity] = useState<City>();
  const [isLoading, setIsLoading] = useState(false);

  const fetchCurrentCity = async (
    cityId: string
  ): Promise<void> => {
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
  };

  return (
    <LocationContext.Provider value={value}>
      {children}
    </LocationContext.Provider>
  );
};
