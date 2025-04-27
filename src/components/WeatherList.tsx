import {Box, HStack, Image, Text, VStack} from "@chakra-ui/react";
import {WeatherDataType} from "../types/weatherTypes";
import {motion} from "framer-motion";

interface WeatherListProps {
    data: WeatherDataType[];
    onItemClick: (item: WeatherDataType) => void;
}

const MotionBox = motion(Box);

const WeatherList: React.FC<WeatherListProps> = ({ data, onItemClick }) => {
    const currentDate = new Date();

    const handleItemClick = (item: WeatherDataType) => {
        onItemClick(item);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <VStack width="100%">
            {data.map((item, index) => {
                const selectedDate = new Date(item.date);
                const isToday = selectedDate.toDateString() === currentDate.toDateString();
                const displayDay = isToday
                    ? "Today"
                    : selectedDate.toLocaleDateString("en-US", { weekday: "short" });
                const displayDate = selectedDate.toLocaleDateString("en-US", { day: "numeric", month: "short" });

                return (
                    <MotionBox
                        key={index}
                        as="button"
                        width="100%"
                        p={4}
                        borderWidth="1px"
                        borderRadius="md"
                        bg="white"
                        shadow="sm"
                        _hover={{ bg: "blue.100" }}
                        onClick={() => handleItemClick(item)}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                        <HStack justifyContent="space-between" alignItems="center">
                            <VStack align="start">
                                <Text fontSize="lg" fontWeight="bold">
                                    {displayDay}
                                </Text>
                                <Text fontSize="md" color="gray.600">
                                    {displayDate}
                                </Text>
                            </VStack>
                            <HStack>
                                <Image src={`icons/${item.icon}.png`} boxSize="50px" />
                                <Text fontSize="2xl" fontWeight="bold">
                                    {Math.round(item.temp)}°C
                                </Text>
                            </HStack>
                        </HStack>
                    </MotionBox>
                );
            })}
        </VStack>
    );
};

export default WeatherList;