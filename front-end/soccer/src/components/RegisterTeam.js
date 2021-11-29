import React, { useState } from "react";
import {
  Alert,
  Button,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

import Paper from "@mui/material/Paper";
import "./FooterAndMain.css";
import "./ATournament.css";
import { Box } from "@mui/system";
import { useSelector } from "react-redux";
import API_BASE from "../api/api";

export default function RegisterTeam(props) {
  const state = useSelector((state) => state);
  const userInfo = state.userInfo;
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [teamRegister, setTeamRegister] = useState({ type: 0 });
  const [msg, setMsg] = useState(null);
  const handleError = (res) => {
    setMsg({ error: res.errMsg });
    setShowError(true);
    setShowSuccess(false);
  };
  const handleSuccess = () => {
    setShowSuccess(true);
    setShowError(false);
  };
  const handleRegister = () => {
    console.log(teamRegister);
    fetch(API_BASE + "rest/team/registration", {
      headers: {
        "Content-Type": "application/json",
        Authorization: userInfo.jwt,
      },
      method: "POST",
      body: JSON.stringify(teamRegister),
    })
      .then((res) => res.json())
      .then((res) => {
        if (!res.isSuccess) {
          handleError(res);
          throw new Error(res);
        }
        handleSuccess();
      })
      .catch(() => {});
  };

  return (
    <div>
      {showSuccess && (
        <div className="alert">
          <Alert
            onClose={() => {
              setShowSuccess(false);
            }}
            variant="filled"
            severity="success"
            sx={{
              width: "800px",
              textAlign: "center",
            }}
          >
            Congradulation! Your Team registered successfully !
          </Alert>
        </div>
      )}
      {showError && (
        <div className="alert">
          <Alert
            variant="filled"
            severity="error"
            onClose={() => {
              setShowError(false);
            }}
            sx={{
              width: "800px",
              textAlign: "center",
            }}
          >
            {msg.error}
          </Alert>
        </div>
      )}

      <div className="register">
        <Paper
          elevation={3}
          sx={{
            marginTop: "90px",
            marginRight: "30px",
            minHeight: "400px",
            maxWidth: "700px",
            minWidth: "450px",
          }}
        >
          <div className="registerTitle">Register your team!</div>
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
                onChange={(e) => {
                  setTeamRegister({
                    name: e.target.value,
                    tournamentName: props.name,
                    type: teamRegister.type,
                  });
                }}
              />
              <div>
                <TextField
                  required
                  id="outlined-required"
                  label="Team coach"
                  onChange={(e) => {}}
                />
              </div>
              <InputLabel id="demo-label">Type</InputLabel>
              <Select
                labelId="demo-label"
                id="demo-label"
                label="Type"
                defaultValue={0}
                onChange={(e) => {
                  setTeamRegister({
                    name: teamRegister.name,
                    type: e.target.value,
                  });
                }}
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
              sx={{
                marginTop: "50px",
                alignContent: "flex-end",
                marginRight: "20px",
              }}
              onClick={handleRegister}
            >
              Submit
            </Button>
          </Box>
        </Paper>
      </div>
    </div>
  );
}
