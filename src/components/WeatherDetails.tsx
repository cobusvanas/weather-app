import React from 'react';
import { Box, Container, Image, SimpleGrid, Text, useBreakpointValue } from '@chakra-ui/react';
import { WeatherDataType } from '../types/weatherTypes';
import { searchCountry } from '../utils/Countries';
import { motion } from 'framer-motion';

interface WeatherDetailsProps {
  data: WeatherDataType;
  city: string;
  stateCode: string;
  country: string;
}

const MotionBox = motion(Box);

const WeatherDetails: React.FC<WeatherDetailsProps> = ({ data, city, stateCode, country }) => {
  const selectedDate = new Date(data.date);
  const formattedDate = selectedDate.toLocaleDateString('en-US', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });

  const countryDetails = searchCountry(country, stateCode);

  const dividerDirection = useBreakpointValue({ base: 'divideY', md: 'divideX', sm: 'divideX' });
  const tempFontSize = useBreakpointValue({ base: '4xl', md: '5xl' });

  return (
    <MotionBox
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      width="100%"
    >
      <SimpleGrid
        columns={[1, 2]}
        p={6}
        bg="white"
        borderRadius="md"
        shadow="sm"
        width="100%"
        {...(dividerDirection === 'divideX' ? { divideX: '2px' } : { divideY: '2px' })}
      >
        <Box paddingBottom={4}>
          <Text fontSize="xx-large" fontWeight="bold" color="gray.600">
            {city}, {countryDetails?.state_name}, {country}
          </Text>
          <Text fontSize="large" color="gray.500">
            {formattedDate}
          </Text>
          <SimpleGrid columns={2} margin={2} alignItems="center">
            <Image src={`icons/${data.icon}.png`} boxSize="100px" margin={1} />
            <Container padding={1}>
              <Text fontSize={tempFontSize} color="blue.500" textAlign="center">
                {Math.round(data.temp)}°C
              </Text>
              <Text fontSize="lg" color="gray.600" textAlign="center">
                {data.weatherDescription}
              </Text>
            </Container>
          </SimpleGrid>
        </Box>
        <Box paddingTop={4}>
          <SimpleGrid columns={2} textAlign="center">
            <WeatherPropertyDisplay label="Wind" value={`${data.windSpeed} kmph`} />
            <WeatherPropertyDisplay
              label="Precipitation"
              value={`${data.precipitation.toFixed(2)} mm`}
            />
            <WeatherPropertyDisplay label="Humidity" value={`${data.humidity} %`} />
            <WeatherPropertyDisplay label="UV Index" value={`${Math.round(data.uv)}`} />
          </SimpleGrid>
        </Box>
      </SimpleGrid>
    </MotionBox>
  );
};

const WeatherPropertyDisplay = ({ label, value }: { label: string; value: string }) => (
  <Box marginBottom={4} padding={2}>
    <Text fontSize="xl" color="gray.600">
      {value}
    </Text>
    <Text fontSize="medium" color="gray.400">
      {label}
    </Text>
  </Box>
);

export default WeatherDetails;
