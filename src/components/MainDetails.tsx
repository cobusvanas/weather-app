import React, { useEffect, useState } from 'react';
import { Box, useBreakpointValue, VStack } from '@chakra-ui/react';
import { getWeatherData } from '../services/weatherAPI';
import { WeatherDataType, WeatherType } from '../types/weatherTypes';
import WeatherDetails from './WeatherDetails';
import WeatherTiles from './WeatherTiles';
import WeatherList from './WeatherList';
import LoadingSpinner from './LoadingSpinner';
import ErrorBlock from './ErrorBlock';
import { getCachedWeatherData, setCachedWeatherData } from '../utils/localStorage';

const MainDetails: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherType | null>(null);
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [selectedDay, setSelectedDay] = useState<WeatherDataType>();
  const [error, setError] = useState<string | null>(null);

  const isSmallScreen = useBreakpointValue({ base: true, sm: false });

  useEffect(() => {
    const fetchLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setLocation({ latitude, longitude });
          },
          () => {
            setError(
              'We couldn’t access your location. Please enable location services in your browser and try again.'
            );
          }
        );
      } else {
        setError(
          'Geolocation is not supported by your browser. Please use a different browser or device.'
        );
      }
    };

    fetchLocation();
  }, []);

  useEffect(() => {
    if (location) {
      const fetchWeatherData = async () => {
        try {
          const cachedWeatherData = getCachedWeatherData(location.latitude, location.longitude);

          if (cachedWeatherData) {
            setWeatherData(cachedWeatherData);
            const currentDate = new Date().toDateString();
            const todayData = cachedWeatherData.data.find(
              (item: WeatherDataType) => new Date(item.date).toDateString() === currentDate
            );
            setSelectedDay(todayData);
            return;
          } else {
            const data = await getWeatherData(
              location.latitude,
              location.longitude,
              undefined,
              undefined,
              undefined
            );

            setWeatherData(data);
            setCachedWeatherData(data, location.latitude, location.longitude);

            const currentDate = new Date().toDateString();
            const todayData = data.data.find(
              (item) => new Date(item.date).toDateString() === currentDate
            );
            setSelectedDay(todayData);
          }
        } catch (err) {
          console.error('Error fetching weather data:', err);
          setError(
            'We couldn’t fetch the weather data. Please check your internet connection and try again.'
          );
        }
      };

      fetchWeatherData();
    }
  }, [location]);

  if (error) {
    return <ErrorBlock message={error} />;
  }

  if (!weatherData) {
    return <LoadingSpinner />;
  }

  return (
    <Box
      maxWidth="1024px"
      padding="6"
      borderWidth="1px"
      borderRadius="lg"
      boxShadow="lg"
      backgroundColor="white"
      margin="auto"
    >
      <VStack>
        {selectedDay && (
          <WeatherDetails
            data={selectedDay}
            city={weatherData.city}
            stateCode={weatherData.stateCode}
            country={weatherData.country}
          />
        )}
        {isSmallScreen ? (
          <WeatherList
            data={weatherData.data}
            onItemClick={(item) => {
              setSelectedDay(item);
            }}
          />
        ) : (
          <WeatherTiles
            data={weatherData.data}
            onClick={(item) => {
              setSelectedDay(item);
            }}
          />
        )}
      </VStack>
    </Box>
  );
};

export default MainDetails;
