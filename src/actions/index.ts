import { City } from "../types";

export const fetchCities = async () => {
  try {
    const response = await fetch(
      "http://localhost:3000/cities"
    );
    const citiesData = await response.json();
    return citiesData as City[];
  } catch (error: any) {
    console.error(error.message);
  }
};

export const createCity = async (newCity: City) => {
  if (!newCity) return;
  try {
    const response = await fetch(
      "http://localhost:3000/cities",
      {
        body: JSON.stringify(newCity),
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    console.log("data after create city", data);
    return data;
  } catch (error: any) {
    console.error(error.message);
  }
};

// export const fetchCityById = async (
//   cityId: string
// ): Promise<City | null> => {
//   try {
//     const response = await fetch(
//       `http://localhost:3000/cities/${cityId}`
//     );

//     return await response.json();
//   } catch (error: any) {
//     console.error(error.message);
//     return null;
//   }
// };
