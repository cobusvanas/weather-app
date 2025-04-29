import { WeatherType } from '../types/weatherTypes';

export const setCachedWeatherData = (data: WeatherType, lat: number, lon: number) => {
  const timestamp = Date.now();
  try {
    localStorage.setItem(`cachedWeatherData_${lat}_${lon}`, JSON.stringify({ data, timestamp }));
  } catch (error) {
    console.error('Error setting cached weather data:', error);
  }
};

export const getCachedWeatherData = (lat: number, lon: number) => {
  try {
    const now = Date.now();
    const cachedItem = localStorage.getItem(`cachedWeatherData_${lat}_${lon}`);

    const cachedData = cachedItem ? JSON.parse(cachedItem) : null;

    // Check if the cached data is still valid (30 minutes)
    if (cachedData && now - cachedData.timestamp < 1800000) {
      return cachedData.data;
    }
  } catch (error) {
    console.error('Error getting cached weather data:', error);
  }
  return null;
};
