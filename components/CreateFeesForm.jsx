import *as React from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Backdrop from "@mui/material/Backdrop";
import Typography from "@mui/material/Typography";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import CreateFormButtonSpacer from "./CreateFormButtonSpacer";
import { useRouter } from "next/router";
import axios from "axios";
import Swal from "sweetalert2";
import { useLocalStorage } from "@rehooks/local-storage";
export default function CreateFeesForm({ data }) {
  const [open, setOpen] = React.useState(false);
  const [selectedClass, setSelectedClass] = React.useState();
  const [inputError, setInputError] = React.useState();
  const router = useRouter();
      const [userInfo] = useLocalStorage("userInfo");

  const [fees, setFees] = React.useState({
    admissionFee: 0,
    tutionFee: 0,
    examFee: 0,
    sessionFee: 0,
    campusDevelopmentFee: 0,
    othersFee: 0,
  });
  const totalAmount =
    fees.admissionFee +
    fees.tutionFee +
    fees.examFee +
    fees.sessionFee +
    fees.campusDevelopmentFee +
    fees.othersFee;
  const handelInput = (e) => {
    const newValue = e.target.value;
    if (newValue < 0) {
      setInputError("Found invalid input. Please avoid to use negative number");
      setFees({ ...fees, [e.target.name]: Number(newValue) });
    } else {
      setInputError();
      setFees({ ...fees, [e.target.name]: Number(newValue) });
    }
  };
//create class fees or instalment
  const handelSubmit = async (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Are you sure?",
      text: `You want to save this fees`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
      showLoaderOnConfirm: true,
      reverseButtons: true,
      allowOutsideClick: false,
    }).then(async (result) => {
      if (result.isConfirmed) {
        setOpen(true);
        fees.className = selectedClass;
        fees.totalAmount = totalAmount;
        const { data } = await axios.post(`/api/fees/create`, fees, {
          headers: {
            authorization: `Bearer ${userInfo.token}`,
          },
        });
        setOpen(false);
        if (data == "Fees saved successfully") {
          router.push("/dashboard/fees");
          Swal.fire("Success", data, "success").then((result) => {
            router.reload(window.location.reload);
          });
        } else if (data == "Sorry, fees of this class already exists") {
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
        <Autocomplete
          options={data.map((option) => option.className)}
          onChange={(event, newValue) => {
            setSelectedClass(newValue);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Select Class"
              size="small"
              required
              color="yallo"
              helperText={
                <Typography color="error">
                  {data.length > 0
                    ? null
                    : "Sorry, first you need to create a class. Without a class can't add fees."}
                </Typography>
              }
            />
          )}
        />

        <Stack
          spacing={1}
          direction={{ es: "column", sm: "column", md: "row" }}
        >
          <TextField
            label="Admission Fee"
            type="number"
            placeholder="Input admission fee"
            size="small"
            fullWidth
            required
            name="admissionFee"
            color="yallo"
            onChange={handelInput}
          />
          <TextField
            label="Tuition Fee"
            type="number"
            placeholder="Input tuition fee"
            size="small"
            fullWidth
            required
            name="tutionFee"
            color="yallo"
            onChange={handelInput}
          />
        </Stack>
        <Stack
          spacing={1}
          direction={{ es: "column", sm: "column", md: "row" }}
        >
          <TextField
            label="Exam Fee"
            type="number"
            placeholder="Input exam fee"
            size="small"
            fullWidth
            required
            name="examFee"
            color="yallo"
            onChange={handelInput}
          />
          <TextField
            label="Session Fee"
            type="number"
            placeholder="Input session fee"
            size="small"
            fullWidth
            required
            name="sessionFee"
            color="yallo"
            onChange={handelInput}
          />
        </Stack>
        <Stack
          spacing={1}
          direction={{ es: "column", sm: "column", md: "row" }}
        >
          <TextField
            label="Campus Development Fee"
            type="number"
            placeholder="Input campus development fee"
            size="small"
            fullWidth
            required
            name="campusDevelopmentFee"
            color="yallo"
            onChange={handelInput}
          />

          <TextField
            label="Others Fee"
            type="number"
            placeholder="Input others fee"
            size="small"
            fullWidth
            required
            name="othersFee"
            color="yallo"
            onChange={handelInput}
          />
        </Stack>
        <Typography>Total Amount: {totalAmount}</Typography>
        <CreateFormButtonSpacer>
          <Button
            type="button"
            variant="contained"
            color="error"
            size="small"
            onClick={() => router.push("/dashboard/fees")}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={selectedClass ? (inputError ? true : false) : true}
            variant="contained"
            color="yallo"
            size="small"
          >
            Save Fees
          </Button>
        </CreateFormButtonSpacer>
        <Typography align="right" color="error">
          {selectedClass ? null : "Please select a class"}
        </Typography>
        <Typography align="right" color="error">
          {inputError && inputError}
        </Typography>
      </Stack>
      <Backdrop open={open}>
        <CircularProgress color="yallo" />
      </Backdrop>
    </React.Fragment>
  );
}
