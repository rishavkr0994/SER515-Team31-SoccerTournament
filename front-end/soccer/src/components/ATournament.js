import {
  Button,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
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
    function createData(key, value) {
        return { key, value};
      }
      
      const rows = [
        createData('Tournament name', "tournamentName"),
        createData('Start day', "10/24/2022"),
        createData('End day', "12/22/2022"),
        createData('End of registration', "10/22/2022"),
        createData('Fee', "600$"),
        createData('Feild', "this is a location"),
      ];
  return (
    <div className="detail">
      <TableContainer component={Paper} sx={{ maxWidth:600}}>
      <Table sx={{ minWidth: 500,maxWidth:700 }} size="small" aria-label="a dense table">
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.key}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.key}
              </TableCell>
              <TableCell align="right">{row.value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
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
