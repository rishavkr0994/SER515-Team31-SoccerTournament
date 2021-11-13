import { Button } from "@mui/material";
import React, { useEffect } from "react";
import Pagination from "@mui/material/Pagination";
import "./FooterAndMain.css";
import TournamentCard from "./TournamentCard";
import { Grid } from "@mui/material";
import GetUser from "../utils/GetUser";
import { useState } from "react";
import axios from "axios";

// const rows = [
//   {
//     src: "",
//     name: "Century Hitters",
//     description: "This is a century tournament!!!",
//     startDate: ["11", "22", "44"],
//     endDtate: ["00", "11", "22"],
//     timeRange: "January 14th - 16th, 2022",
//     endRegistration: "December 21, 2021",
//   },
//   {
//     src: "",
//     name: "Supersixers League",
//     description: "Come and join this excited tournament!",
//     startDate: ["11", "22", "44"],
//     endDtate: ["00", "11", "22"],
//     timeRange: "January 14th - 16th, 2022",
//     endRegistration: "December 21, 2021",
//     isOnGoing: "true",
//   },
//   {
//     src: "tcard3.jpeg",
//     name: "Delight Wings Gaming",
//     description: "Come and join this excited tournament!",
//     startDate: ["11", "22", "44"],
//     endDtate: ["00", "11", "22"],
//     timeRange: "January 14th - 16th, 2022",
//     endRegistration: "December 21, 2021",
//   },
//   {
//     src: "tcard2.jpeg",
//     name: "Century Hitters",
//     description: "This is a century tournament!!!",
//     startDate: ["11", "22", "44"],
//     endDtate: ["00", "11", "22"],
//     timeRange: "January 14th - 16th, 2022",
//     endRegistration: "December 21, 2021",
//   },
//   {
//     src: "tcard1.png",
//     name: "Supersixers League",
//     description: "Come and join this excited tournament!",
//     startDate: ["11", "22", "44"],
//     endDtate: ["00", "11", "22"],
//     timeRange: "January 14th - 16th, 2022",
//     endRegistration: "December 21, 2021",
//     isOnGoing: "true",
//   },
//   {
//     src: "tcard3.jpeg",
//     name: "Delight Wings Gaming",
//     description: "Come and join this excited tournament!",
//     startDate: ["11", "22", "44"],
//     endDtate: ["00", "11", "22"],
//     timeRange: "January 14th - 16th, 2022",
//     endRegistration: "December 21, 2021",
//   },
//   {
//     src: "tcard2.jpeg",
//     name: "Century Hitters",
//     description: "This is a century tournament!!!",
//     startDate: ["11", "22", "44"],
//     endDtate: ["00", "11", "22"],
//     timeRange: "January 14th - 16th, 2022",
//     endRegistration: "December 21, 2021",
//   },
//   {
//     src: "tcard1.png",
//     name: "Supersixers League",
//     description: "Come and join this excited tournament!",
//     startDate: ["11", "22", "44"],
//     endDtate: ["00", "11", "22"],
//     timeRange: "January 14th - 16th, 2022",
//     endRegistration: "December 21, 2021",
//     isOnGoing: "true",
//   },
//   {
//     src: "tcard3.jpeg",
//     name: "Delight Wings Gaming",
//     description: "Come and join this excited tournament!",
//     startDate: ["11", "22", "44"],
//     endDtate: ["00", "11", "22"],
//     timeRange: "January 14th - 16th, 2022",
//     endRegistration: "December 21, 2021",
//   },
// ];

export default function AllTournament() {
  const userInfo = GetUser();
  const [data, setData] = useState(null);
  const [query, setQuery] = useState({
    page: 1,
    size: 2,
    filterUpcoming: false,
  });
  const myRows = [];

  // function createDataRow(data) {
  //   console.log(data);
  //   data.forEach((e) => {
  //     myRows.append(e);
  //   });
  // }
  useEffect(() => {
    axios({
      method: "GET",
      url: "http://ser515-team31-soccertournament-server.us-east-2.elasticbeanstalk.com/rest/tournament",
      headers: {
        Authorization: userInfo.jwt,
      },
      params: {
        page: 1,
        size: 10,
        filterUpcoming: false,
      },
    }).then((res) => {
      console.log(res.data);
    });
    // fetch(
    //   `http://ser515-team31-soccertournament-server.us-east-2.elasticbeanstalk.com/rest/tournament?page=${encodeURIComponent(
    //     query.page
    //   )}&size=${encodeURIComponent(
    //     query.size
    //   )}&filterUpcoming=${encodeURIComponent(query.filterUpcoming)}`,
    //   {
    //     headers: {
    //       Authorization: userInfo.jwt,
    //     },
    //     method: "GET",
    //   }
    // )
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .then((res) => {
    //     // if(!res.isSuccess){
    //     //   console.log(res);
    //     //   // throw new Error(res.status);
    //     // }else(
    //     //   setData(res.data)
    //     // )
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
  });

  console.log(myRows);
  return (
    <div
      className="Main"
      style={{ marginTop: "30px", justifyContent: "center" }}
    >
      {/* <div style={{ height: "30px" }}></div>
      <Grid container spacing={6}>
        {rows.map((row) => (
          <Grid item sx={{ width: "20%" }}>
            <TournamentCard key={row.name} tournament={row} />
          </Grid>
        ))}
      </Grid>

      <Pagination
        count={10}
        variant="outlined"
        color="secondary"
        sx={{ display: "flex", justifyContent: "center", marginTop: "25px" }}
      /> */}
      <Button variant="contained" href="/tournament/create">
        Add Tournament
      </Button>
    </div>
  );
}
