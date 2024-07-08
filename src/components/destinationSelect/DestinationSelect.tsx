import React, { useState, useEffect } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { ListItemText, Typography, Box } from '@mui/material';

interface Airport {
    airport_code: string;
    airport_name: string;
    city_id: number;
    city_name: string;
}

interface DestinationSelectProps {
    citiesList: Airport[];
    label: string;
    onSelectionChange: (selectedAirport: Airport | null) => void;
}

const DestinationSelect: React.FC<DestinationSelectProps> = ({ citiesList, label, onSelectionChange }) => {
    const [inputValue, setInputValue] = useState<string>('');
    const [selectedOption, setSelectedOption] = useState<Airport | null>(null);
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
        setSelectedOption(newValue);
        onSelectionChange(newValue); // Передача выбранного значения в родительский компонент
    };

    return (
        <Autocomplete
            filterOptions={filterOptions}
            options={airports}
            getOptionLabel={(option) => option.city_name}
            inputValue={inputValue}
            onInputChange={handleInputChange}
            value={selectedOption}
            onChange={handleOptionChange}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label={label}
                    variant="outlined"
                    value={selectedOption ? `${selectedOption.city_name} (${selectedOption.airport_code})` : inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />
            )}
            renderOption={(props, option) => (
                <li {...props} key={option.airport_code}>
                    <Box display="flex" justifyContent="space-between" width="100%">
                        <ListItemText primary={option.city_name} />
                        <Typography variant="body2" color="textSecondary">
                            {option.airport_code}
                        </Typography>
                    </Box>
                </li>
            )}
        />
    );
};

export default DestinationSelect;

