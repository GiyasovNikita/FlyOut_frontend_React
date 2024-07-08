import React, { useState, useEffect } from 'react';
import CustomDatePicker from '../components/customDatePicker/CustomDatePicker';
import DestinationSelect from '../components/destinationSelect/DestinationSelect';
import FlightCard from '../components/flightCard/FlightCard';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCities } from '../store/slices/airportsSlice.ts';
import type { RootState, AppDispatch } from '../store/store';
import axios from 'axios';
import { Button, Box } from '@mui/material';

interface Airport {
    airport_code: string;
    airport_name: string;
    city_id: number;
    city_name: string;
}

const MainPage: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { data: cities, loading, error } = useSelector((state: RootState) => state.cities);

    const [selectedDepartureAirport, setSelectedDepartureAirport] = useState<Airport | null>(null);
    const [selectedArrivalAirport, setSelectedArrivalAirport] = useState<Airport | null>(null);
    const [startDate, setStartDate] = useState<Date | null>(new Date());
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [flights, setFlights] = useState<any[]>([]); // Добавьте состояние для хранения списка рейсов

    useEffect(() => {
        dispatch(fetchCities());
    }, [dispatch]);

    const handleDepartureSelectionChange = (selectedAirport: Airport | null) => {
        setSelectedDepartureAirport(selectedAirport);
        console.log('Selected Departure Airport:', selectedAirport);
    };

    const handleArrivalSelectionChange = (selectedAirport: Airport | null) => {
        setSelectedArrivalAirport(selectedAirport);
        console.log('Selected Arrival Airport:', selectedAirport);
    };

    const handleSubmit = async () => {
        if (selectedDepartureAirport && selectedArrivalAirport && startDate) {
            const departureDate = new Date(Date.UTC(startDate.getFullYear(), startDate.getMonth(), startDate.getDate())); // Устанавливаем время на полночь UTC
            const departureDateUTC = departureDate.toISOString().split('T')[0]; // Форматируем дату как YYYY-MM-DD

            const url = `http://localhost:5000/api/flights/filter?origin=${selectedDepartureAirport.airport_code}&destination=${selectedArrivalAirport.airport_code}&departureDate=${departureDateUTC}`;

            try {
                const response = await axios.get(url);
                setFlights(response.data);
                console.log('Filtered Data:', response.data);
            } catch (error) {
                console.error('Error fetching filtered data:', error);
            }
        } else {
            console.log('Please select departure, arrival, and start date');
        }
    };

    if (error) {
        console.log(cities, loading, error);
        return <h2>ERROR!</h2>;
    }
    if (!cities || loading) {
        console.log(cities);
        return <h2>Loading...</h2>;
    }

    return (
        <>
            <DestinationSelect
                citiesList={cities}
                label="Откуда"
                onSelectionChange={handleDepartureSelectionChange}
            />
            <DestinationSelect
                citiesList={cities}
                label="Куда"
                onSelectionChange={handleArrivalSelectionChange}
            />
            <CustomDatePicker
                startDate={startDate}
                endDate={endDate}
                onStartDateChange={setStartDate}
                onEndDateChange={setEndDate}
            />
            <Button variant="contained" onClick={handleSubmit}>
                Найти
            </Button>
            <Box mt={4}>
                {flights.map((flight, index) => (
                    <FlightCard
                        key={index}
                        airline_code={flight.airline_code}
                        departure_at={flight.departure_at}
                        destination_airport={flight.destination_airport}
                        destination_airport_name={flight.destination_airport_name}
                        destination_city_name={flight.destination_city_name}
                        baggage={flight.details.baggage}
                        currency={flight.details.currency}
                        price={flight.details.price}
                        duration={flight.duration}
                        flight_number={flight.flight_number}
                        origin_airport={flight.origin_airport}
                        origin_airport_name={flight.origin_airport_name}
                        origin_city_name={flight.origin_city_name}
                        return_at={flight.return_at}
                    />
                ))}
            </Box>
        </>
    );
};

export default MainPage;

