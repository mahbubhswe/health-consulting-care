import * as React from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import CreateFormButtonSpacer from "../CreateFormButtonSpacer";
import { useRouter } from "next/router";
import axios from "axios";
import Swal from "sweetalert2";

import { useLocalStorage } from "@rehooks/local-storage";
import { Autocomplete } from "@mui/material";
export default function CreateAmbulanceBooking({ data }) {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  const [userInfo] = useLocalStorage("userInfo");
  const [roomAndCabinNumber, setRoomAndCabinNumber] = React.useState();
  const [date, setDate] = React.useState(new Date().getFullYear());
  const [time, setTime] = React.useState(new Date().getTime());
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
        const { data } = await axios.post(`/api/patient/cabin/create`, {
          name: userInfo.fullName,
          phone: userInfo.phone,
          roomAndCabinNumber: roomAndCabinNumber,
          date: date,
          time: time,
        });
        setOpen(false);
        if (data == "Cabin booking request has been sent successfully!") {
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
            data.length != 0
              ? data.map((option) => option.roomAndCabinNumber)
              : []
          }
          onChange={(event, newValue) => {
            setRoomAndCabinNumber(newValue);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              size="small"
              required
              fullWidth
              color="secondary"
              label="Select room and cabin number"
            />
          )}
        />
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
            onClick={() => router.push("/dashboard/patient/cabin-booking/")}
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
