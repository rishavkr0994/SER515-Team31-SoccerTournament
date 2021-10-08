import { Button, Grid } from "@mui/material";
import React from "react";
import { setUser } from "../redux/userSlice";
import GetUser from "../util/GetUser";
import "./Top.css";
import { useDispatch } from "react-redux";
import UserProfile from "./UserProfile";

export default function Top() {
  return (
    <div className="TopCss">
      <Grid container alignItems="center">
        <Grid item xs={3}>
          <div className="imgCSs">
            <img
              className="imgCss"
              src={require("../public/visit.png")}
              alt=""
            ></img>
          </div>
        </Grid>
        <Grid item xs={7}>
          {" "}
        </Grid>
        <Grid item xs={2} >
          <TopLeft></TopLeft>
        </Grid>
      </Grid>
    </div>
  );
}

function TopLeft() {
    const userInfo = GetUser()
  if (userInfo.isLoggedIn) {
    return <UserProfile></UserProfile>;
  } else {
    return <SignInSignUp></SignInSignUp>;
  }
}

function SignInSignUp() {
    const dispatch =useDispatch()
    const SignUpButton = {
        marginLeft:"10px",
        backgroundColor:"grey   "
    };

function handleLogin (){
    dispatch(setUser({
        role: "admin",
        email:"xiaoxiao1234",
        jwt:"werwerasdfdsgaert",
        firstName:"Runlin",
        lastName:"Xiao"
    }))    
}

  return (
    <div>
      <Button variant="contained" style={SignUpButton} onClick={()=>handleLogin()}>
        Login
      </Button>
      
      <Button variant="contained" style={SignUpButton}>Sign Up</Button>
    </div>
  );
}
