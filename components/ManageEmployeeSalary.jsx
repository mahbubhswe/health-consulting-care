import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import ButtonGroup from "@mui/material/ButtonGroup";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useRouter } from "next/router";
import axios from "axios";
import Swal from "sweetalert2";
import moment from "moment";
import ShowDataGrid from "./ShowDataGrid";
export default function ManageEmployeeSalary({ data }) {
  const [employeeSalary, setEmployeeSalary] = React.useState(data);
  const router = useRouter();
  //fees filtering function based on class name
  async function recordFilteringFun(employeeId) {
    if (employeeId == "") {
      setEmployeeSalary(data);
    } else {
      setEmployeeSalary(data.filter((item) => item.employeeId == employeeId));
    }
  }

  //create columns for data grid
  const columns = React.useMemo(
    () => [
      { field: "employeeId", headerName: "Employee Id", width: "200" },
      { field: "amount", headerName: "Amount", width: "200" },
      {
        field: "createdAt",
        headerName: "Month",
        width: "200",
      },
     
    ],
    [employeeSalary]
  );

  return (
    <React.Fragment>
      <Stack direction={{ xs: "column", sm: "row", md: "row" }} spacing={1}>
        <TextField
          label="Filter..."
          variant="outlined"
          type="search"
          size="small"
          fullWidth
          color="yallo"
          placeholder="Filter by employee id"
          onChange={(e) => recordFilteringFun(e.target.value)}
        />
        <Button
          sx={{ minWidth: "160px" }}
          size="small"
          variant="contained"
          color="yallo"
          onClick={() => router.push("/dashboard/employee-salary/create")}
        >
          Pay Salary
        </Button>
      </Stack>
      <ShowDataGrid rows={employeeSalary} columns={columns} />
    </React.Fragment>
  );
}
