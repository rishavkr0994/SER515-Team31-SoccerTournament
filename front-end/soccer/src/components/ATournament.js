import {
  Button,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
} from "@mui/material";
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
  useRouteMatch,
} from "react-router-dom";
import "./FooterAndMain.css";
import TLeft from "./TLeft";
import "./ATournament.css";
import { Box, maxWidth } from "@mui/system";
import { useSelector } from "react-redux";

export default function ATournament() {
  let { name } = useParams();
  let { path, url } = useRouteMatch();

  return (
    <div className="Main">
      <div className="centerTitle">
        <h1>{name}</h1>
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
          <Details></Details>
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
    <div className="register">
      <Paper
        elevation={3}
        sx={{
          marginTop: "30px",
          marginRight: "30px",
          minHeight: "400px",
          maxWidth: "700px",
          minWidth: "450px",
        }}
      >
        <div className="centerForm">
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
            <TextField required id="outlined-required" label="Team name" />
            <InputLabel id="demo-label">Type</InputLabel>
            <Select
              labelId="demo-label"
              id="demo-label"
              label="Type"
              onChange={(e) => {}}
              sx={{
                width: "235px",
              }}
            >
              <MenuItem value={0}>U16</MenuItem>
              <MenuItem value={1}>U17</MenuItem>
              <MenuItem value={2}>U18</MenuItem>
              <MenuItem value={3}>U19</MenuItem>
              <MenuItem value={4}>U20</MenuItem>
              <MenuItem value={5}>U21</MenuItem>
              <MenuItem value={6}>U22</MenuItem>
              <MenuItem value={7}>U23</MenuItem>
            </Select>
          </div>
          <Button
            variant="contained"
            sx={{ marginTop: "50px", alignContent: "flex-end" }}
          >
            Submit
          </Button>
        </Box>
      </Paper>
    </div>
  );
}
