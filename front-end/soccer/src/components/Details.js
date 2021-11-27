import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import React, { useEffect, useState } from "react";

import Paper from "@mui/material/Paper";
import "./FooterAndMain.css";
import "./ATournament.css";
import BlockRotateLoading from "./BlockRotateLoading";
import GetUser from "../utils/GetUser";
import API_BASE from "../api/api";

export default function Details(props) {
  const userInfo = GetUser()
  const [tournament, setTournament] = useState({ items: [], isLoading: true });

  useEffect(() => {
    getData();
    async function getData() {
      const res = await fetch(
        API_BASE+"rest/tournament/" +
          props.name,
        {
          headers: {
            Authorization: userInfo.jwt,
          },
          method: "GET",
        }
      );
      const responseData = await res.json();
      const data = responseData.data;
      setTournament({
        items: data,
        isLoading: false,
      });
    }
  }, [setTournament]);

  function createData(key, value) {
    return { key, value };
  }

  console.log(tournament);

  const rows = [
    createData("Tournament name", tournament.items.name),
    createData("Start day", tournament.items.startDate),
    createData("End day", tournament.items.endDate),
    createData("End of registration", tournament.items.registrationDeadline),
    createData("Fee", tournament.items.registrationFee),
    // createData("Feild", "this is a location"),
    createData("type", tournament.items.type),
  ];
  if (tournament.isLoading) return <BlockRotateLoading></BlockRotateLoading>;
  return (
    <div className="detail">
      <TableContainer
        component={Paper}
        sx={{ maxWidth: 600, marginTop: "50px" }}
      >
        <Table
          sx={{ minWidth: 500, maxWidth: 700 }}
          size="medium"
          aria-label="a dense table"
        >
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.key}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.key}
                </TableCell>
                <TableCell align="right">{row.value}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
