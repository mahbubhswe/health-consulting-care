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
import MuiPhoneNumber from "material-ui-phone-number";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
export default function AddMedicine() {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState();
  const [address, setAddress] = React.useState();
  const [bloodGroup, setBloodGroup] = React.useState();
  const [lastDonationDate, setLastDonationDate] = React.useState();
  const [phone, setPhone] = React.useState(0);
  const [gender, setGender] = React.useState();
  const router = useRouter();
  const [userInfo] = useLocalStorage("userInfo");

  //create employee
  const handelSubmit = async (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Are you sure?",
      text: "Want to add this doctor",
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
          `/api/doctor/create`,
          {
            fullName,
            departmentName,
            phone,
            password,
            gender,
            email,
            roomNumber,
          },
          {
            headers: {
              authorization: `Bearer ${userInfo.token}`,
            },
          }
        );
        setOpen(false);
        if (data == "Doctor added successfully") {
          router.push("/dashboard/amin/doctor");
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
          label="Persone Name"
          type="text"
          placeholder="Enter persone name"
          size="small"
          required
          fullWidth
          name="name"
          color="secondary"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
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
          label="Address"
          type="text"
          placeholder="Enter address"
          size="small"
          required
          fullWidth
          color="secondary"
          onChange={(e) => {
            setAddress(e.target.value);
          }}
        />{" "}
        <MuiPhoneNumber
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
          label="Last Donation Date"
          type="date"
          placeholder="Enter date"
          size="small"
          required
          fullWidth
          color="secondary"
          onChange={(e) => {
            setLastDonationDate(e.target.value);
          }}
        />{" "}
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
        <CreateFormButtonSpacer>
          <Button
            type="button"
            variant="contained"
            color="error"
            size="small"
            onClick={() => router.push("/dashboard/admin/blood-bank")}
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
            Add Persone
          </Button>
        </CreateFormButtonSpacer>
      </Stack>
      <Backdrop open={open}>
        <CircularProgress color="secondary" />
      </Backdrop>
    </React.Fragment>
  );
}
