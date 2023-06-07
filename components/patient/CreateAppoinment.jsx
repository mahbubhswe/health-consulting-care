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
import { Box, Typography } from "@mui/material";
export default function CreateAppoinment({ data }) {
  const [open, setOpen] = React.useState(false);
  const [doctorInfo] = React.useState(data);
  const router = useRouter();
  const [userInfo] = useLocalStorage("userInfo");
  const [time, setTime] = React.useState("10:00");

  //create employee
  const handelSubmit = async (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Are you sure?",
      text: "Want to create a new appointment",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        setOpen(true);
        const { data } = await axios.post(
          `/api/appointment/create`,
          {
            doctorPhone: doctorInfo.phone,
            patientPhone: userInfo ? userInfo.phone : null,
            departmentName: doctorInfo.departmentName,
            doctorName: doctorInfo.fullName,
            roomNumber: doctorInfo.roomNumber,
            time: time,
          },
          {
            headers: {
              authorization: `Bearer ${userInfo.token}`,
            },
          }
        );
        setOpen(false);
        if (data == "Appointment created successfully") {
          router.push("/dashboard/patient/appointment");
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
        {/* <Autocomplete
          options={
            data.length != 0 ? data.map((option) => option.fullName) : []
          }
          onChange={(event, newValue) => {
            data.forEach((element) => {
              if (element.fullName == newValue) {
                setDoctorInfo(element);
              }
            });
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              size="small"
              required
              fullWidth
              color="secondary"
              label="Select doctor"
            />
          )}
        /> */}
        <Box
          sx={{ border: "1px  dashed #ccc", p: "10px", borderRadius: "4px" }}
        >
          <Typography fontWeight={900}>{`Doctor's Information`}</Typography>
          <Typography>
            Name: <strong>{doctorInfo.fullName}</strong>
          </Typography>
          <Typography>
            Department: <strong>{doctorInfo.departmentName}</strong>
          </Typography>
          <Typography>
            Email: <strong>{doctorInfo.email}</strong>
          </Typography>
          <Typography>
            Phone: <strong>{doctorInfo.phone}</strong>
          </Typography>
          <Typography>
            Room Number: <strong>{doctorInfo.roomNumber}</strong>
          </Typography>
        </Box>
        <TextField
          size="small"
          required
          fullWidth
          color="secondary"
          label="Select time"
          type="time"
          onChange={(e) => setTime(e.target.value)}
        />
        <CreateFormButtonSpacer>
          <Button
            type="button"
            variant="contained"
            color="error"
            size="small"
            onClick={() => router.push("/dashboard/patient/doctor-list")}
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
            Make Appointment
          </Button>
        </CreateFormButtonSpacer>
      </Stack>
      <Backdrop open={open}>
        <CircularProgress color="secondary" />
      </Backdrop>
    </React.Fragment>
  );
}
