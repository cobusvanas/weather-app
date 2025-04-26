export interface WeatherType {
    city: string;
    stateCode: string;
    country: string;
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