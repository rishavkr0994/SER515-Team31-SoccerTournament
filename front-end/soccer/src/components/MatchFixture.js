import React, { useState } from "react";
import "./FooterAndMain.css";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import EmailIcon from "@mui/icons-material/Email";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import "./MatchFixture.css";
import  { useEffect } from "react";

import {
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  TextField,
} from "@mui/material";
import { InputAdornment } from "@material-ui/core";
import GetUser from "../utils/GetUser";

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const [available, setAvailable] = useState(true);
  const [booking, setBooking] = useState(false);
  const price = 20;
  const [total, setTotal] = useState(0);
  const handleBooking = () => {
    setBooking(true);
  };

  const [order, setOrder] = useState({ quantites: "0" });

  const handleClose = () => {
    setBooking(false);
  };
  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.time}
        </TableCell>
        <TableCell align="right">{row.team1}</TableCell>
        <TableCell align="right">{row.team2}</TableCell>
        <TableCell align="right">{row.field}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Booking Tickets
              </Typography>
              <Grid container justifyContent="center" alignContent="center">
                <Grid item xs={3}>
                  Price:
                </Grid>
                <Grid item xs={3}>
                  Seats Available:
                </Grid>
                <Grid item xs={3}>
                  <Button
                    variant="contained"
                    color={available ? "success" : "info"}
                    disabled={!available}
                    onClick={handleBooking}
                    style={{ marginTop: "-20px" }}
                  >
                    Book
                  </Button>
                  <Dialog
                    open={booking}
                    fullWidth
                    sx={{ textAlign: "center" }}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    maxWidth="lg"
                  >
                    <DialogTitle id="alert-dialog-title">
                      {"Booking Ticket"}
                    </DialogTitle>
                    <Grid container spacing={3} justifyContent="center">
                      <Grid item sx={4}>
                        <TextField
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <EmailIcon></EmailIcon>
                              </InputAdornment>
                            ),
                          }}
                          id="ticket"
                          label="Email"
                          type="email"
                          onChange={(e) => {
                            const newOrder = { ...order };
                            newOrder.email = e.target.value;
                            setOrder(newOrder);
                          }}
                          sx={{ maxWidth: "300px" }}
                        />
                      </Grid>
                      <Grid item sx={4}>
                        <TextField
                          id="quantities"
                          label="quantities"
                          type="number"
                          onChange={(e) => {
                            const newTotal = price * e.target.value;
                            setTotal(newTotal);
                            const newOrder = { ...order };
                            newOrder.quantites = e.target.value;
                            setOrder(newOrder);
                          }}
                        />
                      </Grid>
                      <Grid item sx={4}>
                        <TextField
                          disabled
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <MonetizationOnIcon></MonetizationOnIcon>
                              </InputAdornment>
                            ),
                          }}
                          id="ticket"
                          label="Total Price"
                          value={total}
                          sx={{ maxWidth: "300px" }}
                        />
                      </Grid>
                    </Grid>

                    <DialogActions>
                      <Button variant="contained" onClick={handleClose}>
                        Cancel
                      </Button>
                      <Button
                        variant="contained"
                        onClick={handleClose}
                        autoFocus
                      >
                        Submit
                      </Button>
                    </DialogActions>
                  </Dialog>
                </Grid>
              </Grid>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function MatchFixture(props) {
  const [rows, setRows] = useState({ arr: [], isLoading: true, render: false });
  const name = props.name;
  const userInfo = GetUser();
  useEffect(() => {
    fetch(
      "http://ser515-team31-soccertournament-server.us-east-2.elasticbeanstalk.com/rest/tournament/" +
        name +
        "/fixtures",
      {
        headers: {
          "Content-Type":"application/json",
          Authorization: userInfo.jwt,
        },
        method: "GET",
      }
    )
      .then((res) => res.json())
      .then((res) => {
        const newRows = {...rows}
        newRows.arr = res.data
        newRows.isLoading = false
        setRows(newRows)
        console.log(res);
      });
  }, []);
  return (
    <div className="Main">
      <TableContainer component={Paper} sx={{ marginTop: "30px" }}>
        <Table aria-label="collapsible table">
          <TableHead className="titleBg" sx={{ fontWeight: "900" }}>
            <TableRow>
              <TableCell />
              <TableCell>Time</TableCell>
              <TableCell align="right">Team1</TableCell>
              <TableCell align="right">Team2</TableCell>
              <TableCell align="right">Field</TableCell>
              <TableCell align="right">whatever</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.arr.map((row) => (
              <Row key={row.name} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
