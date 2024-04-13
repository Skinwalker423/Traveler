import {
  ReactNode,
  createContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { City } from "../types";

interface LocationContextType {
  state: StateProps;
  dispatch: React.Dispatch<Actions>;
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
  error?: string;
}

const initialState: StateProps = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: "",
};

export type ActionsMap = {
  "cities/loaded": City[];
  "cities/created": City;
  "cities/deleted": string;
  loading: undefined;
  rejected: string;
  "cities/currentCity": City;
};

export type Actions = {
  [Key in keyof ActionsMap]: {
    type: Key;
    payload: ActionsMap[Key];
  };
}[keyof ActionsMap];

function reducer(state: StateProps, action: Actions) {
  switch (action.type) {
    case "loading":
      return {
        ...state,
        isLoading: true,
      };
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
    case "cities/currentCity":
      return {
        ...state,
        currentCity: action.payload,
      };

    case "rejected":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
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
      return;
    }
    try {
      dispatch({ type: "loading", payload: undefined });
      const response = await fetch(
        `http://localhost:3000/cities/${cityId}`
      );

      const data: City = await response.json();
      dispatch({
        type: "cities/currentCity",
        payload: data,
      });
    } catch (error: any) {
      console.error(error.message);
      dispatch({
        type: "rejected",
        payload:
          error?.message || "problem getting current city",
      });
    }
  };

  useEffect(() => {
    const fetchCities = async () => {
      dispatch({
        type: "loading",
        payload: undefined,
      });
      try {
        const response = await fetch(
          "http://localhost:3000/cities"
        );
        const citiesData: City[] = await response.json();

        dispatch({
          type: "cities/loaded",
          payload: citiesData,
        });
      } catch (error: any) {
        console.error(error.message);
        dispatch({
          type: "rejected",
          payload:
            error?.message || "problem loading cities",
        });
      }
    };
    fetchCities();
  }, []);

  const value = {
    state,
    dispatch,
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
