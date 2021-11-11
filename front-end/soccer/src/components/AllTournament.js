import { Grid } from '@material-ui/core';
import { Button } from '@mui/material';
import React from 'react';
import './FooterAndMain.css'
import TournamentCard from './TournamentCard';

const rows = [
    {
        src:"tcard2.jpeg",
        name:"Century Hitters Tournament",
        description:"This is a century tournament!!!",
        startDate:["11","22","44"],
        endDtate:["00","11","22"],
        timeRange:"January 14th - 16th, 2022",
        endRegistration:"December 21, 2021",
      },
      {
        src:"tcard1.png",
        name:"Supersixers League",
        description:"Come and join this excited tournament!",
        startDate:["11","22","44"],
        endDtate:["00","11","22"],
        timeRange:"January 14th - 16th, 2022",
        endRegistration:"December 21, 2021",
        isOnGoing:"true"
      },
      {
        src:"tcard3.jpeg",
        name:"Delight Wings Gaming",
        description:"Come and join this excited tournament!",
        startDate:["11","22","44"],
        endDtate:["00","11","22"],
        timeRange:"January 14th - 16th, 2022",
        endRegistration:"December 21, 2021"
      },{
        src:"tcard2.jpeg",
        name:"Century Hitters Tournament",
        description:"This is a century tournament!!!",
        startDate:["11","22","44"],
        endDtate:["00","11","22"],
        timeRange:"January 14th - 16th, 2022",
        endRegistration:"December 21, 2021",
      },
      {
        src:"tcard1.png",
        name:"Supersixers League",
        description:"Come and join this excited tournament!",
        startDate:["11","22","44"],
        endDtate:["00","11","22"],
        timeRange:"January 14th - 16th, 2022",
        endRegistration:"December 21, 2021",
        isOnGoing:"true"
      },
      {
        src:"tcard3.jpeg",
        name:"Delight Wings Gaming",
        description:"Come and join this excited tournament!",
        startDate:["11","22","44"],
        endDtate:["00","11","22"],
        timeRange:"January 14th - 16th, 2022",
        endRegistration:"December 21, 2021"
      },{
        src:"tcard2.jpeg",
        name:"Century Hitters Tournament",
        description:"This is a century tournament!!!",
        startDate:["11","22","44"],
        endDtate:["00","11","22"],
        timeRange:"January 14th - 16th, 2022",
        endRegistration:"December 21, 2021",
      },
      {
        src:"tcard1.png",
        name:"Supersixers League",
        description:"Come and join this excited tournament!",
        startDate:["11","22","44"],
        endDtate:["00","11","22"],
        timeRange:"January 14th - 16th, 2022",
        endRegistration:"December 21, 2021",
        isOnGoing:"true"
      },
      {
        src:"tcard3.jpeg",
        name:"Delight Wings Gaming",
        description:"Come and join this excited tournament!",
        startDate:["11","22","44"],
        endDtate:["00","11","22"],
        timeRange:"January 14th - 16th, 2022",
        endRegistration:"December 21, 2021"
      }
  ];


export default function AllTournament(){
    return(
        <div className="Main" style={{marginTop:"30px"}}>
            <div style={{height:"30px"}}>
                </div>
            <Grid container spacing={3}>
            {rows.map((row) => (
                <Grid item sx={3}>
              <TournamentCard key={row.name} tournament={row} />
                </Grid>
            ))}
            </Grid>

            <Button variant="contained" href="/tournament/create">
              Add Tournament
            </Button>
        </div>
    );
}