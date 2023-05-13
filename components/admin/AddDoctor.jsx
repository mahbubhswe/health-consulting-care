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
import FileBase64 from "react-file-base64";
import Image from "next/image";

export default function AddDoctor() {
  const [open, setOpen] = React.useState(false);
  const [fullName, setFullName] = React.useState();
  const [description, setDescription] = React.useState();
  const [visitingHours, setVisitingHours] = React.useState();
  const [departmentName, setDepartmentName] = React.useState();
  const [phone, setPhone] = React.useState(0);
  const [email, setEmail] = React.useState();
  const [photo, setPhoto] = React.useState();
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
            profilePic: photo,
            departmentName,
            phone,
            password,
            description,
            gender,
            visitingHours,
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
        {photo ? (
          <Image src={photo} height={150} width={150} quality={100} />
        ) : (
          <p
            style={{
              display: "grid",
              placeContent: "center",
              height: "150px",
              width: "150px",
              border: "1px dashed #ccc",
              borderRadius: "4px",
            }}
          >
            Select a photo
          </p>
        )}
        <FileBase64 onDone={(e) => setPhoto(e.base64)} />
        <TextField
          label="Doctor name"
          type="text"
          placeholder="Enter name"
          size="small"
          required
          fullWidth
          name="name"
          color="secondary"
          onChange={(e) => {
            setFullName(e.target.value);
          }}
        />
        <Autocomplete
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
        />
        <TextField
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
        />{" "}
        <TextField
          label="Visiting Hours"
          type="text"
          placeholder="Write visiting hours"
          size="small"
          required
          fullWidth
          multiline
          minRows={4}
          color="secondary"
          onChange={(e) => {
            setVisitingHours(e.target.value);
          }}
        />
        <TextField
          label="Description"
          type="text"
          placeholder="Write description"
          size="small"
          required
          multiline
          minRows={4}
          fullWidth
          color="secondary"
          onChange={(e) => {
            setDescription(e.target.value);
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
            Add Doctor
          </Button>
        </CreateFormButtonSpacer>
      </Stack>
      <Backdrop open={open}>
        <CircularProgress color="secondary" />
      </Backdrop>
    </React.Fragment>
  );
}
