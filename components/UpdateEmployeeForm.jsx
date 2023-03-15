import React, { useState } from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import Swal from "sweetalert2";
import MuiPhoneNumber from "material-ui-phone-number";
import { useRouter } from "next/router";
import CreateFormButtonSpacer from "./CreateFormButtonSpacer";
import { Autocomplete, Typography } from "@mui/material";
import { useLocalStorage } from "@rehooks/local-storage";
export default function UpdateEmployeeForm({ data }) {
  const [open, setOpen] = useState(false);
  const [id] = useState(data.id);
  const [employeeName, setEmployeeName] = useState(data.employeeName);
  const [salary, setSalary] = useState(data.salary);
  const [employeeType, setEmployeeType] = useState(data.employeeType);
  const [employeePhone, setEmployeePhone] = useState(data.employeePhone);
  const [nameInputError, setNameInputError] = useState();
  const [salaryInputError, setSalaryInputError] = useState();
  const router = useRouter();
  const [userInfo] = useLocalStorage("userInfo");

  const handelSubmit = async (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Are you sure?",
      text: "Want to add this employee",
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
          `/api/employee/update`,
          {
            id: id,
            employeeName,
            employeeType,
            employeePhone,
            salary,
          },
          {
            headers: {
              authorization: `Bearer ${userInfo.token}`,
            },
          }
        );
        setOpen(false);
        if (data == "Employee's information updated successfully") {
          router.push("/dashboard/employee");
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
    <React.Fragment>
      <Stack spacing={2} component="form" onSubmit={handelSubmit}>
        <TextField
          label="Employee ID"
          type="text"
          size="small"
          required
          fullWidth
          name="name"
          color="yallo"
          inputProps={{ readOnly: true }}
          value={data.employeeId}
        />
        <Autocomplete
          defaultValue={employeeType}
          options={["Teacher", "Staff"].map((option) => option)}
          onChange={(event, newValue) => {
            setEmployeeType(newValue);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              size="small"
              required
              fullWidth
              color="yallo"
              label="Select Employee Type"
            />
          )}
        />
        <TextField
          label="Name"
          type="text"
          placeholder="Name"
          size="small"
          required
          fullWidth
          color="yallo"
          value={employeeName}
          error={nameInputError && nameInputError}
          helperText={nameInputError && nameInputError}
          onChange={(e) => {
            let newValue = e.target.value;
            if (newValue.match(/^(?! )[A-Za-z ]*(?<! )$/)) {
              if (newValue.length < 3) {
                setNameInputError("Name must be at least 3 characters");
                setEmployeeName(newValue);
              } else {
                setNameInputError();
                setEmployeeName(newValue);
              }
            } else {
              setEmployeeName(newValue);
              setNameInputError(
                "Input allowed only alphabetic characters and space not allowed at the beginning and end of the string"
              );
            }
          }}
        />
        <MuiPhoneNumber
          defaultCountry={"bd"}
          label="Phone"
          placeholder="Phone number"
          size="small"
          required
          fullWidth
          color="yallo"
          variant="outlined"
          value={employeePhone}
          countryCodeEditable={false}
          onChange={(newValue) => {
            setEmployeePhone(newValue);
          }}
        />

        <TextField
          label="Salary"
          type="number"
          placeholder="Give a class name"
          size="small"
          required
          fullWidth
          color="yallo"
          value={salary}
          error={salaryInputError && salaryInputError}
          helperText={salaryInputError && salaryInputError}
          onChange={(e) => {
            const newValue = e.target.value;
            if (newValue < 1) {
              setSalary();
              setSalaryInputError(
                "Salary amuont can't be nagative number or zero"
              );
            } else {
              setSalaryInputError();
              setSalary(e.target.value);
            }
          }}
        />
        <CreateFormButtonSpacer>
          <Button
            type="button"
            variant="contained"
            color="error"
            size="small"
            onClick={() => router.push("/dashboard/employee")}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={
              employeeType
                ? employeeName
                  ? employeePhone
                    ? salary
                      ? false
                      : true
                    : true
                  : true
                : true || salary
                ? true
                : false
            }
            variant="contained"
            size="small"
            color="yallo"
          >
            Update
          </Button>
        </CreateFormButtonSpacer>
        <Typography align="right" color="error">
          {employeeType
            ? employeeName
              ? employeePhone
                ? salary
                  ? null
                  : "Please input salary"
                : "Please select employee phone"
              : "Please select employee name"
            : "Please select employee type"}
        </Typography>
      </Stack>
      <Backdrop open={open}>
        <CircularProgress color="yallo" />
      </Backdrop>
    </React.Fragment>
  );
}
