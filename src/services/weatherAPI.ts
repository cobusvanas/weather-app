import {WeatherType} from "../types/weatherTypes.ts";
import {mockForecastWeatherData, mockHistoricWeatherData,} from "./mocks/mockCurrentWeatherData.ts";
import {transformForecastWeatherData, transformHistoricWeatherData} from "../utils/transformWeatherData.ts";

export const getWeatherData = async (
    latitude: number,
    longitude: number,
    days: number = 3,
    startDate: string = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    endDate: string = new Date().toISOString().split('T')[0],
    mock: boolean = false
): Promise<WeatherType> => {
    try {
        const [forecast, historic] = await Promise.all([
            getForecastWeatherData(latitude, longitude, days, mock),
            getHistoricWeatherData(latitude, longitude, startDate, endDate, mock),
        ]);
        console.log("Forecast data:", forecast);
        console.log("Historic data:", historic);
        return {
            city: forecast.city,
            stateCode: forecast.stateCode,
            country: forecast.country,
            data: [...historic.data, ...forecast.data],
        };
    } catch (error) {
        console.error("Error retrieving weather data:", error);
        throw error;
    }
};

export const getForecastWeatherData = async (
    latitude: number,
    longitude: number,
    days: number,
    mock: boolean = false
): Promise<WeatherType> => {
    if (mock) {
        return transformForecastWeatherData(mockForecastWeatherData)
    } else {
        const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
        const url = `https://api.weatherbit.io/v2.0/forecast/daily?days=${days}&lat=${latitude}&lon=${longitude}&key=${apiKey}`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error fetching weather data: ${response.statusText}`);
        }
        return transformForecastWeatherData(response.json());
    }
}

export const getHistoricWeatherData = async (
    latitude: number,
    longitude: number,
    startDate: string,
    endDate: string,
    mock: boolean = false
): Promise<WeatherType> => {
    if (mock) {
        return transformHistoricWeatherData(mockHistoricWeatherData);
    } else {
        const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
        const url = `https://api.weatherbit.io/v2.0/history/hourly?start_date=${startDate}&end_date=${endDate}&lat=${latitude}&lon=${longitude}&key=${apiKey}`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error fetching weather data: ${response.statusText}`);
        }
        return transformHistoricWeatherData(response.json());
    }
}