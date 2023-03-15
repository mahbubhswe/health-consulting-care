import React, { useState } from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Backdrop from "@mui/material/Backdrop";
import Typography from "@mui/material/Typography";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import { useRouter } from "next/router";
import axios from "axios";
import Swal from "sweetalert2";
import CreateFormButtonSpacer from "./CreateFormButtonSpacer";
import { useLocalStorage } from "@rehooks/local-storage";
export default function CreateFeesForm({ data }) {
  const [open, setOpen] = useState(false);
  const [id] = useState(data.id);
  const [inputError, setInputError] = useState();
  const router = useRouter();
      const [userInfo] = useLocalStorage("userInfo");

  const [fees, setFees] = useState({
    id: id,
    admissionFee: Number(data.admissionFee),
    tutionFee: Number(data.tutionFee),
    examFee: Number(data.examFee),
    sessionFee: Number(data.sessionFee),
    campusDevelopmentFee: Number(data.campusDevelopmentFee),
    othersFee: Number(data.othersFee),
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

  const handelSubmit = async (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Are you sure?",
      text: `You want to update this fees`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
      showLoaderOnConfirm: true,
      reverseButtons: true,
      allowOutsideClick: false,
    }).then(async (result) => {
      if (result.isConfirmed) {
        setOpen(true);
        fees.totalAmount = totalAmount;
        const { data } = await axios.put(`/api/fees/update`, fees, {
          headers: {
            authorization: `Bearer ${userInfo.token}`,
          },
        });
        setOpen(false);
        if (data == "Fees updated successfully") {
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
        <TextField
          value={data.className}
          label="Select Class"
          size="small"
          required
          color="yallo"
          inputProps={{ readOnly: true }}
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
            value={fees.admissionFee}
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
            value={fees.tutionFee}
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
            value={fees.examFee}
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
            value={fees.sessionFee}
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
            value={fees.campusDevelopmentFee}
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
            value={fees.othersFee}
            onChange={handelInput}
          />
        </Stack>
        <Typography>Total Amount: {totalAmount ? totalAmount : 0}</Typography>
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
            disabled={inputError ? true : false}
            variant="contained"
            color="yallo"
            size="small"
          >
            Update Fees
          </Button>
        </CreateFormButtonSpacer>

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
