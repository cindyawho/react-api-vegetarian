import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Grid from "@mui/material/Grid";
import CardHeader from "@mui/material/CardHeader";


export default function CharacterCard({image, title, description, buttonId}) {
  return (
    <Grid item xs={12} md={4}>
        <Card>
            <CardMedia
            component="img"
            height="350px"
            image={image}
            />
            <CardHeader
            title={title}
            titleTypographyProps={{ align: "center" }}
            sx={{ mt: 1 }}
            />
            <CardContent sx={{ pt: 0 }}>
            <ul>
                {description.map((descriptionBullet) => (
                    <li>{descriptionBullet}</li>
                ))}
            </ul>
            </CardContent>
            <CardActions>
            <Button
                variant="contained"
                sx={{ 
                px: 6, 
                mx: "auto"
                }}
                onClick={() => {
                    fetchFact(buttonId);
                }}
            >
                Click for a Random Fact
            </Button>
            </CardActions>
        </Card>
        </Grid>
  );
}

async function fetchFact(buttonId) {
    const requestOptions = {
        method: "GET",
        redirect: "follow"
      };
      
      fetch("https://uselessfacts.jsph.pl/api/v2/facts/random", requestOptions)
        .then((response) => response.json())
        .then((result) => {
            let newFact = result.text;
            let sub = document.getElementById(buttonId);
            sub.innerHTML = newFact;
        })
        .catch((error) => console.error(error));
}