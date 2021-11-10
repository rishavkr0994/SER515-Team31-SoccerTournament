import React, { useState } from "react";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
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
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/lab";

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
      newT.iconSrc = res;
      setTournament(newT);
    });
  }

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
              backgroundColor: "cornflowerblue",
              padding: "20px",
            }}
          >
            Create Tournament
          </Typography>
          <Grid
            container
            sx={{
              marginTop: "20px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Grid item xs={4}>
              <TextField
                required
                id="standard-number"
                name="name"
                label="Tournament name"
                onChange={(e) => handleChange(e)}
              />
            </Grid>
            <Grid item xs={4}>
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
            <Grid item xs={4}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                  renderInput={(props) => <TextField {...props} />}
                  label="End of Registration Day"
                  value={value}
                  onChange={(e) => handleDeadline(e)}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={4} sx={{ marginTop: "10px" }}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  renderInput={(props) => <TextField {...props} />}
                  label="Start Date"
                  value={startDay}
                  onChange={(e) => handleStartDay(e)}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={4} sx={{ marginTop: "10px" }}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  renderInput={(props) => <TextField {...props} />}
                  label="End Date"
                  value={endDay}
                  onChange={(e) => handleEndDay(e)}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={4}></Grid>
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
              onChange={(files) => {
                handleImage(files);
                console.log(files);
              }}
            ></DropzoneArea>
          </div>
        </CardContent>
        <CardActions sx={{ justifyContent: "center" }}>
          <Button
            size="large"
            variant="contained"
            sx={{ marginBottom: "12px" }}
          >
            Create Tournament
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}
