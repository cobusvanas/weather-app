import React from 'react';
import { VStack, Text, Button } from '@chakra-ui/react';

interface ErrorBlockProps {
  message: string;
}

const ErrorBlock: React.FC<ErrorBlockProps> = ({ message }) => {
  const handleReload = () => {
    window.location.reload();
  };

  return (
    <VStack align="center" justify="center" height="100vh">
      <Text fontSize="xl" color="red.500" fontWeight="bold">
        Oops! Something went wrong.
      </Text>
      <Text fontSize="md" color="gray.600" textAlign="center">
        {message}
      </Text>
      <Button variant="surface" onClick={handleReload}>
        Refresh Page
      </Button>
    </VStack>
  );
};

export default ErrorBlock;
