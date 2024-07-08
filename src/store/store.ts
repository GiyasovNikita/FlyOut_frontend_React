import { configureStore } from '@reduxjs/toolkit';
import airportsSlice from './slices/airportsSlice.ts';

const store = configureStore({
    reducer: {
        cities: airportsSlice,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
