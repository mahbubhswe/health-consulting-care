import * as React from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Backdrop from "@mui/material/Backdrop";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import CreateFormButtonSpacer from "./CreateFormButtonSpacer";
import Typography from "@mui/material/Typography";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useRouter } from "next/router";
import axios from "axios";
import Swal from "sweetalert2";
import { useLocalStorage } from "@rehooks/local-storage";
export default function AddSubjectAndTimeForm({ data }) {
  const [open, setOpen] = React.useState(false);
  const [subjectList, setSubjectList] = React.useState();
  const [className, setClassName] = React.useState();
  const [day, setDay] = React.useState();
  const [subject, setSubject] = React.useState();
  const [startTime, setStartTime] = React.useState();
  const [endTime, setEndTime] = React.useState();
  const router = useRouter();
  const [userInfo] = useLocalStorage("userInfo");

  //add day, subject and time to class routine
  const handelSubmit = async (e) => {
    e.preventDefault();
    e.target.reset();
    setOpen(true);
    const { data } = await axios.post(
      `/api/classRoutine/addDaySubjectAndTime`,
      {
        className,
        day,
        subject,
        startTime,
        endTime,
      },
      {
        headers: {
          authorization: `Bearer ${userInfo.token}`,
        },
      }
    );
    setOpen(false);
    if (data == "Subject and time added successfully") {
      router.push("/dashboard/class-routine");
      Swal.fire("Success", data, "success").then((result) => {
        if (result.isConfirmed) {
          router.reload(window.location.reload);
        }
      });
    } else if (
      data ==
      "Sorry, you have already added same record. Duplicate entry is not allowed"
    ) {
      Swal.fire("Warning", data, "warning");
    } else {
      Swal.fire("Error", data, "error");
    }
  };
  // get subject
  const getSubjectOfClass = async (className) => {
    setClassName(className);
    const { data } = await axios.get(
      `/api/classRoutine/getSubject?className=${className}`
    );
    setSubjectList(data);
  };
  //set start time
  const handleChangeStartTime = (newValue) => {
    setStartTime(newValue);
  };
  //set end time
  const handleChangeEndTime = (newValue) => {
    setEndTime(newValue);
  };
  return (
    <React.Fragment>
      <Stack spacing={2} component="form" onSubmit={handelSubmit}>
        <Autocomplete
          options={data.map((option) => option.className)}
          onChange={(event, newValue) => {
            getSubjectOfClass(newValue);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              size="small"
              required
              fullWidth
              color="yallo"
              label="Select Class"
              helperText={
                <Typography color="error">
                  {data.length == 0
                    ? "Sorry, no class routine found. Please first create class routine to add subject and time."
                    : null}
                </Typography>
              }
            />
          )}
        />
        <Autocomplete
          size="small"
          required
          fullWidth
          options={[
            "Saturday",
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
          ].map((option) => option)}
          onChange={(event, newValue) => {
            setDay(newValue);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              size="small"
              required
              fullWidth
              color="yallo"
              label="Select Day"
            />
          )}
        />
        <Autocomplete
          options={
            subjectList ? subjectList.map((option) => option.subjectName) : []
          }
          onChange={(event, newValue) => {
            setSubject(newValue);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              size="small"
              required
              fullWidth
              color="yallo"
              label="Select Subject"
            />
          )}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Stack spacing={1} direction={{ xs: "column", sm: "row", md: "row" }}>
            <TimePicker
              label="Start Time"
              value={startTime}
              type="time"
              ampm={false}
              onChange={handleChangeStartTime}
              renderInput={(params) => (
                <TextField
                  {...params}
                  size="small"
                  required
                  fullWidth
                  color="yallo"
                />
              )}
            />
            <TimePicker
              label="End Time"
              value={endTime}
              ampm={false}
              onChange={handleChangeEndTime}
              renderInput={(params) => (
                <TextField
                  {...params}
                  size="small"
                  required
                  fullWidth
                  color="yallo"
                />
              )}
            />
          </Stack>
        </LocalizationProvider>

        <CreateFormButtonSpacer>
          <Button
            type="button"
            variant="contained"
            color="error"
            size="small"
            onClick={() => router.push("/dashboard/class-routine")}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={
              className
                ? subject
                  ? startTime
                    ? endTime
                      ? false
                      : true
                    : true
                  : true
                : true
            }
            variant="contained"
            color="yallo"
            size="small"
          >
            Save Now
          </Button>
        </CreateFormButtonSpacer>
        <Typography align="right" color="error">
          {className
            ? subject
              ? startTime
                ? endTime
                  ? null
                  : "Please select end time"
                : "Please select start time"
              : "Please select a subject"
            : "Please select a class"}
        </Typography>
      </Stack>
      <Backdrop open={open}>
        <CircularProgress color="yallo" />
      </Backdrop>
    </React.Fragment>
  );
}
