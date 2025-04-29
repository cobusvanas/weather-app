import { WeatherApiDataItem, WeatherApiResponse, WeatherType } from '../types/weatherTypes';

export const transformWeatherData = (
  data: WeatherApiResponse,
  isHistoric: boolean
): WeatherType => {
  if (!data || !data.data || data.data.length === 0) {
    throw new Error('Invalid weather data');
  }

  const currentDate = new Date();
  const currentHour = currentDate.getHours();

  const filteredData = isHistoric
    ? data.data.filter((day: WeatherApiDataItem) => {
        const dayHour = new Date(day.ts * 1000).getHours();
        return dayHour === currentHour;
      })
    : data.data;

  return {
    city: data.city_name,
    stateCode: data.state_code,
    country: data.country_code,
    lat: data.lat,
    lon: data.lon,
    data: filteredData.map((day: WeatherApiDataItem) => ({
      date: isHistoric ? new Date(day.ts * 1000).toISOString().split('T')[0] : day.valid_date,
      temp: day.temp,
      weatherDescription: day.weather.description,
      humidity: day.rh,
      windSpeed: day.wind_spd,
      icon: day.weather.icon,
      precipitation: day.precip,
      pressure: day.pres,
      uv: day.uv,
    })),
  };
};

export const transformHistoricWeatherData = (data: WeatherApiResponse): WeatherType => {
  return transformWeatherData(data, true);
};

export const transformForecastWeatherData = (data: WeatherApiResponse): WeatherType => {
  return transformWeatherData(data, false);
};
