import { Button } from '@mui/material';
import React from 'react';
import Pagination from '@mui/material/Pagination';
import './FooterAndMain.css'
import TournamentCard from './TournamentCard';
import { Grid } from '@mui/material';

const rows = [
    {
        src:"tcard2.jpeg",
        name:"Century Hitters",
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
        name:"Century Hitters",
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
        name:"Century Hitters",
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
        <div className="Main" style={{marginTop:"30px", justifyContent:"center"}}>
            <div style={{height:"30px"}}>
                </div>
            <Grid container spacing={6}>
            {rows.map((row) => (
            <Grid item sx={{width:"20%"}}>
              <TournamentCard key={row.name} tournament={row} />
              </Grid>

            ))}
            </Grid>

            <Pagination count={10} variant="outlined" color="secondary" sx={{ display:"flex",justifyContent:"center",marginTop:"25px"}}/>
            <Button variant="contained" href="/tournament/create">
              Add Tournament
            </Button>
        </div>
    );
}