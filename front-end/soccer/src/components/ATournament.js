import React from 'react';
import {
  Button,
  Grid,
} from "@mui/material";

import {
  Switch,
  Route,
  useParams,
  useRouteMatch,
} from "react-router-dom";
import "./FooterAndMain.css";
import TLeft from "./TLeft";
import "./ATournament.css";
import Details from './Details';
import RegisterTeam from './RegisterTeam';
import BlockRotateLoading from './BlockRotateLoading';

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
          <Details name = {name}></Details>
        </Route>
        <Route path={`${path}/:topicId`}>
          <Topic name={name}/>
        </Route>
      </Switch>
    </div>
  );
}

function Topic(props) {
  let { topicId } = useParams();

  return (
    <div>
      {topicId === "details" && <Details name = {props.name}></Details>}
      {topicId === "schduel" && <Schduel name = {props.name}></Schduel>}
      {topicId === "register" && <RegisterTeam name = {props.name}></RegisterTeam>}
    </div>
  );
}



function Schduel() {
  return (
    <div className="toRight">
      <BlockRotateLoading></BlockRotateLoading>
    </div>
  );
}