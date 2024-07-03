import { Typography } from '@mui/material';
import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import {ingArray} from './ingredientsData';

export default function GuessIngredient({score, setScore}){
    function displayRandomIngredient(){
        console.log("HI");
        let randomNumber = Math.floor(Math.random() * 125);
        // console.log(ingArray);
        console.log(ingArray[randomNumber]);
    }

    const[checkBoxLabel1, setCheckBoxLabel1] = useState("Ingredient 1");
    const[isChecked1, setIsChecked1] = useState(false);
    const[checkBoxLabel2, setCheckBoxLabel2] = useState("Ingredient 2");
    const[isChecked2, setIsChecked2] = useState(false);
    const[checkBoxLabel3, setCheckBoxLabel3] = useState("Ingredient 3");
    const[isChecked3, setIsChecked3] = useState(false);

    const checkHandler = () => {setIsChecked1(!isChecked1)}
    const checkHandler2 = () => {setIsChecked2(!isChecked2)}
    const checkHandler3 = () => {setIsChecked3(!isChecked3)}

    function updateMessage() {
        console.log("Hello!");
        if(isChecked1){
            setCheckBoxLabel1("Ingredient 1");
        } else {
            setCheckBoxLabel1("Boop");
        }
        if(isChecked2){
            setCheckBoxLabel2("ahhhhhhhh");
        }
        if(isChecked3){
            setCheckBoxLabel3("eh");
        }
    }

    return(
        <>
        <br/>
        <br/>
        <Typography variant='h4'>
            Guess an Ingredient
        </Typography>
        <Button 
            variant="outlined"
            onClick={() => {
                displayRandomIngredient();
            }}
        >
            Start
        </Button>
        <div>
                <input type="checkbox" id="checkbox1" checked={isChecked1} onChange={checkHandler}/>
                <label htmlFor="checkbox1">{checkBoxLabel1}</label>

                <input type="checkbox" id="checkbox2" checked={isChecked2} onChange={checkHandler2}/>
                <label htmlFor="checkbox2">{checkBoxLabel2}</label>

                <input type="checkbox" id="checkbox3" checked={isChecked3} onChange={checkHandler3}/>
                <label htmlFor="checkbox3">{checkBoxLabel3}</label>
            </div>
        <br/>
        <Button 
            variant="outlined"
            onClick={() => {
                updateMessage();
            }}
        >
            Submit
        </Button>
        </>
    )
}