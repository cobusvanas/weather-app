import { VStack, Spinner, Text } from "@chakra-ui/react";

const LoadingSpinner: React.FC = () => {
    return (
        <VStack align="center" justify="center" height="100vh">
            <Spinner size="xl" color="blue.500" />
            <Text fontSize="lg" color="gray.600">
                Please wait while we fetch weather data...
            </Text>
        </VStack>
    );
};

export default LoadingSpinner;