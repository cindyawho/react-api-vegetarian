import * as React from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';
import FoodGame from './FoodGame';
import { Typography } from '@mui/material';

export default function Scores({score}){
    const[name, setName] = useState("");
    const[scoreboardNames, setScoreboardNames] = useState([]);
    const[scoreboardPoints, setScoreboardPoints] = useState([]);
    const [value, setValue] = useState(30);
    const handleChange = (event) => {
        console.log(event);
        setValue(event);
      };
    // const handleChange = (event: Event, newValue: number | number[]) => {
    //     setValue(newValue as number);
    //   };

    useEffect(() => {
        // console.log(scoreboardNames);
        // console.log(scoreboardPoints);
    }, [scoreboardNames, scoreboardPoints]);

    return(
        <>
            <br/>
            <br/>
            {/* Score: {score} */}
            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
            >
                <PrintScoreboard
                    scoreboardNames={scoreboardNames}
                    scoreboardPoints={scoreboardPoints}
                />
                <TextField
                    id="outlined-controlled"
                    label="Name"
                    onChange={(event) => {
                        setName(event.target.value);
                    }}
                />
                <Button 
                    variant="outlined"
                    onClick={() => {
                        setScoreboardNames([...scoreboardNames, name]);
                        setScoreboardPoints([...scoreboardPoints, score]);
                        console.log(scoreboardPoints);
                    }
                    }
                >
                    Submit
                </Button>
            </Box>

            {/* <Box sx={{ width: 200 }}>
                <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
                <Slider aria-label="Volume" value={value} onChange={handleChange} />
                </Stack>
            </Box> */}
        </>
    )
}

function PrintScoreboard({scoreboardNames, scoreboardPoints}){
    let toPrint = "";
    for(let i = 0; i < scoreboardNames.length; i++){
        toPrint += scoreboardNames[i] + ":\t" + scoreboardPoints[i] + ",\t";
    }
    // let namesString = scoreboardNames.toString();
    // let pointsString = scoreboardPoints.toString();
    return(
        <> 
            {/* {namesString}
            <br/>
            {pointsString} */}
            <Typography variant='h4'>
                Scoreboard: Oldest to Newest
            </Typography>
            Note: To get on the scoreboard, please finish a game before submitting your name. Thank you!
            <br/>
            <Typography variant='h6'>
                {toPrint}
            </Typography>
            
            <br/>
        </>
    )
}