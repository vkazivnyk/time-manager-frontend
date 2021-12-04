import * as React from 'react';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';

export default function MaterialUIPickers({ currentDate, getDate }) {
    console.log(currentDate);
    const [value, setValue] = React.useState(currentDate);

    const handleChange = newValue => {
        getDate(newValue);
        setValue(newValue);
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Stack spacing={3}>
                <DateTimePicker
                    value={value}
                    onChange={handleChange}
                    renderInput={params => (
                        <TextField
                            style={{
                                backgroundColor: 'white',
                                marginBottom: '5px',
                            }}
                            {...params}
                        />
                    )}
                />
            </Stack>
        </LocalizationProvider>
    );
}
