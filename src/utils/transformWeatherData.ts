export const transformWeatherData = (data: any, isHistoric: boolean) => {
    if (!data || !data.data || data.data.length === 0) {
        throw new Error("Invalid weather data");
    }

    const currentDate = new Date();
    const currentHour = currentDate.getHours();

    const filteredData = isHistoric
        ? data.data.filter((day: any) => {
            const dayHour = new Date(day.ts * 1000).getHours(); // Extract the hour from `ts`
            return dayHour === currentHour; // Compare only the hour
        })
        : data.data;
    if(isHistoric) {
        console.log("Transforming historic weather filteredData:", filteredData);
    }
    return {
        city: data.city_name,
        stateCode: data.state_code,
        country: data.country_code,
        data: filteredData.map((day: any) => ({
            date: isHistoric
                ? new Date(day.ts * 1000).toISOString().split('T')[0]
                : day.valid_date,
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

export const transformHistoricWeatherData = (data: any) => {
    return transformWeatherData(data, true);
};

export const transformForecastWeatherData = (data: any) => {
    return transformWeatherData(data, false);
};