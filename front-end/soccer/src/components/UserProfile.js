import { Avatar } from "@mui/material";
import React from "react";
import GetUser from "../utils/GetUser";
import {deepPurple } from "@mui/material/colors";
import './UserProfile.css'

export default function UserProfile() {
  const userInfo = GetUser();
  return (
    <div>
      <div className="userProfile">
        <div className="inLine">Hi{userInfo.firstName}</div>
        <div className="inLine">
        <Avatar sx={{ bgcolor: deepPurple[500] }}>R</Avatar>
        </div>
      </div>
    </div>
  );
}
