import React from 'react';
import { VStack, Text, Button, Box } from '@chakra-ui/react';

interface ErrorBlockProps {
  message: string;
}

const ErrorBlock: React.FC<ErrorBlockProps> = ({ message }) => {
  const handleReload = () => {
    window.location.reload();
  };

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
        <Text fontSize="xl" color="red.500" fontWeight="bold">
          Oops! Something went wrong.
        </Text>
        <Text fontSize="md" color="gray.600" textAlign="center">
          {message}
        </Text>
        <Button
          variant="surface"
          color={'blue.500'}
          backgroundColor={'blue.50'}
          onClick={handleReload}
        >
          Refresh Page
        </Button>
      </VStack>
    </Box>
  );
};

export default ErrorBlock;
