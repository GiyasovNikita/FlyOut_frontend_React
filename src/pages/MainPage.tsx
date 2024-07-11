// pages/MainPage.tsx
import React, { useEffect, useState } from 'react';
import CustomDatePicker from '../components/customDatePicker/CustomDatePicker';
import DestinationSelect from '../components/destinationSelect/DestinationSelect';
import CardList from '../components/cardsList/CardsList';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCities } from '../store/slices/airportsSlice';
import { fetchFlights, fetchReturnFlights, setSelectedDepartureAirport, setSelectedArrivalAirport, setStartDate, setEndDate } from '../store/slices/flightsSlice';
import type { RootState, AppDispatch } from '../store/store';
import { Button } from '@mui/material';
//import { Airport } from '../../types';

import { Airport, FlightDetails, ConnectingFlight } from '../../types';
import FlightModal from "../components/flightModal/FlightModal.tsx";

const MainPage: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { data: cities, loading: citiesLoading, error: citiesError } = useSelector((state: RootState) => state.cities);
    const { flights, returnFlights, error: flightsError, selectedDepartureAirport, selectedArrivalAirport, startDate, endDate } = useSelector((state: RootState) => state.flights);

    const [searchPerformed, setSearchPerformed] = useState(false);
    const [selectedFlight, setSelectedFlight] = useState<FlightDetails | ConnectingFlight | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isConnecting, setIsConnecting] = useState(false);

    useEffect(() => {
        dispatch(fetchCities());
    }, [dispatch]);

    const handleDepartureSelectionChange = (selectedAirport: Airport | null) => {
        dispatch(setSelectedDepartureAirport(selectedAirport));
        console.log('Selected Departure Airport:', selectedAirport);
    };

    const handleArrivalSelectionChange = (selectedAirport: Airport | null) => {
        dispatch(setSelectedArrivalAirport(selectedAirport));
        console.log('Selected Arrival Airport:', selectedAirport);
    };

    const convertToUTCDateString = (date: Date): string => {
        return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())).toISOString();
    };

    const handleSubmit = () => {
        setSearchPerformed(true);
        if (selectedDepartureAirport && selectedArrivalAirport && startDate) {
            const formattedDate = convertToUTCDateString(new Date(startDate));
            dispatch(fetchFlights({ origin: selectedDepartureAirport.airport_code, destination: selectedArrivalAirport.airport_code, date: formattedDate }));
        } else {
            console.log('Please select departure, arrival, and start date');
        }

        if (selectedArrivalAirport && selectedDepartureAirport && endDate) {
            const formattedReturnDate = convertToUTCDateString(new Date(endDate));
            dispatch(fetchReturnFlights({ origin: selectedArrivalAirport.airport_code, destination: selectedDepartureAirport.airport_code, date: formattedReturnDate }));
        }
    };

    const handleSelectFlight = (flight: FlightDetails | ConnectingFlight, isConnecting: boolean) => {
        setSelectedFlight(flight);
        setIsConnecting(isConnecting);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedFlight(null);
    };

    const handleProceedToPayment = () => {
        setIsModalOpen(false);
        if (selectedFlight) {
            // Здесь можно добавить логику перенаправления на страницу оплаты
            // Например: navigate('/payment', { state: { flight: selectedFlight } });
        }
    };

    if (citiesError || flightsError) {
        console.log(citiesError || flightsError);
        return <h2>ERROR!</h2>;
    }
    if (citiesLoading) {
        return <h2>Пожалуйста, подождите...</h2>;
    }

    return (
        <>
            <DestinationSelect
                citiesList={cities}
                label="Откуда"
                onSelectionChange={handleDepartureSelectionChange}
                selectedAirport={selectedDepartureAirport}
            />
            <DestinationSelect
                citiesList={cities}
                label="Куда"
                onSelectionChange={handleArrivalSelectionChange}
                selectedAirport={selectedArrivalAirport}
            />
            <CustomDatePicker
                startDate={startDate ? new Date(startDate) : null}
                endDate={endDate ? new Date(endDate) : null}
                onStartDateChange={(date) => dispatch(setStartDate(date ? convertToUTCDateString(date) : null))}
                onEndDateChange={(date) => dispatch(setEndDate(date ? convertToUTCDateString(date) : null))}
            />
            <Button variant="contained" onClick={handleSubmit}>
                Найти
            </Button>
            {searchPerformed && <CardList title="Прямые рейсы" flights={flights} onSelectFlight={handleSelectFlight}/>}
            {searchPerformed && endDate && <CardList title="Обратные рейсы" flights={returnFlights} onSelectFlight={handleSelectFlight}/>}
            <FlightModal
                open={isModalOpen}
                onClose={handleCloseModal}
                flight={selectedFlight}
                onProceedToPayment={handleProceedToPayment}
            />
        </>
    );
};

export default MainPage;
