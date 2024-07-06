import * as React from 'react';
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Typography from "@mui/material/Typography";
import Grid from '@mui/material/Unstable_Grid2';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

export default function FoodGame({score, setScore}){
    const[recipeImage, setRecipeImage] = useState("https://i.ibb.co/CsKjdMf/Home.png");
    const[recipeTitle, setRecipeTitle] = useState("");
    const[isVegetarian, setIsVegetarian] = useState(true);
    const[userResponse, setUserResponse] = useState();
    const[resultMessage, setResultMessage] = useState("Good luck!");
    const[buttonAbility, setButtonAbility] = useState(true);
    const[questionNumber, setQuestionNumber] = useState(0);

    const[gameOver, setGameOver] = useState(false);

    function restartGame(){
        console.log("Starting New Game")
        setRecipeImage("https://images.unsplash.com/photo-1533745848184-3db07256e163?q=80&w=3132&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")
        setRecipeTitle("");
        setUserResponse();
        setButtonAbility(true);
        setScore(0);
        setQuestionNumber(0);
        setGameOver(false);
    }

    async function fetchRandomRecipe() {
        const requestOptions = {
            method: "GET",
            redirect: "follow"
        };
        
        fetch("https://api.spoonacular.com/recipes/random?apiKey=49731ab381b24450981eafd9df6a69b0", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                // console.log(result.recipes[0]);
                // console.log(recipeImage, recipeTitle);
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
            console.log(isVegetarian);
        }
    }

    //the useEffect now is able to check if the answer was correct- THIS IS FOR RENDERING ISSUES
    useEffect(() => {
        // console.log(userResponse, ":", isVegetarian);
        // console.log("Score: ", score);
        if(userResponse === isVegetarian){
            setScore(score + 100);
            setResultMessage("Correct!");
        } 
        else if(userResponse === undefined) {
            setResultMessage("Good luck!");
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

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));
      

    return(
        <>
        <Grid container spacing={2}>
        <Grid style={{ height: "100%" }} xs={6}>
            <Item>
                <Question questionNumber={questionNumber}/>
                <img src={recipeImage} width="100%" alt="food"/>
                <Typography variant='h5'>
                    {recipeTitle}
                </Typography>
            </Item>
        </Grid>
        <Grid xs={6}>
            <Item><Message 
                resultMessage={resultMessage} 
                score={score} 
                gameOver={gameOver} 
                setGameOver={setGameOver}
                restartGame={restartGame} 
                questionNumber={questionNumber}
                fetchRandomRecipe = {fetchRandomRecipe}
                toggleButton = {toggleButton} 
                buttonAbility={buttonAbility}
                updateQuestionNumber={updateQuestionNumber}
            />
            </Item>
            <Item>
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
            </Item>
        </Grid>
        </Grid>
        </>
    )
}

function Message({resultMessage, score, gameOver, setGameOver, restartGame, questionNumber, fetchRandomRecipe, toggleButton, buttonAbility, updateQuestionNumber}) {
    if(questionNumber === 6){
        toggleButton(!buttonAbility);
        setGameOver(true);
    }
    if(!gameOver && questionNumber === 0){
        return (
            <>
            <Typography variant="h4" sx={{ my: 2, mx: 1.5 }}>
                {resultMessage} 
            </Typography>
            <Typography variant="h4" sx={{ my: 2, mx: 1.5 }}>
                Your Score: {score}/500
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
                    Start Game
            </Button>
            </>
        )
    }
    if(!gameOver && buttonAbility){
        return (
            <>
            <Typography variant="h4" sx={{ my: 2, mx: 1.5 }}>
                {resultMessage} 
            </Typography>
            <Typography variant="h4" sx={{ my: 2, mx: 1.5 }}>
                Your Score: {score}/500
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
                    SUBMIT
            </Button>
            </>
        )
    } 
    else if(!gameOver && !buttonAbility){
        return (
            <>
            <Typography variant="h4" sx={{ my: 2, mx: 1.5 }}>
                {resultMessage} 
            </Typography>
            <Typography variant="h4" sx={{ my: 2, mx: 1.5 }}>
                Score: {score}/500
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
    }
    else {
        return (
            <>
            <Typography variant="h4" sx={{ my: 2, mx: 1.5 }}>
                Game Over! 
            </Typography>
            <Typography variant="h4" sx={{ my: 2, mx: 1.5 }}>
                Final Score: {score}/500 
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
    if(questionNumber == 6){
        return(
            <>
                
            </>
        )
    }
    if(questionNumber!==0){
        return(
            <>
                <Typography variant='h5'>
                    Question Number: {questionNumber} {"\t"} 
                </Typography>
                
            </>
        )
    }
}