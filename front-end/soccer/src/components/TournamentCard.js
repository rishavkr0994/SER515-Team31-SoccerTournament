import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import './TournamentCard.css'

export default function TournamentCard(props) {
  return (
    <Card sx={{ maxWidth: 345 }}>
        { props.tournament.isOnGoing === "true" &&
            <img className="Fire" src="fire.gif" alt="" height="60" />
        }
      <CardMedia
        component="img"
        height="160"
        alt="green iguana"
        image={props.tournament.src}
      />
      <CardContent
        sx={{
          textAlign: "center",
        }}
      >
        <Typography gutterBottom variant="h5" component="div">
          {props.tournament.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {props.tournament.description}
        </Typography>
        <Typography variant="body1" color="green">
          {props.tournament.timeRange}
        </Typography>
        <Typography variant="body2" color="red">
          Registration end at: {props.tournament.endRegistration}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" href={"/tournament/get/" + props.tournament.name}>Learn More</Button>
      </CardActions>
    </Card>
  );
}
