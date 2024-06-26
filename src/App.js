import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import "./App.css";
import characters from './protagonists.json'
import CharacterCard from './CharacterCard';
import React, { useState, useEffect } from 'react';

// console.log("1 Original fact.")
let myFact = "Percy Jackson is a character in a book series on Greek mythology.";

function App() {
  // window.onload() = fetchFact();
  const [fact, setFact] = useState("Annabeth Chase is the daughter of Athena.");
  // console.log("characters json file", characters)
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
            Superheroes Inc
          </Typography>
          <Button
            href="#"
            variant="outlined"
            sx={{ my: 1, mx: 1.5 }}
            onClick={() => {
              fetchFact()
            }}
          >
            Button
          </Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md" sx={{ my: 4 }}>
        <Typography
          variant="h2"
          align="center"
          color="text.primary"
          sx={{ py: 2 }}
        >
          Prevalent Protagonists
        </Typography>
        <Typography
          variant="h5"
          align="center"
          color="text.secondary"
          sx={{ mx: 10 }}
          id = "subtitle"
        >
          {myFact}
        </Typography>
        <Typography
          variant="h5"
          align="center"
          color="text.secondary"
          sx={{ mx: 10 }}
          id = "stateFact"
        >
          {fact}
        </Typography>
      </Container>
      {/* End hero unit */}
      <Container maxWidth="lg">
        <Grid
          container
          spacing={5}
          justifyContent="center"
          alignItems="flex-start"
        >
        {characters.map((itemNumber) => (
            <CharacterCard 
              title={itemNumber.title} 
              image={itemNumber.pic} 
              description={itemNumber.description}
              buttonId={"subtitle"}
            />
          ))}
        </Grid>
      </Container>
    </div>
  );
}

export default App;

async function fetchFact() {
  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };
  
  fetch("https://uselessfacts.jsph.pl/api/v2/facts/random", requestOptions)
    .then((response) => response.json())
    .then((result) => {
      // alert(result.text);
      // setMyFact(result.text);
      myFact = result.text;
      let sub = document.getElementById("subtitle");
      sub.innerHTML = myFact;
      // console.log(sub);
    })
    .catch((error) => console.error(error));
}