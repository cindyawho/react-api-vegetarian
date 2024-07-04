import * as React from 'react';
import { useState, useEffect } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
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


    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    return(
        <>
            <br/>
            <br/>
            <Grid container>
            <Grid xs={12}>
                <Item>
                <PrintScoreboard
                    scoreboardNames={scoreboardNames}
                    scoreboardPoints={scoreboardPoints}
                />
                </Item>
            </Grid>
            <Grid xs={12} sx={{mt: 3}}>
                <TextField
                    id="outlined-controlled"
                    label="Name"
                    onChange={(event) => {
                        setName(event.target.value);
                    }}
                />
                <Button 
                    sx={{mt: 2}}
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
            </Grid>
            </Grid>

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
            <img src="https://i.ibb.co/hf2VNCJ/Screenshot-2024-07-04-at-12-58-37-PM-removebg-preview.png" alt="Title of Scoreboard: Oldest to Newest" width="75%"/>
            {/* <Typography variant='h4'>
                Scoreboard: Oldest to Newest
            </Typography> */}
            <Typography variant='h6'>
                {toPrint}
            </Typography>
            <br/>
            Note: To get on the scoreboard, please finish a game before submitting your name. Thank you!
            <br/>
        </>
    )
}