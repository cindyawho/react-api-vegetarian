import * as React from 'react';
import { useState, useEffect } from 'react';
import Typography from "@mui/material/Typography";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function BonusGame({score, setScore}){
    const[id, setID] = useState("");
    const[ingredient, setIngredient] = useState("");
    const[recipeImage1, setRecipeImage1] = useState("https://images.unsplash.com/photo-1533745848184-3db07256e163?q=80&w=3132&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D");
    const[recipeImage2, setRecipeImage2] = useState("https://images.unsplash.com/photo-1533745848184-3db07256e163?q=80&w=3132&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D");
    const[recipeImage3, setRecipeImage3] = useState("https://images.unsplash.com/photo-1533745848184-3db07256e163?q=80&w=3132&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D");

    async function fetchIngredient(ingredientName){
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
        };

        let urlString = "https://api.spoonacular.com/recipes/search?query="+ingredientName+"&apiKey=49731ab381b24450981eafd9df6a69b0";

        fetch(urlString, requestOptions)
        .then((response) => response.json())
        .then((result) => {
            console.log(result.results[0].id);
            setID(result.results[0].id);
        })
        .catch((error) => console.error(error));
    }

    function getImageByID(id){
        const requestOptions = {
            method: "GET",
            redirect: "follow"
        };

        let urlString = "https://api.spoonacular.com/recipes/"+id+"/information?apiKey=49731ab381b24450981eafd9df6a69b0";
        
        fetch(urlString, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                console.log(result.image);
                setRecipeImage3(result.image);
            })
            .catch((error) => console.error(error));
    }

    function fetchRandomRecipe(setFunction) {
        const requestOptions = {
            method: "GET",
            redirect: "follow"
        };
        
        fetch("https://api.spoonacular.com/recipes/random?apiKey=49731ab381b24450981eafd9df6a69b0", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                console.log(result.recipes[0]);
                setFunction(result.recipes[0].image);
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
                    fetchRandomRecipe(setRecipeImage1);
                    fetchRandomRecipe(setRecipeImage2);
                    getImageByID(id);
                }
                }
            >
                Submit
            </Button>
            <br/>
            <img src={recipeImage1} height="100px"/>{'    '}
            <img src={recipeImage2} height="100px"/>{'    '}
            <img src={recipeImage3} height="100px"/>
        </>
    )

}
