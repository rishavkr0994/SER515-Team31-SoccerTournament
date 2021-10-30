import { Button, Grid, Paper, TextField } from "@mui/material";
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch,
} from "react-router-dom";
import "./FooterAndMain.css";
import TLeft from "./TLeft";
import "./ATournament.css";
import { Box, maxWidth } from "@mui/system";

export default function ATournament() {
  let { id } = useParams();
  let { path, url } = useRouteMatch();
  return (
    <div className="Main">
      <div className="centerTitle">
        <h1>{id}</h1>
      </div>
      <Grid container alignItems="center" justifyContent="center">
        <Grid item xs={2}>
          <Button variant="contained" href={`${url}/details`}>
            Details
          </Button>
        </Grid>
        <Grid item xs={2}>
          <Button variant="contained" href={`${url}/schduel`}>
            Schduel
          </Button>
        </Grid>
        <Grid item xs={2}>
          <Button variant="contained" href={`${url}/register`}>
            Register
          </Button>
        </Grid>
        {/* <Grid item xs={2}>
            <Button></Button>
        </Grid> */}
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <TLeft></TLeft>
        </Grid>
        <Grid item xs={8}>
          <TLeft></TLeft>
        </Grid>
      </Grid>
      <Switch>
        <Route exact path={path}>
          <h3>Please select a topic.</h3>
        </Route>
        <Route path={`${path}/:topicId`}>
          <Topic />
        </Route>
      </Switch>
    </div>
  );
}

function Topic() {
  let { topicId } = useParams();

  return (
    <div>
      <h3>{topicId}</h3>
      {topicId === "details" && <Details></Details>}
      {topicId === "schduel" && <Schduel></Schduel>}
      {topicId === "register" && <Register></Register>}
    </div>
  );
}

function Details() {
  return (
    <div>
      <p>showing details</p>
    </div>
  );
}

function Schduel() {
  return (
    <div>
      <p>showing schduel</p>
    </div>
  );
}

function Register() {
  return (
    <div alignItems="center" className="register">
      <Paper elevation={3} sx={{marginRight:"30px",minHeight:"400px",maxWidth:"400px"}} alignItems="center">
        <div className="centerForm" >
            <h>Register your team!</h>
        </div>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <div>
            <TextField
              required
              id="outlined-required"
              label="Team name"
            />
            <TextField
              id="outlined-password-input"
              label="Password"
              type="password"
              autoComplete="current-password"
            />
            <TextField
              id="outlined-read-only-input"
              label="Read Only"
              defaultValue="Hello World"
              InputProps={{
                readOnly: true,
              }}
            />
            <TextField
              id="outlined-number"
              label="Number"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              id="outlined-search"
              label="Search field"
              type="search"
            />
            <TextField
              id="outlined-helperText"
              label="Helper text"
              defaultValue="Default Value"
              helperText="Some important text"
            />
          </div>
        </Box>
      </Paper>
    </div>
  );
}
