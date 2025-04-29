export interface WeatherType {
  city: string;
  stateCode: string;
  country: string;
  lat: number;
  lon: number;
  data: WeatherDataType[];
}

export interface WeatherDataType {
  date: string;
  temp: number;
  weatherDescription: string;
  humidity: number;
  windSpeed: number;
  icon: string;
  precipitation: number;
  pressure: number;
  uv: number;
}

export interface WeatherApiDataItem {
  ts: number;
  valid_date: string;
  temp: number;
  weather: {
    description: string;
    icon: string;
  };
  rh: number;
  wind_spd: number;
  precip: number;
  pres: number;
  uv: number;
}

export interface WeatherApiResponse {
  city_name: string;
  state_code: string;
  country_code: string;
  lat: number;
  lon: number;
  data: WeatherApiDataItem[];
}
