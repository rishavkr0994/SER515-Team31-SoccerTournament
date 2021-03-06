import React from "react";
import TournamentCard from "./TournamentCard";
import "./Home.css";
import { Grid } from "@mui/material";
import { useEffect } from "react";
import "./FooterAndMain.css";
import GetUser from "../utils/GetUser";
import { useState } from "react";
import axios from "axios";
import { Button } from "@mui/material";
import API_BASE from "../api/api";
import { BannerCarousel } from "../components/Banner/Banner";
import {useHistory} from 'react-router-dom'

export default function Home() {
  const userInfo = GetUser();
  const history = useHistory()
  const [rows, setRows] = useState({ arr: [], isLoading: true, render: false });
  useEffect(() => {
    axios({
      method: "GET",
      url: API_BASE + "rest/tournament",
      headers: {
        Authorization: userInfo.jwt,
      },
      params: {
        page: 1,
        size: 3,
        filterUpcoming: true,
      },
    }).then((res) => {
      const arr = Object.values(res.data.data);
      const newT = { ...rows };
      newT.arr = arr;
      newT.isLoading = !rows.isLoading;
      newT.render = !rows.render;
      setRows(newT);
    });
  }, []);

  const handleAddTournament = () => {
    history.push("/tournament/create")
  }

  return (
    <div>
      <div className="Main">
        <h1 className="Coming"> Upcoming Tournaments</h1>
        <Grid container spacing={12} justifyContent="space-evenly" sx={{maxHeight:"400px"}}>
          {rows.arr.map((row) => (
            <Grid item xs={2}>
              <TournamentCard key={row.name} tournament={row} />
            </Grid>
          ))}
        </Grid>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "80px",
          }}
        >
          <Button
            variant="contained"
            // href="/tournament/create"
            onClick={handleAddTournament}
            disabled={userInfo.isLoggedIn === false}
          >
            Add Tournament
          </Button>
        </div>
      </div>
      <div
        style={{
          height: "260px",
          backgroundColor: "black",
          marginTop: "-45vh",
          color: "white",
        }}
      >
        <Grid container spacing={3}>
          <Grid item xs={4} display="flex" justifyContent="center">
            <div style={{ fontSize: "40px" }}>
              COVID 19 GUIDELINES
            </div>
          </Grid>
          <Grid item xs={8} display="flex" alignContent="flex-end">
            <div
              style={{
                fontSize: "15px",
                marginLeft: "30px",
                alignSelf: "center",
              }}
            >
              In compliance with State and county issued updates, everyone must
              wear a mask inside ???walk in??? concession stands and bathrooms.
            </div>
          </Grid>
          <Grid item xs={4} display="flex" justifyContent="center">
            <div
              style={{
                alignSelf:"center",
                border: "1px solid red",
                width: "300px",
                // marginLeft:"-200px"
              }}
            ></div>
          </Grid>
          <Grid item xs={8} display="flex" alignContent="flex-end">
            <div
              style={{
                fontSize: "15px",
                marginLeft: "30px",
                alignSelf: "center",
              }}
            >
              Masks are not required outdoors at the complexes whether an
              individual has been vaccinated or not, however, it is worth
              considering wearing a mask in crowded outdoor settings and for
              activities with close contact with others who are not fully
              vaccinated.
            </div>
          </Grid>
          <Grid item xs={4} display="flex"  alignContent="flex-start" justifyContent="center">
            <div style={{ fontSize: "40px" }}>
              AUGUST 5TH
            </div>
          </Grid>
          <Grid item xs={8} display="flex" alignContent="flex-end">
            <div
              style={{
                fontSize: "15px",
                marginLeft: "30px",
                alignSelf: "center",
              }}
            >
              Fully vaccinated people might choose to mask regardless of the
              level of transmission, particularly if they or someone in their
              household is immunocompromised or if someone in their household is
              unvaccinated.
            </div>
          </Grid>
        </Grid>
      </div>
      <div
        style={{
          width: "100%",
          height: "340px",
          marginBottom: "50px",
          backgroundColor: "white",
        }}
      >
        <BannerCarousel></BannerCarousel>
      </div>
    </div>
  );
}
