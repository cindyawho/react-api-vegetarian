import * as React from 'react';
import { useState, useEffect } from 'react';
import Typography from "@mui/material/Typography";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function BonusGame({score, setScore}){
    const[id, setID] = useState("");
    const[ingredient, setIngredient] = useState("");
    async function fetchIngredient(ingredientName){
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
        };

        let urlString = "https://api.spoonacular.com/recipes/search?query="+"egg"+"&apiKey=49731ab381b24450981eafd9df6a69b0";

        fetch(urlString, requestOptions)
        .then((response) => response.json())
        .then((result) => {
            console.log(result.results[0].id);
            setID(result.results[0].id);
        })
        .catch((error) => console.error(error));
    }

    return(
        <>
            <br/>
            <br/>
            <Typography variant='h5'>
                Bonus Game:
            </Typography>
            <Typography variant='h6'>
                Type an ingredient name and guess which of the pictures below include that item.
            </Typography>
            <TextField id="outlined-controlled"
                label="Ingredient name"
                onChange={(event) => {
                    // console.log(event.target.value);
                    setIngredient(event.target.value);
            }}/>
            <Button 
                variant="outlined"
                onClick={() => {
                    fetchIngredient(ingredient);
                }
                }
            >
                Submit
            </Button>
        </>
    )

}
