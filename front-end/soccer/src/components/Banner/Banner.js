import React from "react";
import Carousel from "react-material-ui-carousel";
import { Grid } from "@mui/material";

export function BannerCarousel(props) {
  var items = [
    {
        src1: "https://www.heartlandsoccer.net/wp-content/uploads/2021/03/dicks-sporting-goods.png",
        src2: "https://www.heartlandsoccer.net/wp-content/uploads/2021/03/comets-logo.png",
        src3: "https://www.heartlandsoccer.net/wp-content/uploads/2021/11/trace-logo-250p.png",
        src4: "https://www.heartlandsoccer.net/wp-content/uploads/2021/09/papa-jones-sidebar-092021.jpg",
        src5: "https://www.heartlandsoccer.net/wp-content/uploads/2021/03/sporting-kc-ii.png ",
        src6: "https://www.heartlandsoccer.net/wp-content/uploads/2021/03/academy-sports-outdoors.png",
    },
    {
      src1: "https://www.heartlandsoccer.net/wp-content/uploads/2021/03/security-bank-kansas-city.png",
      src2: "https://www.heartlandsoccer.net/wp-content/uploads/2021/03/museum-at-prairiefire.png",
      src3: "https://www.heartlandsoccer.net/wp-content/uploads/2021/03/mark-alford-kc.png",
      src4: "https://www.heartlandsoccer.net/wp-content/uploads/2021/03/molle-toyota-kansas-city.png",
      src5: "https://www.heartlandsoccer.net/wp-content/uploads/2021/03/hca-midwest-rmc.png ",
      src6: "https://www.heartlandsoccer.net/wp-content/uploads/2021/03/us-youth-futsal.png",
    },
    {
        src1: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLxmZMZthxYNtu9GPiuypLBYveUinJJwx1RQ&usqp=CAU",
        src2: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_BqkoajeTsr0nB0zBTmoJZZmlD-CZS-tRUQ&usqp=CAU",
        src3: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5hrvS5pcO4ErF0ooqVxZS4U7izp35q6FATg&usqp=CAU",
        src4: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8fwaetkupiwC470WynnT0DH9FNIC-RI5RJA&usqp=CAU",
        src5: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMfAfBypaaT398t28AcAkQeRx8Fr11yiSN8Q&usqp=CAU  ",
        src6: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJiwFt_BPKBO8KcAgoevr4xdV3XpGwm0uSaA&usqp=CAU",
      },
  ];

  return (
    <Carousel interval={1500}>
      {items.map((item, i) => (
        <Item key={i} item={item} />
      ))}
    </Carousel>
  );
}

function Item(props) {
  console.log(props);
  return (
    <div style={{ height: "290px", justifyContent: "center",marginTop:"20px"}}>
        <div style={{textAlign:"center",fontSize:"30px",fontWeight:"600"}}>SPONSORS AND PARTNERS</div>
      <Grid container spacing={4} sx={{ maxHeight: "400px"}}>
        <Grid item xs={2}>
          <img
            src={props.item.src1}
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
          ></img>
        </Grid>
        <Grid item xs={2}>
          <img
            src={props.item.src2}
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
          ></img>
        </Grid>
        <Grid item xs={2}>
          <img
            src={props.item.src3}
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
          ></img>
        </Grid>
        <Grid item xs={2}>
          <img
            src={props.item.src4}
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
          ></img>
        </Grid>
        <Grid item xs={2}>
          <img
            src={props.item.src5}
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
          ></img>
        </Grid>
        <Grid item xs={2}>
          <img
            src={props.item.src6}
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
          ></img>
        </Grid>
      </Grid>
    </div>
  );
}
