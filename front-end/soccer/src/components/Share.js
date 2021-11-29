import { AwesomeButtonSocial } from "react-awesome-button";
import React from 'react';
import Grid from '@mui/material/Grid'


export default function Share() {
  return (
    <div style={{marginTop:"10px",marginBottom:"-50px"}}>
        <Grid container>
          <Grid item xs={4} >
          <AwesomeButtonSocial href="https://www.facebook.com/profile.php?id=100071460048636" type="facebook"></AwesomeButtonSocial>

          </Grid>
          <Grid item xs={4}>
          <AwesomeButtonSocial type="twitter"></AwesomeButtonSocial>

          </Grid>
          <Grid item xs={4}>
          <AwesomeButtonSocial url="https://www.instagram.com/runlinxiao/" type="instagram"></AwesomeButtonSocial>
          </Grid>
        </Grid>
    </div>
  );
}
