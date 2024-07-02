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
import Button1 from "./Button1";

// console.log("1 Original fact.")
let myFact = "Percy Jackson is a character in a book series on Greek mythology.";

function App() {
  // useState method
  const [fact, setFact] = useState("Annabeth Chase is the daughter of Athena.");
  const [counter1, setCounter1] = useState(0);// BUTTON COUNTER
  function counter() {
    setCounter1(counter1 + 1);
  }
  
  const [dog, setDog] = useState("");
  async function fetchDogPic() {  
    //DOG PICTURE STATE
    
    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };
    
    fetch("https://random.dog/woof.json?ref=apilist.fun", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result.url);
        setDog(result.url);
      })
      .catch((error) => console.error(error));
  }

  function getQuote() {
    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };
    fetch("https://uselessfacts.jsph.pl/api/v2/facts/random", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setFact(result.text);
      })
      .catch((error) => console.error(error));
  }
  
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
          <Button1/>
          <Button
            href="#"
            variant="outlined"
            sx={{ my: 1, mx: 1.5 }}
            onClick={() => {
              counter();
            }}
          >
            Clicker - {counter1}
          </Button>
          <Button
            href="#"
            variant="outlined"
            sx={{ my: 1, mx: 1.5 }}
            onClick={() => {
              fetchFact()
              getQuote()
            }}
          >
            Fact Button
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
          Updated by innerHTML method: {myFact}
        </Typography>
        <br/>
        <Typography
          variant="h5"
          align="center"
          color="text.secondary"
          sx={{ mx: 10 }}
          id = "stateFact"
        >
          Updated by useState: {fact}
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
      <Container align="center">
        <Typography
          variant="h2"
          align="center"
          color="text.primary"
          sx={{ py: 2 }}
        >
          Random Dog Pictures
        </Typography>
        <Typography
          variant="h5"
          align="center"
          color="text.secondary"
          sx={{ mx: 10 }}
          id = "subtitle"
        >
          Welcome to the Dog Pictures Zone!
        </Typography>
        <br/>
        <img src={dog} height="300px" width="auto"/>
        <br/>
        <Button
          variant="contained"
          sx={{ 
          px: 6, 
          mx: "auto"
          }}
          onClick={() => {
            fetchDogPic();
          }}
        >
          Click for a Dog Picture
          <br/>
        </Button>
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
      sub.innerHTML = "Updated by innerHTML method: " + myFact;
      // console.log(sub);
    })
    .catch((error) => console.error(error));
}