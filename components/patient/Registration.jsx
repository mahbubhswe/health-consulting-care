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
  Container,
  Autocomplete,
} from "@mui/material";
import Link from "next/link";

export default function PatientRegistration() {
  const [open, setOpen] = React.useState(false);
  const [height, setHeight] = React.useState();
  const [weight, setWeight] = React.useState();
  const [bloodGroup, setBloodGroup] = React.useState();
  const [sex, setSex] = React.useState();
  const [dateOfBirth, setDateOfBirth] = React.useState();
  const [maritalStatus, setMaritalStatus] = React.useState();
  const [fullName, setFullName] = React.useState();
  const [address, setAddress] = React.useState();
  const [phone, setPhone] = React.useState(0);
  const [password, setPassword] = React.useState();
  const router = useRouter();

  //create patient
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
          height,
          weight,
          bloodGroup,
          sex,
          dateOfBirth,
          maritalStatus,
          password,
          address,
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
    <>
      {" "}
      <Stack spacing={2} component="form" onSubmit={handelSubmit}>
        <Typography
          variant="h5"
          fontWeight={800}
          align="center"
          sx={{ color: "gray" }}
        >
          Create a new patient account
        </Typography>
        <TextField
          label="Name"
          type="text"
          placeholder="Enter full name"
          size="small"
          required
          fullWidth
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
          color="secondary"
          onChange={(e) => {
            setPhone(e.target.value);
          }}
        />
        <TextField
          label="Adddress"
          type="text"
          placeholder="Enter address"
          size="small"
          required
          fullWidth
          color="secondary"
          onChange={(e) => {
            setAddress(e.target.value);
          }}
        />
        <TextField
          label="Height"
          type="text"
          placeholder="Enter height"
          size="small"
          required
          fullWidth
          color="secondary"
          onChange={(e) => {
            setHeight(e.target.value);
          }}
        />{" "}
        <TextField
          label="Weight"
          type="number"
          placeholder="Enter weight"
          size="small"
          required
          fullWidth
          color="secondary"
          onChange={(e) => {
            setWeight(e.target.value);
          }}
        />{" "}
        <Autocomplete
          options={["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map(
            (option) => option
          )}
          onChange={(event, newValue) => {
            setBloodGroup(newValue);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              size="small"
              required
              fullWidth
              color="secondary"
              label="Select Blood Group"
            />
          )}
        />
        <TextField
          label="Date of Birth"
          type="date"
          size="small"
          required
          fullWidth
          color="secondary"
          onChange={(e) => {
            setDateOfBirth(e.target.value);
          }}
        />{" "}
  
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
            setSex(e.target.value);
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
        </FormControl>{" "}
        <FormControl
          required
          onChange={(e) => {
            setMaritalStatus(e.target.value);
          }}
        >
          <FormLabel>Marital Status</FormLabel>
          <RadioGroup row>
            <FormControlLabel
              value="single"
              control={<Radio color="secondary" size="small" />}
              label="Single"
            />
            <FormControlLabel
              value="married"
              control={<Radio color="secondary" size="small" />}
              label="Married"
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
    </>
  );
}
