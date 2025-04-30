import React from 'react';
import { VStack, Spinner, Text, Box } from '@chakra-ui/react';

const LoadingSpinner: React.FC = () => {
  return (
    <Box
      width="50%"
      padding="6"
      borderWidth="1px"
      borderRadius="lg"
      boxShadow="lg"
      backgroundColor="white"
      margin="auto"
    >
      <VStack align="center" justify="center" height="30vh">
        <Spinner size="xl" color="blue.500" />
        <Text fontSize="lg" color="gray.600" textAlign="center" marginTop={4}>
          Please wait while we fetch weather data...
        </Text>
      </VStack>
    </Box>
  );
};

export default LoadingSpinner;
