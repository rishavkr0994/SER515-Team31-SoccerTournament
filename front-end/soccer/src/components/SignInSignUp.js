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

export default function SignInSignUp() {
  const dispatch = useDispatch();
  const [openLogin, setOpenLogin] = React.useState(false);
  const [openSignUp, setOpenSignUp] = React.useState(false);
  const [incorrect, setIncorrect] = React.useState(false);
  const handleClickOpenLogin = () => {
    setIncorrect(false);
    setOpenLogin(true);
  };

  const handleClose = () => {
    setOpenLogin(false);
    setOpenSignUp(false);
  };

  const handleClickOpenSignUp = () => {
    setOpenSignUp(true);
  };

  const SignUpButton = {
    marginLeft: "10px",
    backgroundColor: "grey",
    textAlign: "center",
  };

  const handleLogin = () => {
    fetch("http://localhost:9000/rest/user/signin", {
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
              jwt: res.data.jwt,
              firstName: res.data.firstName,
              lastName: res.data.lastName,
            })
          );
        }
        return res;
      })
      .catch((error) => {
        setIncorrect(true);
      });
  };

  const handleSignup = () => {};
  const userLogin = {
    username: "",
    password: "",
  };
  return (
    <div>
      <Button
        variant="contained"
        style={SignUpButton}
        onClick={handleClickOpenLogin}
      >
        Login
      </Button>

      <Button
        variant="contained"
        style={SignUpButton}
        onClick={handleClickOpenSignUp}
      >
        Sign Up
      </Button>

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
                userLogin.username = e.target.value;
              }}
            />
          </div>

          <TextField
            margin="normal"
            id="password"
            label="Password"
            type="password"
            onChange={(e) => {
              userLogin.password = e.target.value;
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleLogin}>Login</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openSignUp} onClose={handleClose}>
        <DialogTitle>SignUp</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="First Name"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSignup}>Sign Up</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
