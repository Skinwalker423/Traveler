import { useContext } from "react";
import { LocationContext } from "../context/LocationContext";

const useLocationContext = () => {
  const context = useContext(LocationContext);

  if (context === undefined) {
    throw new Error(
      "LocationContext was used outside provider"
    );
  }
  return context;
};

export default useLocationContext;
