import React, { useState } from "react";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import {
  AwesomeButton,
} from 'react-awesome-button';
import 'react-awesome-button/dist/themes/theme-blue.css';
import './awsButton.css'
import DateTimePicker from "@mui/lab/DateTimePicker";
import { DropzoneArea } from "material-ui-dropzone";
import "./FooterAndMain.css";
import "./CreateTournament.css";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  InputLabel,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/lab";
import GetUser from "../utils/GetUser";
import { InputAdornment, MenuItem } from "@material-ui/core";
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

export default function CreateTournament() {
  const [value, setValue] = React.useState(null);
  const [startDay, setStartDay] = React.useState(null);
  const [endDay, setEndDay] = React.useState(null);
  const inital = {};
  const [tournament, setTournament] = useState(inital);

  const handleChange = (e) => {
    setTournament({
      ...tournament,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleDeadline = (e) => {
    setValue(e);
    const newT = { ...tournament };
    newT.registrationDeadline = e;
    setTournament(newT);
  };

  const handleStartDay = (e) => {
    setStartDay(e);
    const newT = { ...tournament };
    newT.startDate = e;
    setTournament(newT);
  };

  const handleEndDay = (e) => {
    setEndDay(e);
    const newT = { ...tournament };
    newT.endDate = e;
    setTournament(newT);
  };

  const convertBase64 = (file) => {
    let newFile = new File(file, { type: "image" });
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(newFile);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  async function handleImage(file) {
    convertBase64(file).then((res) => {
      const newT = { ...tournament };
      const index = res.indexOf("base64,")+7;
       res = res.substring(index)
      newT.iconSrc = res;
      setTournament(newT);
    });
  }

  const userInfo = GetUser();

  const handleSubmit = () => {
    fetch(
      "http://ser515-team31-soccertournament-server.us-east-2.elasticbeanstalk.com/rest/tournament/registration",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: userInfo.jwt,
        },
        method: "POST",
        body: JSON.stringify(tournament),
      }
    )
    .then((res) => res.json())
    .then((res) => {
      if (!res.isSuccess) {
        throw new Error(res);
      }
    })
    .catch(() => {});
};
  console.log(userInfo);
  console.log(tournament);
  return (
    <div className="Main" style={{ justifyContent: "center", display: "flex" }}>
      <Card sx={{ width: "80%", height: "90%", marginTop: "50px" }}>
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{
              textAlign: "center",
              padding: "20px",

            }}
            className="createBg"
          >
            Create Tournament
          </Typography>
          <Grid
            container
            rowSpacing={2}
            sx={{
              marginTop: "20px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Grid item xs={3}>
              <TextField
                required
                id="standard-number"
                name="name"
                label="Tournament name"
                onChange={(e) => handleChange(e)}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                required
                maxRows={4}
                name="description"
                multiline
                id="standard-number"
                label="Description"
                onChange={(e) => handleChange(e)}
              />
            </Grid>
            <Grid item xs={3}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                  renderInput={(props) => <TextField {...props} />}
                  label="End of Registration Day"
                  value={value}
                  onChange={(e) => handleDeadline(e)}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={3}>
              <TextField
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <MonetizationOnIcon></MonetizationOnIcon>
                    </InputAdornment>
                  ),
                }}
                id="ticket"
                label="Registration Fee"
                type="number"
                onChange={(e) => {
                  const newT = {...tournament}
                  newT.registrationFee= e.target.value;
                  setTournament(newT)
                }}
                sx={{ maxWidth: "300px" }}
              />
            </Grid>
            <Grid item xs={3} sx={{ marginTop: "10px" }}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  renderInput={(props) => <TextField {...props} />}
                  label="Start Date"
                  value={startDay}
                  onChange={(e) => handleStartDay(e)}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={3} sx={{ marginTop: "10px" }}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  renderInput={(props) => <TextField {...props} />}
                  label="End Date"
                  value={endDay}
                  onChange={(e) => handleEndDay(e)}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={3}>
              <InputLabel id="demo-label">Type</InputLabel>
              <Select
                labelId="demo-label"
                id="demo-label"
                label="Type"
                defaultValue="U16"
                onChange={(e) => {
                  const newT = { ...tournament };
                  newT.type = e.target.value;
                  setTournament(newT);
                }}
                sx={{
                  width: "235px",
                }}
              >
                <MenuItem value="U16">U16</MenuItem>
                <MenuItem value="U17">U17</MenuItem>
                <MenuItem value="U18">U18</MenuItem>
                <MenuItem value="U19">U19</MenuItem>
                <MenuItem value="U20">U20</MenuItem>
                <MenuItem value="U21">U21</MenuItem>
                <MenuItem value="U22">U22</MenuItem>
                <MenuItem value="U23">U23</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={3}>
              <TextField
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <MonetizationOnIcon></MonetizationOnIcon>
                    </InputAdornment>
                  ),
                }}
                id="ticket"
                label="Ticket Price"
                type="number"
                onChange={(e) => {
                  const newT = {...tournament}
                  newT.ticketPrice= e.target.value;
                  setTournament(newT)
                }}
                sx={{ maxWidth: "300px",marginTop:"10px" }}
              />
            </Grid>
          </Grid>
          <div
            style={{
              marginTop: "10px",
              color: "cornflowerblue",
              fontSize: "20px",
            }}
          >
            Please select a image for the tournament:
          </div>
          <div>
            <DropzoneArea
              acceptedFiles={["image/*"]}
              filesLimit={1}
              onChange={(files) => {
                handleImage(files);
              }}
            ></DropzoneArea>
          </div>
        </CardContent>
        <div>
          <CardActions sx={{ justifyContent: "center" }}>
            <AwesomeButton
              type="primary"
              className="aws-btn"
              onPress={handleSubmit}
            >
              Create Tournament
            </AwesomeButton>
          </CardActions>
        </div>
      </Card>
    </div>
  );
}
