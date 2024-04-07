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
  setIsLoading: React.Dispatch<
    React.SetStateAction<boolean>
  >;
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
    setIsLoading,
  };

  return (
    <LocationContext.Provider value={value}>
      {children}
    </LocationContext.Provider>
  );
};
