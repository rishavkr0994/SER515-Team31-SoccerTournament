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
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import {
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  TextField,
} from "@mui/material";
import { InputAdornment } from "@material-ui/core";
function createData(name, calories, fat, carbs, protein, price) {
  return {
    name,
    calories,
    fat,
    carbs,
    protein,
    price,
    history: [
      {
        date: "2020-01-05",
        customerId: "11091700",
        amount: 3,
      },
      {
        date: "2020-01-02",
        customerId: "Anonymous",
        amount: 1,
      },
    ],
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const [available, setAvailable] = useState(true);
  const [booking, setBooking] = useState(false);
  const price = 20;
  const [total,setTotal] = useState(0);
  const handleBooking = () => {
    setBooking(true);
  };

  const [order,setOrder] = useState({quantites:"0"})

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
          {row.name}
        </TableCell>
        <TableCell align="right">{row.calories}</TableCell>
        <TableCell align="right">{row.fat}</TableCell>
        <TableCell align="right">{row.carbs}</TableCell>
        <TableCell align="right">{row.protein}</TableCell>
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
                    maxWidth="sm"
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
                            const newOrder = {...order}
                            newOrder.email = e.target.value;
                            setOrder(newOrder)
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
                              const newTotal  = price * e.target.value;
                              setTotal(newTotal);
                              const newOrder = {...order}
                              newOrder.quantites = e.target.value;
                              setOrder(newOrder)
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

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0, 3.99),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3, 4.99),
  createData("Eclair", 262, 16.0, 24, 6.0, 3.79),
  createData("Cupcake", 305, 3.7, 67, 4.3, 2.5),
  createData("Gingerbread", 356, 16.0, 49, 3.9, 1.5),
];
export default function MatchFixture() {
  return (
    <div className="Main">
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Dessert (100g serving)</TableCell>
              <TableCell align="right">Calories</TableCell>
              <TableCell align="right">Fat&nbsp;(g)</TableCell>
              <TableCell align="right">Carbs&nbsp;(g)</TableCell>
              <TableCell align="right">Protein&nbsp;(g)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <Row key={row.name} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
