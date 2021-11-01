import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import React, { useEffect, useState } from "react";

import Paper from "@mui/material/Paper";
import "./FooterAndMain.css";
import "./ATournament.css";
import { useSelector } from "react-redux";
import BlockRotateLoading from "./BlockRotateLoading";

export default function Details(props) {
  const state = useSelector((state) => state);
  const [tournament, setTournament] = useState({ items: [], isLoading: true });
  const newName = props.name;

  useEffect(() => {
    const userInfo = state.userInfo;
    getData();
    async function getData() {
      const res = await fetch(
        "http://ser515-team31-soccertournament-server.us-east-2.elasticbeanstalk.com/rest/tournament/" +
          newName,
        {
          headers: {
            Authorization: userInfo.jwt,
          },
          method: "GET",
        }
      );
      const responseData = await res.json();
      const data = responseData.data;
      const startDay =
        data.startDate[1] + "/" + data.startDate[2] + "/" + data.startDate[0];
      const endDay =
        data.endDate[1] + "/" + data.endDate[2] + "/" + data.endDate[0];
      const registrationDeadline =
        data.registrationDeadline[1] +
        "/" +
        data.registrationDeadline[2] +
        "/" +
        data.registrationDeadline[0];
      setTournament({
        items: data,
        startDate:startDay,
        endDate:endDay,
        registrationDeadline:registrationDeadline,
        isLoading:false
      });
    }
  }, [setTournament]);

  function createData(key, value) {
    return { key, value };
  }

  const rows = [
    createData("Tournament name", tournament.items.name),
    createData("Start day", tournament.startDate),
    createData("End day", tournament.endDate),
    createData("End of registration", tournament.registrationDeadline),
    createData("Fee", tournament.items.registrationFee),
    createData("Feild", "this is a location"),
    createData("type", tournament.items.type),
  ];
  if (tournament.isLoading)
    return (
      <BlockRotateLoading></BlockRotateLoading>
    );
  return (
    <div className="detail">
      <TableContainer component={Paper} sx={{ maxWidth: 600 }}>
        <Table
          sx={{ minWidth: 500, maxWidth: 700 }}
          size="small"
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
