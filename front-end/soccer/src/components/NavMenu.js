import { Grid } from "@mui/material";
import React from "react";
import { Link ,useRouteMatch} from "react-router-dom";
import "./NavMenu.css";


class  NavMenu extends React.Component{
    render(){
        return (
            <div className="MenuStyle">
            <Grid container className="Nav" alignItems="center" justifyContent="center">
              <Grid item xs={2}></Grid>
              <Grid item xs={2}>
                <Item label="Home" to="/" 
                    activeOnlyWhenExact={true}
                ></Item>
              </Grid>
              <Grid item xs={2}>
                <Item label="Tournaments" to="/tournament/getAll"></Item>
              </Grid>
              <Grid item xs={2}>
                <Item label="Map" to="/map"></Item>
              </Grid>
              <Grid item xs={2}>    
                <Item label="About Us" to="/about"></Item>
              </Grid>
              <Grid item xs={2}></Grid>
            </Grid>
            </div>
          );

          function Item({label,to,activeOnlyWhenExact}) {
              let match = useRouteMatch({
                  path:to,
                  exact:activeOnlyWhenExact
              })
              const linkStyle = {
                textDecoration: "none",
                color: 'white',
                display:'block',
                height:'60px',
                lineHeight:'60px'
              };
            return (
            <div className={match? "MyActive" : "MyItem"}>
                <Link style={linkStyle} to={to}>{label}</Link>
            </div>
            );
          }      
    }
}

export default NavMenu;
