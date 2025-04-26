import { useEffect, useState } from "react";
import { Box, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { getWeatherData } from "../services/weatherAPI.ts";
import { WeatherDataType, WeatherType } from "../types/weatherTypes.ts";
import WeatherDetails from "./WeatherDetails.tsx";
import WeatherTile from "./WeatherTile.tsx";

const MainBlock = () => {
    const [weatherData, setWeatherData] = useState<WeatherType | null>(null);
    const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
    const [selectedDay, setSelectedDay] = useState<WeatherDataType>();

    useEffect(() => {
        const fetchLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const { latitude, longitude } = position.coords;
                        setLocation({ latitude, longitude });
                    },
                    (error) => {
                        console.error("Error fetching location:", error);
                    }
                );
            } else {
                console.error("Geolocation is not supported by this browser.");
            }
        };

        fetchLocation();
    }, []);

    useEffect(() => {
        if (location) {
            const fetchWeatherData = async () => {
                const data = await getWeatherData(
                    location.latitude,
                    location.longitude,
                    undefined,
                    undefined,
                    undefined,
                    true
                );
                setWeatherData(data);
                setSelectedDay(data.data[0]);
            };

            fetchWeatherData();
        }
    }, [location]);

    if (!weatherData) {
        return <Text>Loading...</Text>;
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
                    <SimpleGrid columns={[1, 2, 3]}>
                        {weatherData.data.map((data, index) => (
                            <WeatherTile
                                key={index}
                                data={data}
                                onClick={() => setSelectedDay(data)}
                            />
                        ))}
                    </SimpleGrid>
                </VStack>
            </Box>
    );
};

export default MainBlock;
