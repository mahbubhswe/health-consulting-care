import * as React from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Autocomplete from "@mui/material/Autocomplete";
import CreateFormButtonSpacer from "../CreateFormButtonSpacer";
import { useRouter } from "next/router";
import axios from "axios";
import Swal from "sweetalert2";

import { useLocalStorage } from "@rehooks/local-storage";
export default function CreateAmbulanceBooking({ data }) {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  const [ambulanceNumber, setAmbulanceNumber] = React.useState({});
  const [userInfo] = useLocalStorage("userInfo");
  const [date, setDate] = React.useState(new Date().getFullYear());
  const [time, setTime] = React.useState(new Date().getTime());
  const [pikup, setPikup] = React.useState();
  const [destination, setDestination] = React.useState();
  //create employee
  const handelSubmit = async (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Are you sure?",
      text: "Want to sent this request",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        setOpen(true);
        const { data } = await axios.post(`/api/patient/ambulance/create`, {
          name: userInfo.fullName,
          phone: userInfo.phone,
          pickupPoint: pikup,
          destination: destination,
          date: date,
          time: time,
          ambulanceNumber: ambulanceNumber,
        });
        setOpen(false);
        if (data == "Ambulance booking request has been sent successfully!") {
          router.push("/dashboard/patient/ambulance");
          Swal.fire("Success", data, "success").then((result) => {
            if (result.isConfirmed) {
              router.reload(window.location.pathname);
            }
          });
        } else {
          Swal.fire("Error", data, "error");
        }
      }
    });
  };

  return (
    <React.Fragment>
      <Stack spacing={2} component="form" onSubmit={handelSubmit}>
        <Autocomplete
          options={
            data.length != 0 ? data.map((option) => option.ambulanceNumber) : []
          }
          onChange={(event, newValue) => {
            setAmbulanceNumber(newValue);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              size="small"
              required
              fullWidth
              color="secondary"
              label="Select ambulance number"
            />
          )}
        />
        <TextField
          size="small"
          required
          fullWidth
          color="secondary"
          label="Enter pickup point address"
          type="text"
          value={pikup}
          onChange={(e) => setPikup(e.target.value)}
        />
        <TextField
          size="small"
          required
          fullWidth
          color="secondary"
          label="Enter destination point address"
          type="text"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />{" "}
        <TextField
          size="small"
          required
          fullWidth
          color="secondary"
          label="Select date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <TextField
          size="small"
          required
          fullWidth
          color="secondary"
          label="Select time"
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
        <CreateFormButtonSpacer>
          <Button
            type="button"
            variant="contained"
            color="error"
            size="small"
            onClick={() => router.push("/dashboard/patient/ambulance-booking/")}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            size="small"
            color="secondary"
            sx={{ color: "#FFFFFF" }}
          >
            Book Now
          </Button>
        </CreateFormButtonSpacer>
      </Stack>
      <Backdrop open={open}>
        <CircularProgress color="secondary" />
      </Backdrop>
    </React.Fragment>
  );
}
