import React from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { Box } from '@mui/material';

interface CustomDatePickerProps {
    startDate: Date | null;
    endDate: Date | null;
    onStartDateChange: (date: Date | null) => void;
    onEndDateChange: (date: Date | null) => void;
}

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({ startDate, endDate, onStartDateChange, onEndDateChange }) => {
    const today = new Date();

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Box sx={{ m: 2 }}>
                <DatePicker
                    label="Когда"
                    value={startDate}
                    minDate={today}
                    maxDate={endDate ?? undefined}
                    onChange={onStartDateChange}
                />
            </Box>
            <Box sx={{ m: 2 }}>
                <DatePicker
                    label="Обратно"
                    value={endDate}
                    minDate={startDate || today}
                    onChange={onEndDateChange}
                />
            </Box>
        </LocalizationProvider>
    );
};

export default CustomDatePicker;

