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
export default function AddMedicine() {
  const [open, setOpen] = React.useState(false);
  const [medicineName, setMedicineName] = React.useState();
  const [brand, setBrand] = React.useState();
  const [quantity, setQuantity] = React.useState();
  const [price, setPrice] = React.useState(0);
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
 
  return (
    <React.Fragment>
      <Stack spacing={2} component="form" onSubmit={handelSubmit}>
        <TextField
          label="Medicine name"
          type="text"
          placeholder="Enter name"
          size="small"
          required
          fullWidth
          name="name"
          color="secondary"
          onChange={(e) => {
            setMedicineName(e.target.value);
          }}
        />

        <TextField
          label="Brand"
          type="text"
          placeholder="Enter brand"
          size="small"
          required
          fullWidth
          color="secondary"
          onChange={(e) => {
            setBrand(e.target.value);
          }}
        />
        <TextField
          label="Quantity"
          type="number"
          placeholder="Enter quantity"
          size="small"
          required
          fullWidth
          color="secondary"
          onChange={(e) => {
            setQuantity(e.target.value);
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
