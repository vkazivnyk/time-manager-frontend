import * as React from 'react';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TimePicker from '@mui/lab/TimePicker';
import DateTimePicker from '@mui/lab/DateTimePicker';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import MobileDatePicker from '@mui/lab/MobileDatePicker';

export default function MaterialUIPickers() {
    const [value, setValue] = React.useState(new Date('2014-08-18T21:11:54'));

    const handleChange = newValue => {
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
