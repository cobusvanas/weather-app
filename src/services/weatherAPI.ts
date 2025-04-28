import {WeatherType} from "../types/weatherTypes";
import {transformForecastWeatherData, transformHistoricWeatherData} from "../utils/transformWeatherData";
import {WEATHER_API_KEY} from "../utils/constants";

export const getWeatherData = async (
    latitude: number,
    longitude: number,
    days: number = 4,
    startDate: string = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    endDate: string = new Date().toISOString().split('T')[0],
): Promise<WeatherType> => {
    try {
        const [forecast, historic] = await Promise.all([
            getForecastWeatherData(latitude, longitude, days),
            getHistoricWeatherData(latitude, longitude, startDate, endDate),
        ]);

        return {
            city: forecast.city,
            stateCode: forecast.stateCode,
            country: forecast.country,
            lat: forecast.lat,
            lon: forecast.lon,
            data: [...historic.data, ...forecast.data],
        };
    } catch (error) {
        if (error instanceof Error) {
            console.error("Error retrieving weather data:", error);
            throw new Error(`Error retrieving weather data: ${error.message}`);
        } else {
            console.error("Error retrieving weather data: Unknown error occurred");
            throw new Error("Error retrieving weather data: Unknown error occurred");
        }
    }
};

export const getForecastWeatherData = async (
    latitude: number,
    longitude: number,
    days: number,
): Promise<WeatherType> => {
    const url = `https://api.weatherbit.io/v2.0/forecast/daily?days=${days}&lat=${latitude}&lon=${longitude}&key=${WEATHER_API_KEY}`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Error fetching weather data: ${response.statusText}`);
    }
    const data = await response.json();
    return transformForecastWeatherData(data);
}

export const getHistoricWeatherData = async (
    latitude: number,
    longitude: number,
    startDate: string,
    endDate: string,
): Promise<WeatherType> => {
    const url = `https://api.weatherbit.io/v2.0/history/hourly?start_date=${startDate}&end_date=${endDate}&lat=${latitude}&lon=${longitude}&key=${WEATHER_API_KEY}`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Error fetching weather data: ${response.statusText}`);
    }
    const data = await response.json();
    return transformHistoricWeatherData(data);
}