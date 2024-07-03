import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import "./App.css";
import * as React from 'react';
import { useState } from 'react';
import FoodGame from './FoodGame';
import Scores from './Scores.js'
import GuessIngredient from "./GuessIngredient.js";

function App() {
  const[score, setScore] = useState(0);

  return (
    <div className="App">
      <CssBaseline />
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: "1px solid lightgray" }}
      >
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Welcome to "Is it Vegetarian??"
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md" sx={{ my: 4 }}>
        <FoodGame
          score={score}
          setScore={setScore}
        />
        <GuessIngredient 
          score={score}
          setScore={setScore}
        />
        <Scores 
          score={score}
          setScore={setScore}
          // recipeImage={recipeImage}
          // setRecipeImage={setRecipeImage}
          // recipeTitle={recipeTitle} 
          // setRecipeTitle={setRecipeTitle}
        />
        {/* <BonusGame 
          score={score}
          setScore={setScore}
        /> */}
      </Container>
    </div>
  );
}

export default App;