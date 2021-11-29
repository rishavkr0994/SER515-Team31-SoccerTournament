import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import './TournamentCard.css'

export default function TournamentCard(props) {
  const end = props.tournament.endDate;
  const d = new Date();
  const day = d.getUTCDate();
  const month = Number(d.getMonth())+1;
  const year = d.getFullYear();
  let onGoing = false;
  if(year<end.substring(6)){
    onGoing = true;
  }else if(year == end.substring(6)){
    if(month<end.substring(0,2)){
      onGoing = true;
    }else if(month == end.substring(0,2)){
      onGoing = day<=end.substring(3,5)
    }
  }
  return (
    <Card sx={{width:"100%",height:"100%",maxWidth:"300px"}}>
        { onGoing &&
            <img className="Fire" src="https://i.ibb.co/5XDzD1p/7cdaed0ede86.gif" alt="" height="60" />
        }
      <CardMedia
        component="img"
        height="160"
        alt="green iguana"
        image={props.tournament.iconSrc}
      />
      <CardContent
        sx={{
          textAlign: "center",
        }}
      >
        <Typography gutterBottom variant="h5" component="div">
          {props.tournament.name.length <=16 ? props.tournament.name : props.tournament.name.substring(0,16)+"..."}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          { props.tournament.description.length<=26 ? props.tournament.description : props.tournament.description.substring(0,26)+"..."}
        </Typography>
        <Typography variant="body1" color="green">
          {props.tournament.startDate}-{props.tournament.endDate}
        </Typography>
        <Typography variant="body2" color="red">
          Registration end at: {props.tournament.registrationDeadline}
        </Typography>
      </CardContent>
      <CardActions>
        <Button  size="small" href={"/tournament/get/" + props.tournament.name}>Learn More</Button>
      </CardActions>
    </Card>
  );
}
