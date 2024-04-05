import { City } from "../types";

export const fetchCities = async () => {
  try {
    const response = await fetch(
      "http://localhost:3000/cities"
    );
    const citiesData = await response.json();
    return citiesData;
  } catch (error: any) {
    console.error(error.message);
  }
};

export const fetchCityById = async (
  cityId: string
): Promise<City | null> => {
  try {
    const response = await fetch(
      `http://localhost:3000/cities/${cityId}`
    );

    return await response.json();
  } catch (error: any) {
    console.error(error.message);
    return null;
  }
};
