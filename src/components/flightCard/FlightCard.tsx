import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import {ConnectingFlight, FlightDetails} from "../../../types.ts";

interface FlightCardProps {
    flight: FlightDetails | ConnectingFlight;
    isConnecting: boolean;
    onSelectFlight: (flight: FlightDetails | ConnectingFlight, isConnecting: boolean) => void;
}

const FlightCard: React.FC<FlightCardProps> = ({ flight, isConnecting, onSelectFlight }) => {
    const formatDateTime = (dateTime: string) => {
        const date = new Date(dateTime);
        return {
            date: date.toLocaleDateString(),
            time: date.toLocaleTimeString(),
        };
    };

    if (isConnecting) {
        const { firstLeg, secondLeg } = flight as { firstLeg: FlightDetails; secondLeg: FlightDetails };
        /*const firstDeparture = formatDateTime(firstLeg.departure_at);
        const firstReturn = formatDateTime(firstLeg.return_at);
        const secondDeparture = formatDateTime(secondLeg.departure_at);
        const secondReturn = formatDateTime(secondLeg.return_at);*/

        return (
            <Box border={1} borderRadius={8} p={2} mb={2}>
                <Typography variant="h5">{firstLeg.details.price} {firstLeg.details.currency}</Typography>
                <Typography>Багаж {firstLeg.details.baggage ? 'включен' : 'не включен'}</Typography>
                {[firstLeg, secondLeg].map((leg, index) => (
                    <Box key={index} display="flex" alignItems="center" my={2}>
                        <Box mr={2}>
                            <Typography variant="h6">{formatDateTime(leg.departure_at).time}</Typography>
                            <Typography>{leg.origin_city_name}</Typography>
                            <Typography>{formatDateTime(leg.departure_at).date}</Typography>
                            <Typography>{leg.origin_airport_name}</Typography>
                        </Box>
                        <Box display="flex" flexDirection="column" alignItems="center" mx={2}>
                            <Typography variant="subtitle2">{leg.airline_code}</Typography>
                            <Typography>В пути: {Math.floor(leg.duration / 60)}ч {leg.duration % 60}мин</Typography>
                            <Box display="flex" alignItems="center">
                                <Typography>{leg.origin_airport}</Typography>
                                <Typography> - </Typography>
                                <Typography>{leg.destination_airport}</Typography>
                            </Box>
                        </Box>
                        <Box ml={2}>
                            <Typography variant="h6">{formatDateTime(leg.return_at).time}</Typography>
                            <Typography>{leg.destination_city_name}</Typography>
                            <Typography>{formatDateTime(leg.return_at).date}</Typography>
                            <Typography>{leg.destination_airport_name}</Typography>
                        </Box>
                    </Box>
                ))}
                <Button variant="contained" color="primary" onClick={() => onSelectFlight(flight, true)}>Выбрать билет</Button>
            </Box>
        );
    }

    const directFlight = flight as FlightDetails;
    const departure = formatDateTime(directFlight.departure_at);
    const returnTime = formatDateTime(directFlight.return_at);

    return (
        <Box border={1} borderRadius={8} p={2} mb={2}>
            <Box display="flex" justifyContent="space-between">
                <Typography variant="h5">{directFlight.details.price} {directFlight.details.currency}</Typography>
                <Typography>Багаж {directFlight.details.baggage ? 'включен' : 'не включен'}</Typography>
            </Box>
            <Box display="flex" alignItems="center">
                <Box mr={2}>
                    <Typography variant="h6">{departure.time}</Typography>
                    <Typography>{directFlight.origin_city_name}</Typography>
                    <Typography>{departure.date}</Typography>
                    <Typography>{directFlight.origin_airport_name}</Typography>
                </Box>
                <Box display="flex" flexDirection="column" alignItems="center" mx={2}>
                    <Typography variant="subtitle2">{directFlight.airline_code}</Typography>
                    <Typography>В пути: {Math.floor(directFlight.duration / 60)}ч {directFlight.duration % 60}мин</Typography>
                    <Box display="flex" alignItems="center">
                        <Typography>{directFlight.origin_airport}</Typography>
                        <Typography> - </Typography>
                        <Typography>{directFlight.destination_airport}</Typography>
                    </Box>
                </Box>
                <Box ml={2}>
                    <Typography variant="h6">{returnTime.time}</Typography>
                    <Typography>{directFlight.destination_city_name}</Typography>
                    <Typography>{returnTime.date}</Typography>
                    <Typography>{directFlight.destination_airport_name}</Typography>
                </Box>
            </Box>
            <Button variant="contained" color="primary" onClick={() => onSelectFlight(flight, false)}>Выбрать билет</Button>
        </Box>
    );
};

export default FlightCard;

