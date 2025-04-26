import {Box, Image, Text, VStack} from "@chakra-ui/react";
import {WeatherDataType} from "../types/weatherTypes.ts";

interface WeatherTileProps {
    data: WeatherDataType;
    onClick: () => void;
}

const WeatherTile: React.FC<WeatherTileProps> = ({ data, onClick }) => {
    const currentDate = new Date();
    const selectedDate = new Date(data.date);

    const isToday = selectedDate.toDateString() === currentDate.toDateString();

    const displayDay = isToday
        ? "Today"
        : selectedDate.toLocaleDateString("en-US", { weekday: "short" });

    return (
        <Box
            as="button"
            p={4}
            borderWidth="1px"
            borderRadius="lg"
            bg="blue.50"
            _hover={{bg: "blue.100"}}
            onClick={onClick}
            margin={2}
            data-state="open"
            _open={{
                animation: "fade-in 300ms ease-out",
            }}
        >
            <VStack>
                <Text fontSize="lg" fontWeight="bold">
                    {displayDay}
                </Text>
                <Image src={`icons/${data.icon}.png`}/>
                <Text fontSize="2xl">{Math.round(data.temp)}°C</Text>
            </VStack>
        </Box>
    );
};

export default WeatherTile;
