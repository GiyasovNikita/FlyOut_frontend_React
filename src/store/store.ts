// store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import airportsReducer from './slices/airportsSlice';
import flightsReducer from './slices/flightsSlice';

const store = configureStore({
    reducer: {
        cities: airportsReducer,
        flights: flightsReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
