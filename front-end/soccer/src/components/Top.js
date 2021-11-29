import { Grid } from "@mui/material";
import React from "react";
import GetUser from "../utils/GetUser";
import "./Top.css";
import UserProfile from "./UserProfile";
import SignInSignUp from "./SignInSignUp";
import Share from './Share'

export default function Top() {
  return (
    <div className="TopCss">
      <Grid container alignItems="center" justifyContent="spaceBetween">
        <Grid item container xs={10} alignItems="center">
          <img className="imgCss" src={require("../visit.png")} alt=""/> 
          <h1 className="headingCss">ASU Soccer</h1>  
        </Grid> 
        <Grid item xs={2} sx={{ alignItems: "right" }}>
          <TopLeft></TopLeft>
        </Grid>
      </Grid>
    </div>
  );
}

function TopLeft() {
  const userInfo = GetUser();
  console.log(userInfo);
  if (userInfo.isLoggedIn) {
    return (
      <div>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Share></Share>
        </Grid>
        <Grid item xs={12} sx={{marginTop:"50px"}}>
          <UserProfile></UserProfile>
        </Grid>
      </Grid>
      </div>
    );
  } else {
    return(
      <Grid container spacing={8}>
        <Grid item xs={12}>
          <Share></Share>
        </Grid>
        <Grid item xs={12}>
        <SignInSignUp></SignInSignUp>;
        </Grid>
      </Grid>
    );
  }
}
