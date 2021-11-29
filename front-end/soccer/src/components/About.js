import React from "react";
import "./FooterAndMain.css";
import Grid from "@mui/material/Grid";

export default function About() {
  return (
    <div>
      <div className="Main">
        <div>
          <Grid container spacing={2}>
            <Grid item xs={2}></Grid>
            <Grid item xs={2}>
              <img
                src="firework.gif"
                style={{ objectFit: "contain", width: "100%" }}
              ></img>
            </Grid>
            <Grid
              item
              xs={6}
              justifyContent="flex-start"
              display="flex"
              alignItems="center"
              sx={{ fontSize: "80px" }}
            >
              No.1 League in Arizona!
            </Grid>
          </Grid>
        </div>
      </div>
      <div style={{height:"400px",backgroundColor:"grey",marginTop:"-70vh",marginBottom:"20vh"}}>
            <Grid container spacing={2} style={{color:"white"}}>
              <Grid item  xs={6} className="aboutTitle">
                  <div>Our Mission</div>
              </Grid>
              <Grid item  xs={6} className="aboutTitle">
                  <div>Our Essence</div>
              </Grid>
              <Grid item  xs={6} className="aboutContent">
                  <div>Our mission is to provide a positive, competitive youth soccer experience for player, parent and coach. We emphasize long-term player development of physical, emotional and social skills. We believe a positive team sport experience will promote a youth's self-confidence and self-esteem beyond the soccer field.</div>
              </Grid>
              <Grid item  xs={6} className="aboutContent">
                  <div>We try to provide a healthy perspective on both winning and losing. We believe players, parents and coaches will learn more from a competitive 3–2 loss than a non-competitive 7–0 win. Success is defined by improvement, effort, competitive spirit and team play.</div>
              </Grid>
              <Grid item xs={12}></Grid>
              <Grid item xs={12}></Grid>
              <Grid item xs={12}></Grid>
              <Grid item xs={12}></Grid>

              <Grid item  xs={6} className="aboutTitle">
                  <div>Our Promise</div>
              </Grid>
              <Grid item  xs={6} className="aboutTitle">
                  <div>Our Vibe</div>
              </Grid>
              <Grid item  xs={6} className="aboutContent">
                  <div>To be a model soccer tournament in the Arizona area, with long term plan for existence and service to the community.</div>
              </Grid>
              <Grid item  xs={6} className="aboutContent">
                  <div>Continue to service our members, with caring and joyful spirit and treat everyone in the soccer community with respect and dignity.</div>
              </Grid>
            </Grid>
      </div>
    </div>
  );
}
