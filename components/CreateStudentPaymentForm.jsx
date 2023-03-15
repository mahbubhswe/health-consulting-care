import * as React from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import CreateFormButtonSpacer from "./CreateFormButtonSpacer";
import Autocomplete from "@mui/material/Autocomplete";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";
import axios from "axios";
import Swal from "sweetalert2";
import { useLocalStorage } from "@rehooks/local-storage";
export default function CreateStudentPaymentForm({ data }) {
  const [open, setOpen] = React.useState(false);
  const [student, setStudent] = React.useState();
  const [className, setClassName] = React.useState();
  const [studentName, setStudentName] = React.useState();
  const [studentId, setStudentId] = React.useState();
  const [amount, setAmount] = React.useState();
  const [wrongAmountInput, setWrongAmountInput] = React.useState();
  const router = useRouter();
      const [userInfo] = useLocalStorage("userInfo");

  //save student payment
  const savePayment = async (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Are you sure?",
      text: "You want to save this payment",
      icon: "question",
      showCancelButton: true,
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          setOpen(true);
          const { data } = await axios.post(
            `/api/payment/create`,
            {
              studentName,
              studentId,
              className,
              amount,
            },
            {
              headers: {
                authorization: `Bearer ${userInfo.token}`,
              },
            }
          );
          setOpen(false);
          if (data == "Payment saved successfully") {
            router.push("/dashboard/payment");
            Swal.fire("Success", data, "success").then((result) => {
              if (result.isConfirmed) {
                router.reload(window.location.reload);
              }
            });
          } else {
            Swal.fire("Failed", data, "error");
          }
        } catch (error) {
          Swal.fire("Warning", data, "warning");
        }
      }
    });
  };
//get student based on class name
  const getStudentOfSelectedClass = async (className) => {
    setClassName(className);
    const { data } = await axios.get(
      `/api/payment/getStudent?className=${className}`
    );
    setStudent(data);
  };
//set student name and id
  const setStudentNameAndId = (newValue) => {
    if (newValue) {
      const studentInfo = student.filter((item) => item.studentId == newValue);
      setStudentName(studentInfo[0].name);
      setStudentId(studentInfo[0].studentId);
    } else {
      setStudentName();
      setStudentId();
    }
  };
  //amount input validation
  const amountInputHandler = (e) => {
    const newValue = e.target.value;
    if (newValue < 1) {
      setWrongAmountInput(
        "Sorry, you can't make payment with negative number or zero amount."
      );
    } else {
      setAmount(newValue);
      setWrongAmountInput();
    }
  };
  return (
    <React.Fragment>
      <Stack spacing={1} component="form" onSubmit={savePayment}>
        <Autocomplete
          size="small"
          fullWidth
          options={data.map((option) => option.className)}
          onChange={(event, newValue) => {
            getStudentOfSelectedClass(newValue);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              required
              color="yallo"
              label="Select class"
              helperText={
                <Typography color="error">
                  {!data &&
                    "Sorry, there is no class to make payment student payment"}
                </Typography>
              }
            />
          )}
        />
        <Autocomplete
          size="small"
          fullWidth
          options={student ? student.map((option) => option.studentId) : []}
          onChange={(event, newValue) => {
            setStudentNameAndId(newValue);
          }}
          renderInput={(params) => (
            <TextField {...params} required color="yallo" label="Student id" />
          )}
        />
        <Paper
          sx={{ p: "15px", borderTop: "2px solid #F2D801" }}
          variant="outlined"
        >
          <Typography sx={{ color: "gray" }} fontWeight={700}>
            Payment Information
          </Typography>
          <Divider />
          <Typography>Class: {className}</Typography>
          <Typography>Name: {studentName}</Typography>
          <Typography>ID: {studentId} </Typography>
          <Typography>Amount: {amount}</Typography>
        </Paper>
        <TextField
          label="Amount"
          type="number"
          fullWidth
          required
          placeholder="Type amount"
          size="small"
          color="yallo"
          onChange={amountInputHandler}
          error={wrongAmountInput ? true : false}
          helperText={wrongAmountInput ? wrongAmountInput : null}
        />
        <CreateFormButtonSpacer>
          <Button
            type="button"
            variant="contained"
            color="error"
            size="small"
            onClick={() => router.push("/dashboard/payment")}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="yallo"
            size="small"
            disabled={
              className
                ? studentId
                  ? amount
                    ? null
                    : true
                  : true
                : true || wrongAmountInput
                ? true
                : false
            }
          >
            Save Payment
          </Button>
        </CreateFormButtonSpacer>
        <Typography align="right" color="error">
          {className
            ? studentId
              ? amount
                ? null
                : "Please input amount"
              : "Please select student id"
            : "Please select a class"}
        </Typography>
      </Stack>
      <Backdrop open={open}>
        <CircularProgress color="yallo" />
      </Backdrop>
    </React.Fragment>
  );
}
