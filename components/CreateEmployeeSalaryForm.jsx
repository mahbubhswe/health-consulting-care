import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Autocomplete from "@mui/material/Autocomplete";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import CreateFormButtonSpacer from "./CreateFormButtonSpacer";
import { useRouter } from "next/router";
import axios from "axios";
import Swal from "sweetalert2";
import { useLocalStorage } from "@rehooks/local-storage";
export default function CreateEmployeeSalaryForm({ data }) {
  const [open, setOpen] = React.useState(false);
  const [employeeInfo, setEmployeeInfo] = React.useState();
  const router = useRouter();
  const [userInfo] = useLocalStorage("userInfo");

  const monthYear = new Date().getFullYear() + "-" + new Date().getMonth() + 1;
  //pay employee monthly salary
  const complateSalary = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Want to complete this employee's salary of this month",
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
          `/api/employeeSalary/create`,
          {
            employeeId: employeeInfo.employeeId,
            amount: employeeInfo.salary,
            createdAt: monthYear,
          },
          {
            headers: {
              authorization: `Bearer ${userInfo.token}`,
            },
          }
        );
        setOpen(false);
        if (data == "Employee's salary information saved successfully") {
          Swal.fire("Success", data, "success").then((result) => {
            if (result.isConfirmed) {
              router.reload(window.location.pathname);
            }
          });
        } else if (data == "Employee's salary already exists for this month") {
          Swal.fire("Warning", data, "warning");
        } else {
          Swal.fire("Error", data, "error");
        }
      }
    });
  };
  //record filtering
  const filterEmployeeInfo = (employeeId) => {
    const rows = data.filter((item) => item.employeeId == employeeId);
    setEmployeeInfo(rows[0]);
  };
  return (
    <React.Fragment>
      <TextField
        size="small"
        required
        fullWidth
        value={monthYear}
        color="yallo"
        label="Month and Year"
      />
      <br></br>
      <br></br>

      <Autocomplete
        options={data.map((option) => option.employeeId)}
        onChange={(event, newValue) => {
          filterEmployeeInfo(newValue);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            size="small"
            required
            fullWidth
            color="yallo"
            label="Select employee id"
          />
        )}
      />
      <Paper variant="outlined" sx={{ p: "10px", my: "10px" }}>
        <Divider>Employee Information</Divider>
        <List>
          <ListItem disablePadding={true}>
            <ListItemText>
              ID: {employeeInfo ? employeeInfo.employeeId : null}
            </ListItemText>
          </ListItem>
          <ListItem disablePadding={true}>
            <ListItemText>
              Name: {employeeInfo ? employeeInfo.employeeName : null}
            </ListItemText>
          </ListItem>
          <ListItem disablePadding={true}>
            <ListItemText>
              Phone: {employeeInfo ? employeeInfo.employeePhone : null}
            </ListItemText>
          </ListItem>
          <ListItem disablePadding={true}>
            <ListItemText>
              Salaray: {employeeInfo ? employeeInfo.salary : null}
            </ListItemText>
          </ListItem>
        </List>
      </Paper>

      <CreateFormButtonSpacer>
        <Button
          type="button"
          variant="contained"
          color="error"
          size="small"
          onClick={() => router.push("/dashboard/employee-salary")}
        >
          Cancel
        </Button>
        <Button
          type="button"
          disabled={employeeInfo ? false : true}
          variant="contained"
          size="small"
          color="yallo"
          onClick={complateSalary}
        >
          Complete
        </Button>
      </CreateFormButtonSpacer>
      <Typography align="right" color="error">
        {employeeInfo ? null : "Please select a employee id"}
      </Typography>
      <Backdrop open={open}>
        <CircularProgress color="yallo" />
      </Backdrop>
    </React.Fragment>
  );
}
