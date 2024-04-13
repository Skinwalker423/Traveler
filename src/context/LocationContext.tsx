import {
  ReactNode,
  createContext,
  useEffect,
  useReducer,
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

interface StateProps {
  cities: City[];
  isLoading: boolean;
  currentCity: City | {};
}

const initialState: StateProps = {
  cities: [],
  isLoading: false,
  currentCity: {},
};

function reducer(state: StateProps, action) {
  switch (action.type) {
    case "cities/loaded":
      return {
        ...state,
        isLoading: false,
        cities: action.payload,
      };
    case "cities/created":
      return {
        ...state,
        cities: [...state.cities, action.payload],
      };
    case "cities/deleted":
      const filteredList = state.cities.filter(
        (city) => city.id !== action.payload
      );
      return {
        ...state,
        cities: filteredList,
      };

    default:
      throw new Error("unknown action type");
  }
}

export const LocationProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [state, dispatch] = useReducer(
    reducer,
    initialState
  );

  // const [cities, setCities] = useState<City[]>([]);
  // const [currentCity, setCurrentCity] = useState<
  //   City | undefined
  // >();
  // const [isLoading, setIsLoading] = useState(false);

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
