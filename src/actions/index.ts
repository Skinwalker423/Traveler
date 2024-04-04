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
