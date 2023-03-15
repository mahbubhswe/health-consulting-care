import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import ButtonGroup from "@mui/material/ButtonGroup";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { useRouter } from "next/router";
import axios from "axios";
import Swal from "sweetalert2";
import moment from "moment";
import ShowDataGrid from "./ShowDataGrid";
import { Backdrop, CircularProgress } from "@mui/material";

export default function ManageTeacherAssign({ data }) {
  const [open, setOpen] = React.useState(false);

  const [teacherAssign, setTeacherAssign] = React.useState(data);
  const router = useRouter();
  //fees filtering function based on class name
  async function recordDeletingFun(className) {
    if (subjectName == "") {
      setTeacherAssign(data);
    } else {
      setTeacherAssign(data.filter((item) => item.subjectName == subjectName));
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
          `/api/teacherAssign/delete?id=${id}`
        );
        setOpen(false);
        if (data == "Record has been deleted successfully") {
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
      { field: "className", headerName: "Class", width: "200" },
      { field: "subjectName", headerName: "Subject", width: "200" },
      {
        field: "teacherInitial",
        headerName: "Teacher's Initial",
        width: "200",
      },
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
    [teacherAssign]
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
          placeholder="Search by subject name"
          onChange={(e) => searchClass(e.target.value)}
        />
        <Button
          sx={{ minWidth: "180px" }}
          size="small"
          variant="contained"
          color="yallo"
          onClick={() => router.push("/dashboard/teacher-assign/create")}
        >
          Teacher Assign
        </Button>
      </Stack>
      <ShowDataGrid rows={teacherAssign} columns={columns} />
      <Backdrop open={open}>
        <CircularProgress color="yallo" />
      </Backdrop>
    </React.Fragment>
  );
}
