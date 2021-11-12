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
    <Card sx={{width:"100%",height:"100%",maxWidth:"300px"}}>
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
          {props.tournament.name.length <=20 ? props.tournament.name : props.tournament.name.substring(0,20)+"..."}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          { props.tournament.description.length<=30 ? props.tournament.description : props.tournament.description.substring(0,30)+"..."}
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
