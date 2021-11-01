import React from 'react';
import {
  Button,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

import Paper from '@mui/material/Paper';
import "./FooterAndMain.css";
import "./ATournament.css";
import { Box } from "@mui/system";

export default function RegisterTeam() {
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