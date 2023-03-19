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
export default function CreateAppoinment({ data}) {
  const [open, setOpen] = React.useState(false);
  const [time, setTime] = React.useState();
  const [doctorPhone, setDoctorPhone] = React.useState(0);
  const router = useRouter();
  const [userInfo] = useLocalStorage("userInfo");

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
            patientPhone,
            doctorPhone,
            time,
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
        <Autocomplete
          options={data.map((option) => option.fullName)}
          onChange={(event, newValue) => {
            selectDoctorName(data.filter((item) => item == newValue));
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
        />
        <TextField
          label="Doctor Phone"
          type="tel"
          size="small"
          required
          fullWidth
          disabled
          color="secondary"
          value={doctorPhone}
        />

        <CreateFormButtonSpacer>
          <Button
            type="button"
            variant="contained"
            color="error"
            size="small"
            onClick={() => router.push("/dashboard/admin/doctor")}
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
