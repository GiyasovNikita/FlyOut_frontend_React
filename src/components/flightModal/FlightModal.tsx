import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';
import { FlightDetails, ConnectingFlight } from '../../../types';

interface FlightModalProps {
    open: boolean;
    onClose: () => void;
    flight: FlightDetails | ConnectingFlight | null;
    onProceedToPayment: () => void;
}

const isConnectingFlight = (flight: FlightDetails | ConnectingFlight): flight is ConnectingFlight => {
    return (flight as ConnectingFlight).firstLeg !== undefined;
};

const FlightModal: React.FC<FlightModalProps> = ({ open, onClose, flight, onProceedToPayment }) => {
    if (!flight) return null;

    const formatDateTime = (dateTime: string) => {
        const date = new Date(dateTime);
        return {
            date: date.toLocaleDateString(),
            time: date.toLocaleTimeString(),
        };
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={{ width: 400, p: 4, mx: 'auto', mt: '20%', bgcolor: 'background.paper', borderRadius: 2 }}>
                <Typography variant="h6" gutterBottom>Информация о рейсе</Typography>
                {isConnectingFlight(flight) ? (
                    <>
                        <Typography>Первый сегмент:</Typography>
                        <Typography>Авиакомпания: {flight.firstLeg.airline_code}</Typography>
                        <Typography>Номер рейса: {flight.firstLeg.flight_number}</Typography>
                        <Typography>Отправление: {formatDateTime(flight.firstLeg.departure_at).date} в {formatDateTime(flight.firstLeg.departure_at).time}</Typography>
                        <Typography>Прибытие: {formatDateTime(flight.firstLeg.return_at).date} в {formatDateTime(flight.firstLeg.return_at).time}</Typography>
                        <Typography>Цена: {flight.firstLeg.details.price} {flight.firstLeg.details.currency}</Typography>
                        <Typography>Багаж: {flight.firstLeg.details.baggage ? 'включен' : 'не включен'}</Typography>
                        <Typography>Второй сегмент:</Typography>
                        <Typography>Авиакомпания: {flight.secondLeg.airline_code}</Typography>
                        <Typography>Номер рейса: {flight.secondLeg.flight_number}</Typography>
                        <Typography>Отправление: {formatDateTime(flight.secondLeg.departure_at).date} в {formatDateTime(flight.secondLeg.departure_at).time}</Typography>
                        <Typography>Прибытие: {formatDateTime(flight.secondLeg.return_at).date} в {formatDateTime(flight.secondLeg.return_at).time}</Typography>
                        <Typography>Цена: {flight.secondLeg.details.price} {flight.secondLeg.details.currency}</Typography>
                        <Typography>Багаж: {flight.secondLeg.details.baggage ? 'включен' : 'не включен'}</Typography>
                    </>
                ) : (
                    <>
                        <Typography>Авиакомпания: {flight.airline_code}</Typography>
                        <Typography>Номер рейса: {flight.flight_number}</Typography>
                        <Typography>Отправление: {formatDateTime(flight.departure_at).date} в {formatDateTime(flight.departure_at).time}</Typography>
                        <Typography>Прибытие: {formatDateTime(flight.return_at).date} в {formatDateTime(flight.return_at).time}</Typography>
                        <Typography>Цена: {flight.details.price} {flight.details.currency}</Typography>
                        <Typography>Багаж: {flight.details.baggage ? 'включен' : 'не включен'}</Typography>
                    </>
                )}
                <Box mt={2}>
                    <Button variant="contained" color="primary" onClick={onProceedToPayment}>Перейти к оплате</Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default FlightModal;
