import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Grid from "@mui/material/Grid";
import CardHeader from "@mui/material/CardHeader";
import { useState } from 'react';


export default function CharacterCard({image, title, description, buttonId}) {
    const [votes, setVotes] = useState(0);
    const [dogPic, setDogPic] = useState(image);
    function updateVotes(){
        setVotes(votes + 1);
        fetchDogPic(image);
    }
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
            setDogPic(result.url);
          })
          .catch((error) => console.error(error));
      }

    return (
        <Grid item xs={12} md={4}>
            <Card>
                <CardMedia
                    component="img"
                    height="350px"
                    image={dogPic}
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
                <CardContent sx={{ pt: 0, textAlign:"center"}}>
                Number of Votes: {votes}
                </CardContent>
                <CardActions>
                    <Button
                        variant="contained"
                        sx={{ 
                        px: 6, 
                        mx: "auto"
                        }}
                        onClick={() => {
                            updateVotes();
                        }}
                    >
                        VOTE
                    </Button>
                </CardActions>
            </Card>
        </Grid>
    );
}