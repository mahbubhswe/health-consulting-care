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
export default function ManageTeacherAttendance({ data }) {
  const [open, setOpen] = React.useState(false);
  const [teacherAttendance, setTeacherAttendance] = React.useState(data);
  const router = useRouter();
  //fees filtering function
  async function recordFilteringFun(createdAt) {
    if (createdAt == "") {
      setTeacherAttendance(createdAt);
    } else {
      setTeacherAttendance(data.filter((item) => item.createdAt == createdAt));
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
          `/api/attendance/teacher/delete?id=${id}`
        );
        setOpen(false);
        if (data == "Teacher attendance has been deleted successfully") {
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
  // teacher attendance status update function
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
          `/api/attendance/teacher/changeAttendanceStatus?id=${id}&status=${status}`
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
      { field: "name", headerName: "Name", width: "200" },
      { field: "teacherInitial", headerName: "Teacher Initial", width: "200" },
      {
        field: "createdAt",
        headerName: "Date",
        width: "200",
      },
      { field: "status", headerName: "Status", width: "200" },
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
    [teacherAttendance]
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
          onClick={() => router.push("/dashboard/attendance/teacher/create")}
        >
          Take attendance
        </Button>
      </Stack>
      <ShowDataGrid rows={teacherAttendance} columns={columns} />
      <Backdrop open={open}>
        <CircularProgress color="yallo" />
      </Backdrop>
    </React.Fragment>
  );
}
