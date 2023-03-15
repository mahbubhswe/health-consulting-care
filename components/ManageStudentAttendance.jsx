import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import ButtonGroup from "@mui/material/ButtonGroup";
import IconButton from "@mui/material/IconButton";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import { useRouter } from "next/router";
import axios from "axios";
import Swal from "sweetalert2";
import ShowDataGrid from "./ShowDataGrid";
import { Backdrop, CircularProgress } from "@mui/material";
export default function ManageStudentAttendance({ data }) {
  const [open, setOpen] = React.useState(false);
  const [studentAttendance, setStudentAttendance] = React.useState(data);
  const router = useRouter();
  //fees filtering function
  async function recordFilteringFun(createdAt) {
    if (createdAt == "") {
      setStudentAttendance(data);
    } else {
      setStudentAttendance(data.filter((item) => item.createdAt == createdAt));
    }
  }

  //record deleting function
  async function recordDeletingFun(id) {
    Swal.fire({
      title: "Are you sure?",
      text: `You want to delete this record`,
      icon: "question",
      showCancelButton: true,
      cancelButtonColor: "red",
      confirmButtonText: "Yes",
      reverseButtons: true,
      allowOutsideClick: false,
    }).then(async (result) => {
      if (result.isConfirmed) {
        setOpen(true);
        const { data } = await axios.delete(
          `/api/attendance/student/delete?id=${id}`
        );
        setOpen(false);
        if (data == "Student attendance has been deleted successfully") {
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
  // student attendance status update function
  function changeAttendanceStatus(id, status) {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to change attendance status",
      showCancelButton: true,
      confirmButtonText: "Yes",
      showLoaderOnConfirm: true,
      reverseButtons: true,
      cancelButtonColor: "red",
      allowOutsideClick: false,
      preConfirm: async () => {
        const { data } = await axios.put(
          `/api/attendance/student/changeAttendanceStatus?id=${id}&status=${status}`
        );
        if (data == "Attendance status has been updated successfully") {
          Swal.fire("Success", data, "success").then((result) => {
            router.reload(window.location.reload);
          });
        } else {
          Swal.showValidationMessage(`Request failed: ${data}`);
        }
      },
    });
  }
  //create columns for data grid
  const columns = React.useMemo(
    () => [
      { field: "stuentName", headerName: "Student Name", width: "200" },
      { field: "className", headerName: "Class Name", width: "200" },
      { field: "studentId", headerName: "Student ID", width: "200" },
      { field: "status", headerName: "Status", width: "200" },
      {
        field: "createdAt",
        headerName: "Date",
        width: "200",
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
                  changeAttendanceStatus(params.row.id, params.row.status)
                }
              >
                <ChangeCircleIcon />
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
    [studentAttendance]
  );

  return (
    <React.Fragment>
      <Stack direction={{ xs: "column", sm: "row", md: "row" }} spacing={1}>
        <TextField
          label="Search..."
          variant="outlined"
          type="search"
          size="small"
          fullWidth
          color="yallo"
          placeholder="Search by date"
          onChange={(e) => recordFilteringFun(e.target.value)}
        />
        <Button
          sx={{ minWidth: "180px" }}
          size="small"
          variant="contained"
          color="yallo"
          onClick={() =>
            router.push("/teacher-portal/attendance/student/create")
          }
        >
          Take Attendance
        </Button>
      </Stack>
      <ShowDataGrid rows={studentAttendance} columns={columns} />
      <Backdrop open={open}>
        <CircularProgress color="yallo" />
      </Backdrop>
    </React.Fragment>
  );
}
