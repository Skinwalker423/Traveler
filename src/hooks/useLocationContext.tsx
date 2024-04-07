import { useContext } from "react";
import { LocationContext } from "../context/LocationContext";

const useLocationContext = () => {
  const { cities, isLoading, setIsLoading } =
    useContext(LocationContext);
  return {
    cities,
    isLoading,
    setIsLoading,
  };
};

export default useLocationContext;
