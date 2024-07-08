import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axiosInstance from "../../utils/axiosInstance.ts";


// Функция для фетчинга всех аэропортов и городов
const fetchCities = createAsyncThunk(
    'cities/fetch',
    async () => {
        const response = await axiosInstance.get(`/airports`);
        //console.log(response.data)
        return response.data;
    }
);

const initialState = {
    loading: false,
    data: [],
    error: ""
};

const citiesSlice = createSlice({
        name: 'cities',
        initialState,
        reducers: {
        },
        extraReducers: (builder) => {
            builder
                .addCase(fetchCities.pending, (state) => {
                    state.loading = true;
                    state.error = "";
                    //console.log(`PENDING`)
                })
                .addCase(fetchCities.fulfilled, (state, action) => {
                    state.loading = false;
                    state.data = action.payload;
                    //console.log(`FULFILLED ${JSON.stringify(state.data)}`)
                })
                .addCase(fetchCities.rejected, (state, action) => {
                    state.loading = false;
                    state.error = action.error.message || "";
                    //console.log(`REJECTED`)
                });
        }
    }
);

export {fetchCities};

export default citiesSlice.reducer;