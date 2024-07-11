// components/destinationSelect/DestinationSelect.tsx
import React, { useEffect, useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { ListItemText, Typography, Box } from '@mui/material';
import { Airport } from '../../../types'; // Импортируем интерфейсы

interface DestinationSelectProps {
    citiesList: Airport[];
    label: string;
    onSelectionChange: (selectedAirport: Airport | null) => void;
    selectedAirport: Airport | null;
}

const DestinationSelect: React.FC<DestinationSelectProps> = ({ citiesList, label, onSelectionChange, selectedAirport }) => {
    const [inputValue, setInputValue] = useState<string>('');
    const [airports, setAirports] = useState<Airport[]>([]);

    useEffect(() => {
        setAirports(citiesList);
    }, [citiesList]);

    const filterOptions = (options: Airport[], state: any) => {
        return options.filter((option) =>
            option.city_name.toLowerCase().includes(state.inputValue.toLowerCase())
        );
    };

    const handleInputChange = (event: React.SyntheticEvent, newInputValue: string) => {
        setInputValue(newInputValue);
    };

    const handleOptionChange = (event: React.SyntheticEvent, newValue: Airport | null) => {
        onSelectionChange(newValue);
    };

    return (
        <Autocomplete
            filterOptions={filterOptions}
            options={airports}
            getOptionLabel={(option) => option.city_name}
            inputValue={inputValue}
            onInputChange={handleInputChange}
            value={selectedAirport}
            onChange={handleOptionChange}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label={label}
                    variant="outlined"
                />
            )}
            renderOption={(props, option) => (
                <li {...props} key={option.airport_code}>
                    <Box display="flex" justifyContent="space-between" width="100%">
                        <ListItemText primary={option.city_name} />
                        <Typography variant="body2" color="textSecondary">
                            {option.airport_name}
                        </Typography>
                    </Box>
                </li>
            )}
        />
    );
};

export default DestinationSelect;


