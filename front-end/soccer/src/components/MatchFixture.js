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
import { useEffect } from "react";
import axios from 'axios'

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
import API_BASE from "../api/api";
import BlockRotateLoading from "./BlockRotateLoading";



export default function MatchFixture(props) {
  const [rows, setRows] = useState({ arr: [], isLoading: true, render: false });
  const name = props.name;
  const userInfo = GetUser();
  const [price,setPrice] = useState({isLoading : true});

  useEffect(() => {
    fetch(API_BASE+"rest/tournament/"+ name,{
      headers:{
        Authorization: userInfo.jwt
      },
      method : "GET"
    }).then((res)=> res.json())
    .then((res)=>{
      const newPrice = {...price};
      newPrice.isLoading = false;
      newPrice.value = res.data.ticketPrice;
      setPrice(newPrice);
    }).catch(error=>{
      console.log(error);
    });
    fetch(API_BASE +"rest/tournament/" + name + "/fixtures", {
      headers: {
        "Content-Type": "application/json",
        Authorization: userInfo.jwt
      },
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => {
        const newRows = { ...rows };
        newRows.arr = res.data;
        newRows.isLoading = false;
        setRows(newRows);
        console.log(res);
      }).catch((error)=>{
        console.log(error);
      });
  }, []);

  if(price.isLoading){
    return <BlockRotateLoading></BlockRotateLoading>
  }

  return (
    <div className="Main">
      <TableContainer component={Paper} sx={{ marginTop: "30px" }}>
        <Table aria-label="collapsible table">
          <TableHead className="titleBg" sx={{ fontWeight: "900" }}>
            <TableRow>
              <TableCell />
              <TableCell>Time</TableCell>
              <TableCell align="center">Team1</TableCell>
              <TableCell align="center">Team2</TableCell>
              <TableCell align="center">Field</TableCell>
              {/* <TableCell align="right">whatever</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody >
            {rows.arr.map((row) => (
              <Row key={row.id} row={row} price={price.value} />
            )
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}


function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const [available, setAvailable] = useState(false);
  const userInfo = GetUser();
  const [booking, setBooking] = useState(false);
  const price = props.price;
  const [total, setTotal] = useState(0);
  const handleBooking = () => {
    setBooking(true);
  };

  useEffect(() => {
    if(row.availableTicketCount>0){
      setAvailable(true)
    }
  }, [])

  const [order, setOrder] = useState({ quantites: "0" });

  const handleClose = () => {
    setBooking(false);
  };

  const handleSubmit = () => {
    console.log(userInfo.jwt);
    axios({
      url:API_BASE +"rest/match/"+row.id+"/bookTicket",
      method:"POST",
      headers:{
        Authorization: userInfo.jwt,
        "Content-Type":"application/json"
      },
      data:{
        "emailAddress": order.email,
        "ticketCount": order.quantites
      }
    }).then((res)=>{
      console.log(res);
      if(res.data.isSuccess){
        alert("Congratulation! Tickets booked successfuly! Please check your email!")
        row.availableTicketCount = row.availableTicketCount - order.quantites;
        setBooking(false)
      }else{
        alert(res.data.errMsg)
        setBooking(false)
      }
    }).catch((error)=>{
      console.log(error);
    })
  }

  return (
    <React.Fragment>
      <TableRow>
        <TableCell >
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row" style={{fontSize:"15px",color:"green"}}>
          {row.time}
        </TableCell>
        <TableCell align="center" >{row.team1}</TableCell>
        <TableCell align="center">{row.team2}</TableCell>
        <TableCell align="center">{row.field}</TableCell>
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
                  Price:{" "+props.price+" $"}
                </Grid>
                <Grid item xs={3}>
                  Seats Available:{row.availableTicketCount}/{row.aggregateTicketCount}
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
                          value={order.quantites}
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
                        onClick={handleSubmit}
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