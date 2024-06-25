import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from "@mui/material/Grid";
import CardHeader from "@mui/material/CardHeader";
import characters from './protagonists.json'
import { Description } from '@mui/icons-material';


export default function CharacterCard(props) {
  return (
    <Grid item xs={12} md={4}>
        <Card>
            <CardMedia
            component="img"
            height="350px"
            image={props.image}
            />
            <CardHeader
            title={props.title}
            titleTypographyProps={{ align: "center" }}
            sx={{ mt: 1 }}
            />
            <CardContent sx={{ pt: 0 }}>
            <ul>
                {props.description.map((descriptionBullet) => (
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
            >
                Vote
            </Button>
            </CardActions>
        </Card>
        </Grid>
  );
}