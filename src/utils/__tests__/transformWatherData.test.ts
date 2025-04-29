import { transformWeatherData } from '../transformWeatherData';
import { WeatherApiResponse } from '../../types/weatherTypes';

describe('transformWeatherData', () => {
  it('should transform weather data correctly', () => {
    const mockData: WeatherApiResponse = {
      city_name: 'Test City',
      state_code: 'TC',
      country_code: 'TC',
      lat: 0,
      lon: 0,
      data: [
        {
          ts: 1672531200,
          valid_date: '2023-01-01',
          temp: 25,
          weather: { description: 'Sunny', icon: '01d' },
          rh: 50,
          wind_spd: 5,
          precip: 0,
          pres: 1013,
          uv: 7,
        },
      ],
    };

    const result = transformWeatherData(mockData, false);
    expect(result.city).toBe('Test City');
    expect(result.data[0].temp).toBe(25);
  });
});
