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

import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import moment from "moment";
import ShowDataGrid from "./ShowDataGrid";
export default function ManageEmployee({ data }) {
  const [open, setOpen] = React.useState(false);
  const [employeeInfo, setEmployeeInfo] = React.useState(data);
  const router = useRouter();
  //fees filtering function based on phone
  async function recordFilteringFun(employeeId) {
    if (employeeId == "") {
      setEmployeeInfo(data);
    } else {
      setEmployeeInfo(data.filter((item) => item.employeeId == employeeId));
    }
  }

  //record deleting function
  async function recordDeletingFun(id) {
    Swal.fire({
      title: "Are you sure?",
      text: `You want to delete this employee`,
      icon: "question",
      showCancelButton: true,
      cancelButtonColor: "red",
      confirmButtonText: "Yes",
      reverseButtons: true,
      allowOutsideClick: false,
    }).then(async (result) => {
      if (result.isConfirmed) {
        setOpen(true);
        const { data } = await axios.delete(`/api/employee/delete?id=${id}`);
        setOpen(false);
        if (data == "Employee deleted successfully") {
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
  }
  //create columns for data grid
  const columns = React.useMemo(
    () => [
      { field: "employeeName", headerName: "Employee Name", width: "200" },
      { field: "employeeId", headerName: "ID", width: "200" },
      { field: "employeeType", headerName: "Type", width: "200" },
      { field: "employeePhone", headerName: "Phone", width: "200" },
      { field: "salary", headerName: "Salary", width: "200" },
      {
        field: "createdAt",
        headerName: "Date",
        width: "200",
        renderCell: (params) => moment(params.row.createdAt).format("YY-MM-DD"),
      },
      {
        field: "id",
        headerName: "Action",
        width: "200",
        renderCell: (params) => {
          return (
            <ButtonGroup>
              <IconButton
                variant="contained"
                color="secondary"
                onClick={() =>
                  router.push(
                    `/dashboard/employee/update?id=${params.row.id}&employeeId=${params.row.employeeId}&employeeName=${params.row.employeeName}&employeeType=${params.row.employeeType}&employeePhone=${params.row.employeePhone}&salary=${params.row.salary}`
                  )
                }
              >
                <EditIcon />
              </IconButton>
              <IconButton
                variant="contained"
                color="error"
                onClick={() => recordDeletingFun(params.row.id)}
              >
                <DeleteIcon />
              </IconButton>
            </ButtonGroup>
          );
        },
      },
    ],
    [employeeInfo]
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
          onClick={() => router.push("/dashboard/employee/create")}
        >
          Add Employee
        </Button>
      </Stack>
      <ShowDataGrid rows={employeeInfo} columns={columns} />
      <Backdrop open={open}>
        <CircularProgress color="yallo" />
      </Backdrop>
    </React.Fragment>
  );
}
