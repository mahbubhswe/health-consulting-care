import * as React from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Autocomplete from "@mui/material/Autocomplete";
import MuiPhoneNumber from "material-ui-phone-number";
import CreateFormButtonSpacer from "../CreateFormButtonSpacer";
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
export default function AddMedicine() {
  const [open, setOpen] = React.useState(false);
  const [ambulanceNumber, setAmbulanceNumber] = React.useState();
  const [brand, setBrand] = React.useState();
  const [quantity, setQuantity] = React.useState();
  const [phone, setPhone] = React.useState(0);
  const [email, setEmail] = React.useState();
  const [roomNumber, setRoomNumber] = React.useState();
  const [password, setPassword] = React.useState();
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
          label="Ambulance Number"
          type="text"
          placeholder="Enter ambulance number"
          size="small"
          required
          fullWidth
          name="name"
          color="secondary"
          onChange={(e) => {
            setAmbulanceNumber(e.target.value);
          }}
        />

        <CreateFormButtonSpacer>
          <Button
            type="button"
            variant="contained"
            color="error"
            size="small"
            onClick={() => router.push("/dashboard/admin/medicine")}
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
            Add Medicine
          </Button>
        </CreateFormButtonSpacer>
      </Stack>
      <Backdrop open={open}>
        <CircularProgress color="secondary" />
      </Backdrop>
    </React.Fragment>
  );
}
