import React from "react";
import { setUser } from "../redux/userSlice";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import { useDispatch } from "react-redux";
import { DialogContentText } from "@mui/material";
import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/themes/theme-blue.css";
import "./awsButton.css";
import API_BASE from "../api/api";
export default function SignInSignUp() {
  const dispatch = useDispatch();
  const [openLogin, setOpenLogin] = React.useState(false);
  const [incorrect, setIncorrect] = React.useState(false);
  const [userLogin, setUserLogin] = React.useState({
    username: "",
    password: "",
  });

  const handleClickOpenLogin = () => {
    setIncorrect(false);
    setOpenLogin(true);
  };

  const handleClose = () => {
    setOpenLogin(false);
  };

  const handleLogin = () => {
    console.log(userLogin);
    fetch(API_BASE + "rest/user/signin", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(userLogin),
    })
      .then((res) => res.json())
      .then((res) => {
        if (!res.isSuccess) {
          throw new Error(res.status);
        } else {
          dispatch(
            setUser({
              role: res.data.role,
              email: res.data.eMailAddress,
              jwt: "Bearer " + res.data.jwt,
              firstName: res.data.firstName,
              lastName: res.data.lastName,
            })
          );
        }
        return res;
      })
      .catch(() => {
        setIncorrect(true);
      });
  };

  return (
    <div>
      <AwesomeButton
        type="primary"
        size="medium"
        onPress={handleClickOpenLogin}
      >
        Login
      </AwesomeButton>

      <Dialog maxWidth="xs" fullWidth open={openLogin} onClose={handleClose}>
        <DialogTitle sx={{ textAlign: "center", backgroundColor: "lightblue" }}>
          Login
        </DialogTitle>
        <DialogContent
          sx={{
            margin: "auto",
          }}
        >
          {incorrect && (
            <div>
              <DialogContentText sx={{ color: "red" }}>
                username or password is not correct!
              </DialogContentText>
            </div>
          )}
          <div>
            <TextField
              autoFocus
              margin="normal"
              id="username"
              label="Email Address"
              type="email"
              onChange={(e) => {
                const newLog = {...userLogin};
                newLog.username = e.target.value;
                setUserLogin(newLog);
              }}
            />
          </div>

          <TextField
            margin="normal"
            id="password"
            label="Password"
            type="password"
            onChange={(e) => {
                const newLog = {...userLogin};
                newLog.password = e.target.value;
                setUserLogin(newLog);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleLogin}>
            Login
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
