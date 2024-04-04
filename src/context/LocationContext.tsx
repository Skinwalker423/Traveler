import {
  ReactNode,
  createContext,
  useEffect,
  useState,
} from "react";
import { City } from "../types";

export const LocationContext = createContext({});

export const LocationProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
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

  const value = {
    cities,
  };

  return (
    <LocationContext.Provider value={value}>
      {children}
    </LocationContext.Provider>
  );
};
