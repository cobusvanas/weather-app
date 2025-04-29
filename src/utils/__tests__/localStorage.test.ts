import { setCachedWeatherData, getCachedWeatherData } from '../localStorage';
import { WeatherType } from '../../types/weatherTypes';

describe('localStorage utilities', () => {
  const mockWeatherData: WeatherType = {
    city: 'Test City',
    stateCode: 'TC',
    country: 'TC',
    lat: 0,
    lon: 0,
    data: [
      {
        date: '2023-01-01',
        temp: 25,
        weatherDescription: 'Sunny',
        humidity: 50,
        windSpeed: 5,
        icon: '01d',
        precipitation: 0,
        pressure: 1013,
        uv: 7,
      },
    ],
  };

  const lat = 10;
  const lon = 20;

  beforeEach(() => {
    jest.spyOn(globalThis.Storage.prototype, 'setItem');
    jest.spyOn(globalThis.Storage.prototype, 'getItem');
    jest.spyOn(globalThis.Storage.prototype, 'removeItem');
    localStorage.clear();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should set cached weather data in localStorage', () => {
    setCachedWeatherData(mockWeatherData, lat, lon);

    const key = `cachedWeatherData_${lat}_${lon}`;
    expect(localStorage.setItem).toHaveBeenCalledWith(key, expect.stringContaining('"data":'));
  });

  it('should get cached weather data if it is valid', () => {
    const key = `cachedWeatherData_${lat}_${lon}`;
    const timestamp = Date.now();
    const cachedItem = JSON.stringify({ data: mockWeatherData, timestamp });

    localStorage.setItem(key, cachedItem);

    const result = getCachedWeatherData(lat, lon);
    expect(result).toEqual(mockWeatherData);
  });

  it('should return null if cached data is expired', () => {
    const key = `cachedWeatherData_${lat}_${lon}`;
    const expiredTimestamp = Date.now() - 1800001; // Expired by 1ms
    const cachedItem = JSON.stringify({ data: mockWeatherData, timestamp: expiredTimestamp });

    localStorage.setItem(key, cachedItem);

    const result = getCachedWeatherData(lat, lon);
    expect(result).toBeNull();
  });

  it('should return null if no cached data exists', () => {
    const result = getCachedWeatherData(lat, lon);
    expect(result).toBeNull();
  });

  it('should handle errors when setting data in localStorage', () => {
    const consoleErrorMock = jest.spyOn(console, 'error').mockImplementation(() => {});

    jest.spyOn(globalThis.Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('Storage error');
    });

    expect(() => setCachedWeatherData(mockWeatherData, lat, lon)).not.toThrow();
    expect(consoleErrorMock).toHaveBeenCalledWith(
      'Error setting cached weather data:',
      expect.any(Error)
    );

    consoleErrorMock.mockRestore();
  });

  it('should handle errors when getting data from localStorage', () => {
    const consoleErrorMock = jest.spyOn(console, 'error').mockImplementation(() => {});

    jest.spyOn(globalThis.Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('Storage error');
    });

    expect(() => getCachedWeatherData(lat, lon)).not.toThrow();
    expect(consoleErrorMock).toHaveBeenCalledWith(
      'Error getting cached weather data:',
      expect.any(Error)
    );
  });
});
