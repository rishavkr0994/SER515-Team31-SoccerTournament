import { Grid } from "@mui/material";
import React from "react";
import GetUser from "../util/GetUser";
import "./Top.css";
import UserProfile from "./UserProfile";
import SignInSignUp from "./SignInSignUp";

export default function Top() {
  return (
    <div className="TopCss">
      <Grid container alignItems="center">
        <Grid item xs={2} sx={{alignItems:"left"}}>
          <div>
            <img className="imgCss" src={require("../visit.png")} alt=""></img>
          </div>
        </Grid>
        <Grid item xs={3} sx={{textAlign:"left",marginLeft:"-110px"}}>
          <div>
            <h1>ASU Soccer</h1>
          </div>
        </Grid>
        <Grid item xs={4}>
          {" "}
        </Grid>
        <Grid item xs={2} sx={{alignItems:"right"}}>
          <TopLeft></TopLeft>
        </Grid>
      </Grid>
    </div>
  );
}

function TopLeft() {
  const userInfo = GetUser();
  if (userInfo.isLoggedIn) {
    return <UserProfile></UserProfile>;
  } else {
    return <SignInSignUp></SignInSignUp>;
  }
}

// function SignInSignUp() {
//   const dispatch = useDispatch();
//   const SignUpButton = {
//     marginLeft: "10px",
//     backgroundColor: "grey",
//     textAlign: "center",
//   };

//   function handleLogin() {
//     dispatch(
//       setUser({
//         role: "admin",
//         email: "xiaoxiao1234",
//         jwt: "werwerasdfdsgaert",
//         firstName: "Runlin",
//         lastName: "Xiao",
//       })
//     );
//   }

//   return (
//     <div>
//       <Button
//         variant="contained"
//         style={SignUpButton}
//         onClick={() => handleLogin()}
//       >
//         Login
//       </Button>

//       <Button variant="contained" style={SignUpButton}>
//         Sign Up
//       </Button>
//     </div>
//   );
// }
