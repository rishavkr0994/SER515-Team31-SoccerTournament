import { Button } from "@mui/material";
import React, { useEffect } from "react";
import Pagination from "@mui/material/Pagination";
import "./FooterAndMain.css";
import TournamentCard from "./TournamentCard";
import { Grid } from "@mui/material";
import GetUser from "../utils/GetUser";
import { useState } from "react";
import axios from "axios";
import BlockRotateLoading from "./BlockRotateLoading";


export default function AllTournament() {
  const userInfo = GetUser();
  const [data, setData] = useState({isLoading:true});
  const [page,setPage] = useState(1)
  const [rows, setRows] = useState({arr:[],isLoading:true,render:false})
  const [query, setQuery] = useState({});
  useEffect(() => {
    const newQ = {
      page: 1,
      size: 10,
      filterUpcoming: false,
      isLoading:true
    }
    setQuery(newQ)
    fetchData()
  },[]);

  const handlePageChange = (e,p)=>{
    const newp = p
    setPage(newp)
    const newQ = {...query};
    newQ.page = p;
    newQ.isLoading = ! query.isLoading;
    setQuery(newQ)
    fetchData(p);
  }

   function fetchData(p){
    console.log("check Query");
    console.log(query);
    axios({
      method: "GET",
      url: "http://ser515-team31-soccertournament-server.us-east-2.elasticbeanstalk.com/rest/tournament",
      headers: {
        Authorization: userInfo.jwt,
      },
      params: {
        page: p,
        size: query.size,
        filterUpcoming: query.filterUpcoming,
      },
    }).then((res) => {
      console.log("from backend");
      console.log(res.data);
      const newData = {...data}
      newData.res = res.data
      newData.isLoading = false;
      newData.render = !data.render;
      setData(newData);
      const arr = Object.values(res.data.data);
      const newT = {...rows};
      newT.arr = arr;
      newT.isLoading = !rows.isLoading;
      newT.render = !rows.render
      setRows(newT)
    });
  }

  if (data.isLoading) return(       <BlockRotateLoading></BlockRotateLoading>);
  return(
    <div
      className="Main"
      style={{ marginTop: "30px", justifyContent: "center" }}
    >
      <div style={{ height: "30px" }}></div>
      <Grid container spacing={6}>
        {rows.arr.map((row) => (
          <Grid item sx={{ width: "20%" }}>
            <TournamentCard key={row.name} tournament={row} />
          </Grid>
        ))}
      </Grid>

      <Pagination
        count={data.res.pageCount}
        variant="outlined"
        page={page}
        onChange={(e,page)=>{
          handlePageChange(e,page)
        }}
        color="secondary"
        sx={{ display: "flex", justifyContent: "center", marginTop: "25px" }}
      />
      <Button variant="contained" href="/tournament/create">
        Add Tournament
      </Button>
    </div>
  );
}
