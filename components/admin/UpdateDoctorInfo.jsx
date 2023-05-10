import * as React from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Autocomplete from "@mui/material/Autocomplete";
import MuiPhoneNumber from "material-ui-phone-number";
import CreateFormButtonSpacer from "./../CreateFormButtonSpacer";
import { useRouter } from "next/router";
import axios from "axios";
import Swal from "sweetalert2";
import { useLocalStorage } from "@rehooks/local-storage";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
export default function Update({ data }) {
  const [open, setOpen] = React.useState(false);
  const [id] = React.useState(data.id);
  const [fullName, setFullName] = React.useState(data.fullName);
  const [departmentName, setDepartmentName] = React.useState(
    data.departmentName
  );
  const [phone, setPhone] = React.useState(data.phone);
  const [email, setEmail] = React.useState(data.email);
  const [roomNumber, setRoomNumber] = React.useState(data.roomNumber);
  const [gender, setGender] = React.useState(data.gender);
  const router = useRouter();
  const [userInfo] = useLocalStorage("userInfo");

  //create employee
  const handelSubmit = async (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Are you sure?",
      text: "Want to update this doctor",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        setOpen(true);
        const { data } = await axios.put(
          `/api/doctor/update?id=${id}`,
          {
            fullName,
            departmentName,
            phone,
            gender,
            email,
            roomNumber: Number(roomNumber),
          },
          {
            headers: {
              authorization: `Bearer ${userInfo.token}`,
            },
          }
        );
        setOpen(false);
        if (data == "Doctor updated successfully") {
          router.push("/dashboard/admin/doctor");
          Swal.fire("Success", data, "success").then((result) => {
            if (result.isConfirmed) {
              router.reload(window.location.pathname);
            }
          });
        } else if (data == "Sorry, this doctor already exists") {
          Swal.fire("Warning", data, "warning");
        } else {
          Swal.fire("Error", data, "error");
        }
      }
    });
  };
  //phone input validation
  const handlerPhoneinput = (newValue) => {
    setPhone(newValue);
  };
  return (
    <React.Fragment>
      <Stack spacing={2} component="form" onSubmit={handelSubmit}>
        <TextField
          label="Doctor name"
          type="text"
          placeholder="Enter name"
          size="small"
          required
          fullWidth
          value={fullName}
          color="secondary"
          onChange={(e) => {
            setFullName(e.target.value);
          }}
        />
        <Autocomplete
          defaultValue={departmentName}
          options={["Family Medicine", "Dermatology"].map((option) => option)}
          onChange={(event, newValue) => {
            setDepartmentName(newValue);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              size="small"
              required
              fullWidth
              color="secondary"
              label="Select Department"
            />
          )}
        />
        <MuiPhoneNumber
          value={phone}
          defaultCountry={"bd"}
          label="Phone"
          placeholder="Phone number"
          size="small"
          required
          fullWidth
          color="secondary"
          variant="outlined"
          countryCodeEditable={false}
          onChange={handlerPhoneinput}
        />
        <TextField
          value={email}
          label="Email"
          type="email"
          placeholder="Enter email"
          size="small"
          required
          fullWidth
          color="secondary"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />{" "}
        <TextField
          value={roomNumber}
          label="Room Number"
          type="number"
          placeholder="Enter room number"
          size="small"
          required
          fullWidth
          color="secondary"
          onChange={(e) => {
            setRoomNumber(e.target.value);
          }}
        />
        <FormControl
          required
          onChange={(e) => {
            setGender(e.target.value);
          }}
        >
          <FormLabel>Gender</FormLabel>
          <RadioGroup row defaultValue={gender}>
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
            Update
          </Button>
        </CreateFormButtonSpacer>
      </Stack>
      <Backdrop open={open}>
        <CircularProgress color="secondary" />
      </Backdrop>
    </React.Fragment>
  );
}
