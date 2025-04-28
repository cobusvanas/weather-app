import { getWeatherData, getForecastWeatherData, getHistoricWeatherData } from '../weatherAPI';
import { transformForecastWeatherData, transformHistoricWeatherData } from '../../utils/transformWeatherData';

jest.mock('../../utils/transformWeatherData', () => ({
    transformForecastWeatherData: jest.fn(),
    transformHistoricWeatherData: jest.fn(),
}));

jest.mock('../../utils/constants', () => ({
    WEATHER_API_KEY: 'API_KEY',
}));

describe('weatherAPI', () => {
    const mockForecastData = { city: 'Test City', stateCode: 'TC', country: 'TC', lat: 0, lon: 0, data: [] };
    const mockHistoricData = { data: [] };

    beforeEach(() => {
        globalThis.fetch = jest.fn();
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    describe('getForecastWeatherData', () => {
        it('should fetch and transform forecast weather data', async () => {
            (globalThis.fetch as jest.Mock).mockResolvedValueOnce({
                ok: true,
                json: async () => mockForecastData,
            });
            (transformForecastWeatherData as jest.Mock).mockReturnValue(mockForecastData);

            const result = await getForecastWeatherData(10, 20, 4);

            expect(globalThis.fetch).toHaveBeenCalledWith(
                expect.stringContaining('forecast/daily')
            );
            expect(transformForecastWeatherData).toHaveBeenCalledWith(mockForecastData);
            expect(result).toEqual(mockForecastData);
        });

        it('should throw an error if the API call fails', async () => {
            (globalThis.fetch as jest.Mock).mockResolvedValueOnce({
                ok: false,
                statusText: 'Bad Request',
            });

            await expect(getForecastWeatherData(10, 20, 4)).rejects.toThrow('Error fetching weather data: Bad Request');
        });
    });

    describe('getHistoricWeatherData', () => {
        it('should fetch and transform historic weather data', async () => {
            (globalThis.fetch as jest.Mock).mockResolvedValueOnce({
                ok: true,
                json: async () => mockHistoricData,
            });
            (transformHistoricWeatherData as jest.Mock).mockReturnValue(mockHistoricData);

            const result = await getHistoricWeatherData(10, 20, '2023-01-01', '2023-01-04');

            expect(globalThis.fetch).toHaveBeenCalledWith(
                expect.stringContaining('history/hourly')
            );
            expect(transformHistoricWeatherData).toHaveBeenCalledWith(mockHistoricData);
            expect(result).toEqual(mockHistoricData);
        });

        it('should throw an error if the API call fails', async () => {
            (globalThis.fetch as jest.Mock).mockResolvedValueOnce({
                ok: false,
                statusText: 'Not Found',
            });

            await expect(getHistoricWeatherData(10, 20, '2023-01-01', '2023-01-04')).rejects.toThrow('Error fetching weather data: Not Found');
        });
    });

    describe('getWeatherData', () => {
        it('should fetch and combine forecast and historic weather data', async () => {
            (globalThis.fetch as jest.Mock)
                .mockResolvedValueOnce({ ok: true, json: async () => mockForecastData })
                .mockResolvedValueOnce({ ok: true, json: async () => mockHistoricData });

            (transformForecastWeatherData as jest.Mock).mockReturnValue(mockForecastData);
            (transformHistoricWeatherData as jest.Mock).mockReturnValue(mockHistoricData);

            const result = await getWeatherData(10, 20);

            expect(globalThis.fetch).toHaveBeenCalledTimes(2);
            expect(result).toEqual({
                city: mockForecastData.city,
                stateCode: mockForecastData.stateCode,
                country: mockForecastData.country,
                lat: mockForecastData.lat,
                lon: mockForecastData.lon,
                data: [...mockHistoricData.data, ...mockForecastData.data],
            });
        });

        it('should throw an error if any API call fails', async () => {
            (globalThis.fetch as jest.Mock).mockResolvedValueOnce({
                ok: false,
                statusText: 'Internal Server Error',
            });

            await expect(getWeatherData(10, 20)).rejects.toThrow('Error retrieving weather data:');
        });
    });
});