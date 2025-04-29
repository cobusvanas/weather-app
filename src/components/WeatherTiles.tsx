import React from 'react';
import { Box, Image, SimpleGrid, Text, useBreakpointValue, VStack } from '@chakra-ui/react';
import { WeatherDataType } from '../types/weatherTypes';
import { motion } from 'framer-motion';

interface WeatherTileProps {
  data: WeatherDataType[];
  onClick: (item: WeatherDataType) => void;
}

const MotionBox = motion(Box);

const WeatherTiles: React.FC<WeatherTileProps> = ({ data, onClick }) => {
  const currentDate = new Date();

  const fontSize = useBreakpointValue({ base: 'lg', md: '2xl' });

  return (
    <SimpleGrid columns={[7]}>
      {data.map((item, index) => {
        const selectedDate = new Date(item.date);
        const isToday = selectedDate.toDateString() === currentDate.toDateString();
        const displayDay = isToday
          ? 'Today'
          : selectedDate.toLocaleDateString('en-US', { weekday: 'short' });

        return (
          <MotionBox
            key={index}
            as="button"
            p={2}
            borderWidth="1px"
            borderRadius="md"
            bg="white"
            shadow="sm"
            _hover={{ bg: 'blue.100' }}
            onClick={() => onClick(item)}
            margin={1}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <VStack>
              <Text fontSize={fontSize} fontWeight="bold">
                {displayDay}
              </Text>
              <Image src={`icons/${item.icon}.png`} />
              <Text fontSize={fontSize}>{Math.round(item.temp)}°C</Text>
            </VStack>
          </MotionBox>
        );
      })}
    </SimpleGrid>
  );
};

export default WeatherTiles;
