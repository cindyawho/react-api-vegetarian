import * as React from 'react';
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Typography from "@mui/material/Typography";
import { Container } from '@mui/material';
import Grid from "@mui/material/Grid";

export default function FoodGame({score, setScore}){
    const[recipeImage, setRecipeImage] = useState("https://images.unsplash.com/photo-1533745848184-3db07256e163?q=80&w=3132&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D");
    const[recipeTitle, setRecipeTitle] = useState("");
    const[isVegetarian, setIsVegetarian] = useState(true);
    const[userResponse, setUserResponse] = useState();
    const[resultMessage, setResultMessage] = useState("Good luck!");
    const[buttonAbility, setButtonAbility] = useState(true);
    const[questionNumber, setQuestionNumber] = useState(0);

    const[gameOver, setGameOver] = useState(false);
    const[finalMessage, setFinalMessage] = useState("");

    function restartGame(){
        console.log("Starting New Game")
        setRecipeImage("https://images.unsplash.com/photo-1533745848184-3db07256e163?q=80&w=3132&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")
        setRecipeTitle("");
        setUserResponse();
        setButtonAbility(true);
        setScore(0);
        setQuestionNumber(0);
    }

    async function fetchRandomRecipe() {
        const requestOptions = {
            method: "GET",
            redirect: "follow"
        };
        
        fetch("https://api.spoonacular.com/recipes/random?apiKey=49731ab381b24450981eafd9df6a69b0", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                console.log(result.recipes[0]);
                setRecipeImage(result.recipes[0].image);
                setIsVegetarian(result.recipes[0].vegetarian);
                setRecipeTitle(result.recipes[0].title)
            })
            .catch((error) => console.error(error));
    }

    function updateAnswer(buttonID) {
        if(buttonID === "notVegetarianButton"){
            setUserResponse(false);
        } else {
            setUserResponse(true);
        }
    }

    //the useEffect now is able to check if the answer was correct- THIS IS FOR RENDERING ISSUES
    useEffect(() => {
        // console.log(userResponse, ":", isVegetarian);
        // console.log("Score: ", score);
        if(userResponse === isVegetarian){
            setScore(score + 1);
            setResultMessage("Correct!");
        } 
        else if(userResponse === undefined) {
            setResultMessage(resultMessage);
        }
        else {
            setScore(score);
            setResultMessage("Incorrect :( ");
        }
    }, [questionNumber]); //useEffect only runs with a different questionNumber

    //BUTTON ENABLE AND DISABLE STUFF
    function toggleButton({buttonAbility}) {
        setButtonAbility(!buttonAbility);
    }

    // QUESTION NUMBER
    function updateQuestionNumber(){
        setQuestionNumber(questionNumber + 1);
    }

    return(
        <>
        <Container align="center">
            <Message 
                resultMessage={resultMessage} 
                score={score} 
                gameOver={gameOver} 
                restartGame={restartGame} 
                questionNumber={questionNumber}
                fetchRandomRecipe = {fetchRandomRecipe}
                toggleButton = {toggleButton} 
                buttonAbility={buttonAbility}
                updateQuestionNumber={updateQuestionNumber}
            />
            <br/>
            <Question questionNumber={questionNumber}/>

            <br/>
            <Button id="vegetarianButton" href="#"
                variant="outlined"
                disabled={buttonAbility}
                sx={{ my: 2, mx: 1.5 }}
                onClick={() => {
                    updateAnswer("vegetarianButton");
                    toggleButton({buttonAbility});
                }}>
                    Vegetarian
            </Button>
            <Button id="notVegetarianButton" href="#"
                variant="outlined"
                disabled={buttonAbility}
                sx={{ my: 2, mx: 1.5 }}
                onClick={() => {
                    updateAnswer("notVegetarianButton");
                    toggleButton({buttonAbility});
                }}>
                    Not Vegetarian
            </Button>
            <br/>
            <img src={recipeImage} width="500px"/>
            <Typography variant='h5'>
                {recipeTitle}
            </Typography>
        </Container>
        <Typography variant='h10'>
            Disclaimer: The answers to this quiz may be incorrect due to the API.
        </Typography>
        </>
    )
}

function Message({resultMessage, score, gameOver, restartGame, questionNumber, fetchRandomRecipe, toggleButton, buttonAbility, updateQuestionNumber}) {
    if(questionNumber == 6){
        toggleButton(!buttonAbility);
        gameOver = true;
    }
    if(!gameOver){
        return (
            <>
            <Typography variant="h4" sx={{ my: 2, mx: 1.5 }}>
                {resultMessage} Your Score: {score}/5
            </Typography>
            <Button variant="contained"
                sx={{ 
                px: 6, 
                my: 2,
                mx: "auto"
                }}
                onClick={() => {
                    fetchRandomRecipe();
                    toggleButton({buttonAbility});
                    updateQuestionNumber();
                }}>
                    Next Image 📸
            </Button>
            </>
        )
    } else {
        return (
            <>
            <Typography variant="h4" sx={{ my: 2, mx: 1.5 }}>
                "Game Over!" Final Score: {score}/5 
            </Typography>
            <Button variant="contained"
                sx={{ 
                px: 6, 
                my: 2,
                mx: "auto"
                }}
                onClick={() => {
                    restartGame();
                }}>
                    New Game 🍝 
            </Button>
            </>
        )
    }
}

function Question({questionNumber}) {
    if(questionNumber!=0){
        return(
            <>
                Question Number: {questionNumber} {"\t"} 
            </>
        )
    }
}

function ShowGame() {

    return(
        <>
        </>
    )
}