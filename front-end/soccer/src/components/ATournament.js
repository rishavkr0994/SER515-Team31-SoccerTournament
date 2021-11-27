import React from "react";
import { Button, Grid } from "@mui/material";

import { Switch, Route, useParams, useRouteMatch } from "react-router-dom";
import "./FooterAndMain.css";
import TLeft from "./TLeft";
import "./ATournament.css";
import Details from "./Details";
import RegisterTeam from "./RegisterTeam";
import MatchFixture from "./MatchFixture";
import GetUser from "../utils/GetUser";
import API_BASE from "../api/api";

export default function ATournament(props) {
  let { name } = useParams();
  let { path, url } = useRouteMatch();
  const userInfo = GetUser();

  const handleGenerate = () => {
    fetch(API_BASE + "/rest/tournament/" + name + "/fixtures", {
      headers: {
        "Content-Type": "application/json",
        Authorization: userInfo.jwt,
      },
      method: "POST",
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
        <Grid item xs={2}>
          <Button variant="contained" onClick={(e) => handleGenerate()}>
            Generate Match Fixture
          </Button>
        </Grid>
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
          <Details name={name}></Details>
        </Route>
        <Route path={`${path}/:topicId`}>
          <Topic name={name} />
        </Route>
      </Switch>
    </div>
  );
}

function Topic(props) {
  let { topicId } = useParams();

  return (
    <div>
      {topicId === "details" && <Details name={props.name}></Details>}
      {topicId === "schduel" && <Schduel name={props.name}></Schduel>}
      {topicId === "register" && (
        <RegisterTeam name={props.name}></RegisterTeam>
      )}
    </div>
  );
}

function Schduel(props) {
  return <MatchFixture name={props.name}></MatchFixture>;
}
