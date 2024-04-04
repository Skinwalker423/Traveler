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
  const [isLoading, setIsLoading] = useState(false);

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

  useEffect(() => {
    fetchCities();
  }, []);

  const value = {
    cities,
    isLoading,
  };

  return (
    <LocationContext.Provider value={value}>
      {children}
    </LocationContext.Provider>
  );
};
