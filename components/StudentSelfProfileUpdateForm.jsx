import {
  Autocomplete,
  Backdrop,
  Button,
  CircularProgress,
  Container,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";
import * as React from "react";
import Swal from "sweetalert2";
import { useLocalStorage } from "@rehooks/local-storage";
import CreateFormButtonSpacer from "./CreateFormButtonSpacer";
export default function StudentSelfProfileUpdateForm({ data }) {
  const [open, setOpen] = React.useState(false);
  const [studentId] = React.useState(data.studentId);
  const [phone, setPhone] = React.useState(data.phone);
  const [email, setEmail] = React.useState(data.email);
  const [address, setAddress] = React.useState(data.address);
  const [fatherName, setFatherName] = React.useState(data.fatherName);
  const [motherName, setMotherName] = React.useState(data.motherName);
  const [bloodGroup, setBloodGroup] = React.useState(data.bloodGroup);
  const router = useRouter();
  const [userInfo] = useLocalStorage("userInfo");

  //Update profile function
  const updateProfile = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to update information",
      icon: "question",
      showCancelButton: true,
      reverseButtons: true,
      cancelButtonColor: "red",
      confirmButtonText: "Yes",
      allowOutsideClick: false,
    }).then(async (result) => {
      if (result.isConfirmed) {
        setOpen(true);
        const { data } = await axios.put(
          `/api/student/studentSelfUpdateProfileInfo`,
          {
            studentId,
            phone,
            email,
            address,
            fatherName,
            motherName,
            bloodGroup,
          },
          {
            headers: {
              authorization: `Bearer ${userInfo.token}`,
            },
          }
        );
        setOpen(false);
        if (data == "Profile updated successfully") {
          router.push("/student-portal/profile");
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
    <Container maxWidth="sm">
      <Paper sx={{ p: "20px" }}>
        <Stack spacing={1}>
          <Typography
            component="h2"
            variant="bold"
            align="center"
            sx={{ color: "gray" }}
          >
            Update Profile Information
          </Typography>
          <TextField
            value={phone}
            type="tel"
            label="Phone"
            color="yallo"
            size="small"
            placeHoler="Type Phone"
            onChange={(e) => setPhone(e.target.value)}
          />
          <TextField
            value={email}
            type="email"
            label="Email"
            color="yallo"
            size="small"
            placeHoler="Type email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            value={address}
            type="text"
            label="Address"
            color="yallo"
            size="small"
            placeHoler="Type address"
            onChange={(e) => setAddress(e.target.value)}
          />
          <TextField
            value={fatherName}
            type="text"
            label="Father's Name"
            color="yallo"
            size="small"
            placeHoler="Type father's name"
            onChange={(e) => setFatherName(e.target.value)}
          />
          <TextField
            value={motherName}
            type="text"
            label="Mother's Name"
            color="yallo"
            size="small"
            placeHoler="Type mother's name"
            onChange={(e) => setMotherName(e.target.value)}
          />

          <Autocomplete
            defaultValue={bloodGroup}
            options={["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"]}
            getOptionLabel={(option) => option}
            onChange={(event, newValue) => {
              setBloodGroup(newValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Blood Group"
                color="yallo"
                size="small"
              />
            )}
          />
          <CreateFormButtonSpacer>
            <Button
              type="button"
              variant="contained"
              color="error"
              size="small"
              onClick={() => router.push("/student-portal/profile")}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={updateProfile}
              sx={{ width: "100px" }}
              color="yallo"
              size="small"
            >
              Update
            </Button>
          </CreateFormButtonSpacer>
        </Stack>
      </Paper>

      <Backdrop open={open}>
        <CircularProgress color="yallo" />
      </Backdrop>
    </Container>
  );
}
