import React from "react";
import { setUser } from "../redux/userSlice";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import { useDispatch } from "react-redux";
import { DialogContentText, InputLabel, MenuItem, Select } from "@mui/material";

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

  const handleSignup = () => {
    fetch("http://localhost:9000/rest/user/signup", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(userSignUp),
    })
      .then((res) => res.json())
      .then((res) => {
        if (!res.isSuccess) {
          throw new Error(res.status);
        }
        handleClose()
        return res;
      })
      .catch(() => {
      });
  };
  const userLogin = {
    username: "",
    password: "",
  };

  const userSignUp = {
    firstName: "",
    lastName: "",
    role: "",
    email: "",
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

      <Dialog maxWidth="xs" fullWidth open={openSignUp} onClose={handleClose}>
        <DialogTitle sx={{ textAlign: "center", backgroundColor: "lightblue" }}>SignUp</DialogTitle>
        <DialogContent
          sx={{
            margin: "auto",
          }}
        >
          <div>
            <TextField
              autoFocus
              margin="normal"
              id="firstname"
              label="First name"
              onChange={(e) => {
                userSignUp.firstName = e.target.value;
              }}
            />
          </div>
          <div>
            <TextField
              margin="normal"
              id="lastname"
              label="Last name "
              onChange={(e) => {
                userSignUp.lastName = e.target.value;
              }}
            />
          </div>
          <InputLabel id="demo-label">Role</InputLabel>
          <Select
            labelId="demo-label"
            id="demo-label"
            label="Role"
            onChange={(e) => {
              userSignUp.role = e.target.value;
            }}
            sx={{
              width:"185px"
            }}
          >
            <MenuItem value={0}>Player</MenuItem>
            <MenuItem value={1}>Coach</MenuItem>
            <MenuItem value={2}>Referee</MenuItem>
          </Select>
          <div>
            <TextField
              margin="normal"
              id="emailAddress"
              label="Email Address"
              type="email"
              onChange={(e) => {
                userSignUp.email = e.target.value;
              }}
            />
          </div>

          <TextField
            margin="normal"
            id="signUpPassword"
            label="Password"
            type="password"
            onChange={(e) => {
              userSignUp.password = e.target.value;
            }}
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
