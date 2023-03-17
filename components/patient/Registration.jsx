import * as React from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useRouter } from "next/router";
import axios from "axios";
import Swal from "sweetalert2";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import Link from "next/link";
export default function PatientRegistration() {
  const [open, setOpen] = React.useState(false);
  const [fullName, setFullName] = React.useState();
  const [phone, setPhone] = React.useState(0);
  const [password, setPassword] = React.useState();
  const [gender, setGender] = React.useState();
  const router = useRouter();

  //create employee
  const handelSubmit = async (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Are you sure?",
      text: "Want to acreate a new account",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        setOpen(true);
        const { data } = await axios.post(`/api/patient/create`, {
          fullName,
          phone,
          password,
          gender,
        });
        setOpen(false);
        if (data == "Account created successfully") {
          Swal.fire("Success", data, "success").then((result) => {
            if (result.isConfirmed) {
              router.reload(window.location.pathname);
            }
          });
        } else if (data == "Sorry, this patient already exists") {
          Swal.fire("Warning", data, "warning");
        } else {
          Swal.fire("Error", data, "error");
        }
      }
    });
  };

  return (
    <React.Fragment>
      <Stack spacing={2} component="form" onSubmit={handelSubmit}>
        <Typography
          variant="h5"
          fontWeight={800}
          align="center"
          sx={{ color: "gray" }}
        >
          Create a new account
        </Typography>
        <TextField
          label="Name"
          type="text"
          placeholder="Enter full name"
          size="small"
          required
          fullWidth
          name="name"
          color="secondary"
          onChange={(e) => {
            setFullName(e.target.value);
          }}
        />
        <TextField
          label="Phone"
          type="text"
          placeholder="Enter phone"
          size="small"
          required
          fullWidth
          name="phone"
          color="secondary"
          onChange={(e) => {
            setPhone(e.target.value);
          }}
        />
    

        <TextField
          label="Password"
          type="password"
          placeholder="Choice a new password"
          size="small"
          required
          fullWidth
          color="secondary"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />

        <FormControl
          required
          onChange={(e) => {
            setGender(e.target.value);
          }}
        >
          <FormLabel>Gender</FormLabel>
          <RadioGroup row>
            <FormControlLabel
              value="male"
              control={<Radio color="secondary" size="small" />}
              label="Male"
            />
            <FormControlLabel
              value="female"
              control={<Radio color="secondary" size="small" />}
              label="Female"
            />
          </RadioGroup>
        </FormControl>

        <Button
          type="submit"
          variant="contained"
          size="small"
          color="secondary"
          sx={{ color: "#FFFFFF" }}
        >
          Registration
        </Button>
        <br />
        <Typography align="right">
          <Link href={"/login"}>I have an account. Login now</Link>
        </Typography>
      </Stack>
      <Backdrop open={open}>
        <CircularProgress color="secondary" />
      </Backdrop>
    </React.Fragment>
  );
}
