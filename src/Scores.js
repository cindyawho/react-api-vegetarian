import * as React from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';
import FoodGame from './FoodGame';

export default function Scores({score, setScore}){
    // const[score, setScore] = useState(0);
    const [value, setValue] = useState(30);
    const handleChange = (event) => {
        console.log(event);
        setValue(event);
      };
    // const handleChange = (event: Event, newValue: number | number[]) => {
    //     setValue(newValue as number);
    //   };

    return(
        <>
            {/* Score: {score} */}
            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
            >
                <TextField id="outlined-basic" variant="outlined" value="Name"/>
                <Button variant="outlined">Submit</Button>
            </Box>

            <Box sx={{ width: 200 }}>
                <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
                <Slider aria-label="Volume" value={value} onChange={handleChange} />
                </Stack>
            </Box>
        </>
    )
}