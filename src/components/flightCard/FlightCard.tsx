import React from 'react';
import { Box, Typography, Button } from '@mui/material';

interface FlightCardProps {
    airline_code: string;
    departure_at: string;
    destination_airport: string;
    destination_airport_name: string;
    destination_city_name: string;
    baggage: boolean;
    currency: string;
    price: string;
    duration: number;
    flight_number: string;
    origin_airport: string;
    origin_airport_name: string;
    origin_city_name: string;
    return_at: string;
}

const FlightCard: React.FC<FlightCardProps> = ({
                                                   airline_code,
                                                   departure_at,
                                                   destination_airport,
                                                   destination_airport_name,
                                                   destination_city_name,
                                                   baggage,
                                                   currency,
                                                   price,
                                                   duration,
                                                   flight_number,
                                                   origin_airport,
                                                   origin_airport_name,
                                                   origin_city_name,
                                                   return_at,
                                               }) => {
    const departureDate = new Date(departure_at).toLocaleDateString();
    const departureTime = new Date(departure_at).toLocaleTimeString();
    const arrivalDate = new Date(return_at).toLocaleDateString();
    const arrivalTime = new Date(return_at).toLocaleTimeString();
    const durationHours = Math.floor(duration / 60);
    const durationMinutes = duration % 60;

    return (
        <Box border={1} borderRadius={8} p={2} mb={2}>
            <Box display="flex" justifyContent="space-between">
                <Typography variant="h5">{price} {currency}</Typography>
                <Typography>Багаж {baggage ? 'включен' : 'не включен'}</Typography>
            </Box>
            <Box display="flex" alignItems="center">
                <Box mr={2}>
                    <Typography variant="h6">{departureTime}</Typography>
                    <Typography>{origin_city_name}</Typography>
                    <Typography>{departureDate}</Typography>
                    <Typography>{origin_airport_name}</Typography>
                </Box>
                <Box display="flex" flexDirection="column" alignItems="center" mx={2}>
                    <Typography variant="subtitle2">{airline_code}</Typography>
                    <Typography>В пути: {durationHours}ч {durationMinutes}мин</Typography>
                    <Box display="flex" alignItems="center">
                        <Typography>{origin_airport}</Typography>
                        <Typography> - </Typography>
                        <Typography>{destination_airport}</Typography>
                    </Box>
                </Box>
                <Box ml={2}>
                    <Typography variant="h6">{arrivalTime}</Typography>
                    <Typography>{destination_city_name}</Typography>
                    <Typography>{arrivalDate}</Typography>
                    <Typography>{destination_airport_name}</Typography>
                </Box>
            </Box>
            <Button variant="contained" color="primary">Выбрать билет</Button>
        </Box>
    );
};

export default FlightCard;
