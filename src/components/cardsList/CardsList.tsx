// components/cardList/CardList.tsx
import React from 'react';
import { Box, Typography } from '@mui/material';
import FlightCard from '../flightCard/FlightCard';
import {ConnectingFlight, FlightDetails} from "../../../types.ts";

interface CardsListProps {
    title: string;
    flights: {
        directFlights: FlightDetails[];
        connectingFlights: ConnectingFlight[];
    };
    onSelectFlight: (flight: FlightDetails | ConnectingFlight, isConnecting: boolean) => void;
}

const CardsList: React.FC<CardsListProps> = ({ title, flights, onSelectFlight }) => {
    return (
        <Box mt={4}>
            <Typography variant="h6">{title}:</Typography>
            {flights.directFlights.map((flight, index) => (
                <FlightCard key={index} flight={flight} isConnecting={false} onSelectFlight={onSelectFlight}/>
            ))}
            {flights.connectingFlights.map((flight, index) => (
                <FlightCard key={index} flight={flight} isConnecting={true} onSelectFlight={onSelectFlight}/>
            ))}
        </Box>
    );
};

export default CardsList;
