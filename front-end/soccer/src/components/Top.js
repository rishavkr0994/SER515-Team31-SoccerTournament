import { Grid } from "@mui/material";
import React from "react";
import GetUser from "../utils/GetUser";
import "./Top.css";
import UserProfile from "./UserProfile";
import SignInSignUp from "./SignInSignUp";

export default function Top() {
  return (
    <div className="TopCss">
      <Grid container alignItems="center">
        <Grid item xs={2} sx={{alignItems:"left"}}>
          <div>
            <img className="imgCss" src={require("../visit.png")} alt=""></img>
          </div>
        </Grid>
        <Grid item xs={3} sx={{textAlign:"left",marginLeft:"-110px"}}>
          <div>
            <h1>ASU Soccer</h1>
          </div>
        </Grid>
        <Grid item xs={4}>
          {" "}
        </Grid>
        <Grid item xs={2} sx={{alignItems:"right"}}>
          <TopLeft></TopLeft>
        </Grid>
      </Grid>
    </div>
  );
}

function TopLeft() {
  const userInfo = GetUser();
  if (userInfo.isLoggedIn) {
    return <UserProfile></UserProfile>;
  } else {
    return <SignInSignUp></SignInSignUp>;
  }
}
