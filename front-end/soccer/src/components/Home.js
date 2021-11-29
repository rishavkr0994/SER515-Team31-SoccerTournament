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

export default function Home() {
  const userInfo = GetUser();
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
      console.log("from backend");
      const arr = Object.values(res.data.data);
      const newT = { ...rows };
      newT.arr = arr;
      newT.isLoading = !rows.isLoading;
      newT.render = !rows.render;
      setRows(newT);
    });
  }, []);
  return (
    <div className="Main">
      <h1 className="Coming"> Upcoming Tournaments</h1>
      <Grid container spacing={12}>
        {rows.arr.map((row) => (
          <Grid item xs={4}>
            <TournamentCard key={row.name} tournament={row} />
          </Grid>
        ))}
      </Grid>
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "25px" }}
      >
        <Button variant="contained" href="/tournament/create" disabled={userInfo.isLoggedIn === false}>
          Add Tournament
        </Button>
      </div>
      <div style={{width:"100%",height:"300px"}}>
        <BannerCarousel></BannerCarousel>
      </div>
    </div>
  );
}
