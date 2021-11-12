import React from "react";
import TournamentCard from "./TournamentCard";
import "./Home.css";
import { Container, Grid } from "@mui/material";
export default function Home() {
  return (
    <div className="Main">
      <h1 className="Coming"> Upcoming Tournaments</h1>
      <Container maxWidth="xl" sx={{marginTop:"30px"}}>
        <Grid container spacing={12}>
          <Grid item xs={4}>
            <TournamentCard
            tournament={{
              src:"tcard2.jpeg",
              name:"Century Hitters Tournament",
              description:"This is a century tournament!!!",
              timeRange:"January 14th - 16th, 2022",
              endRegistration:"December 21, 2021",
            }}
            ></TournamentCard>
          </Grid>
          <Grid item xs={4}>
            <TournamentCard
            tournament={{
              src:"tcard1.png",
              name:"Supersixers League",
              description:"Come and join this excited tournament!",
              timeRange:"January 14th - 16th, 2022",
              endRegistration:"December 21, 2021",
              isOnGoing:"true"
            }}
            ></TournamentCard>
          </Grid>
          <Grid item xs={4}>
            <TournamentCard
            tournament={{
              src:"tcard3.jpeg",
              name:"Delight Wings Gaming",
              description:"Come and join this excited tournament!",
              timeRange:"January 14th - 16th, 2022",
              endRegistration:"December 21, 2021"
            }}
            ></TournamentCard>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
