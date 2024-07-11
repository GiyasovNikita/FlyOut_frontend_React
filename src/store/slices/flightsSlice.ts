// store/slices/flightsSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { FlightDetails, ConnectingFlight, Airport } from '../../../types'; // Импортируем интерфейсы

interface FlightState {
    flights: {
        directFlights: FlightDetails[],
        connectingFlights: ConnectingFlight[]
    };
    returnFlights: {
        directFlights: FlightDetails[],
        connectingFlights: ConnectingFlight[]
    };
    loading: boolean;
    error: string | null;
    selectedDepartureAirport: Airport | null;
    selectedArrivalAirport: Airport | null;
    startDate: string | null;
    endDate: string | null;
}

const initialState: FlightState = {
    flights: {
        directFlights: [],
        connectingFlights: []
    },
    returnFlights: {
        directFlights: [],
        connectingFlights: []
    },
    loading: false,
    error: null,
    selectedDepartureAirport: null,
    selectedArrivalAirport: null,
    startDate: new Date().toISOString(),
    endDate: null
};

export const fetchFlights = createAsyncThunk(
    'flights/fetchFlights',
    async ({ origin, destination, date }: { origin: string, destination: string, date: string }, { rejectWithValue }) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/flights/filter?origin=${origin}&destination=${destination}&departureDate=${date}`);
            return response.data;
        } catch (error) {
            return rejectWithValue("error");
        }
    }
);

export const fetchReturnFlights = createAsyncThunk(
    'flights/fetchReturnFlights',
    async ({ origin, destination, date }: { origin: string, destination: string, date: string }, { rejectWithValue }) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/flights/filter?origin=${origin}&destination=${destination}&departureDate=${date}`);
            return response.data;
        } catch (error) {
            return rejectWithValue("error");
        }
    }
);

const flightsSlice = createSlice({
    name: 'flights',
    initialState,
    reducers: {
        setSelectedDepartureAirport(state, action: PayloadAction<Airport | null>) {
            state.selectedDepartureAirport = action.payload;
        },
        setSelectedArrivalAirport(state, action: PayloadAction<Airport | null>) {
            state.selectedArrivalAirport = action.payload;
        },
        setStartDate(state, action: PayloadAction<string | null>) {
            state.startDate = action.payload;
        },
        setEndDate(state, action: PayloadAction<string | null>) {
            state.endDate = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchFlights.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchFlights.fulfilled, (state, action) => {
                state.loading = false;
                state.flights = action.payload;
            })
            .addCase(fetchFlights.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(fetchReturnFlights.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchReturnFlights.fulfilled, (state, action) => {
                state.loading = false;
                state.returnFlights = action.payload;
            })
            .addCase(fetchReturnFlights.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    }
});

export const {
    setSelectedDepartureAirport,
    setSelectedArrivalAirport,
    setStartDate,
    setEndDate
} = flightsSlice.actions;

export default flightsSlice.reducer;
