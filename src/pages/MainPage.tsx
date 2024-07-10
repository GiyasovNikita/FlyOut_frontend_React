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

interface FlightDetails {
    flight_id: number;
    origin_airport: string;
    destination_airport: string;
    airline_code: string;
    flight_number: string;
    departure_at: string;
    return_at: string;
    duration: number;
    origin_city_name: string;
    destination_city_name: string;
    origin_airport_name: string;
    destination_airport_name: string;
    details: {
        flight_details_id: number;
        flight_id: number;
        price: string;
        currency: string;
        baggage: boolean;
    };
}

interface ConnectingFlight {
    firstLeg: FlightDetails;
    secondLeg: FlightDetails;
}

const MainPage: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { data: cities, loading, error } = useSelector((state: RootState) => state.cities);

    const [selectedDepartureAirport, setSelectedDepartureAirport] = useState<Airport | null>(null);
    const [selectedArrivalAirport, setSelectedArrivalAirport] = useState<Airport | null>(null);
    const [startDate, setStartDate] = useState<Date | null>(new Date());
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [flights, setFlights] = useState<{ directFlights: FlightDetails[], connectingFlights: ConnectingFlight[] }>({
        directFlights: [],
        connectingFlights: []
    });
    const [returnFlights, setReturnFlights] = useState<{ directFlights: FlightDetails[], connectingFlights: ConnectingFlight[] }>({
        directFlights: [],
        connectingFlights: []
    });

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
        if (selectedArrivalAirport && selectedDepartureAirport && endDate) {
            const returnDate = new Date(Date.UTC(endDate.getFullYear(), endDate.getMonth(), endDate.getDate())); // Устанавливаем время на полночь UTC
            const returnDateUTC = returnDate.toISOString().split('T')[0]; // Форматируем дату как YYYY-MM-DD

            const returnUrl = `http://localhost:5000/api/flights/filter?origin=${selectedArrivalAirport.airport_code}&destination=${selectedDepartureAirport.airport_code}&departureDate=${returnDateUTC}`;

            try {
                const returnResponse = await axios.get(returnUrl);
                setReturnFlights(returnResponse.data);
                console.log('Return Filtered Data:', returnResponse.data);
            } catch (error) {
                console.error('Error fetching return filtered data:', error);
            }
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
                {flights.directFlights.map((flight, index) => (
                    <FlightCard
                        key={index}
                        flight={flight}
                        isConnecting={false}
                    />
                ))}
                {flights.connectingFlights.map((flight, index) => (
                    <FlightCard
                        key={index}
                        flight={flight}
                        isConnecting={true}
                    />
                ))}
            </Box>
            {endDate && (
                <Box mt={4}>
                    {returnFlights.directFlights.map((flight, index) => (
                        <FlightCard
                            key={index}
                            flight={flight}
                            isConnecting={false}
                        />
                    ))}
                    {returnFlights.connectingFlights.map((flight, index) => (
                        <FlightCard
                            key={index}
                            flight={flight}
                            isConnecting={true}
                        />
                    ))}
                </Box>
            )}
        </>
    );
};

export default MainPage;
