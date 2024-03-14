import { City } from "../types";

type CityProps = {
  city: City;
};

const CityItem = ({ city }: CityProps) => {
  return <div>{city.cityName}</div>;
};

export default CityItem;
