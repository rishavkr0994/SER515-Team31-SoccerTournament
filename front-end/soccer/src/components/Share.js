import { AwesomeButtonSocial } from "react-awesome-button";
import React from 'react';
import Grid from '@mui/material/Grid'


export default function Share() {
  return (
    <div style={{marginTop:"10px",marginBottom:"-50px"}}>
        <Grid container>
          <Grid item xs={4} >
          <AwesomeButtonSocial type="facebook"></AwesomeButtonSocial>

          </Grid>
          <Grid item xs={4}>
          <AwesomeButtonSocial type="twitter"></AwesomeButtonSocial>

          </Grid>
          <Grid item xs={4}>
          <AwesomeButtonSocial type="instagram"></AwesomeButtonSocial>
          </Grid>
        </Grid>
    </div>
  );
}
