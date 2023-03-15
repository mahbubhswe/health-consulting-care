import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import ButtonGroup from "@mui/material/ButtonGroup";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import LockResetIcon from "@mui/icons-material/LockReset";
import { useRouter } from "next/router";
import axios from "axios";
import Swal from "sweetalert2";
import moment from "moment";
import ShowDataGrid from "./ShowDataGrid";
import { Backdrop, CircularProgress } from "@mui/material";
export default function ManageStudent({ data }) {
  const [open, setOpen] = React.useState(false);
  const [teachers, setTeachers] = React.useState(data);
  const router = useRouter();
  //fees filtering function based on phone number
  async function recordFilteringFun(phone) {
    if (phone == "") {
      setTeachers(data);
    } else {
      setTeachers(data.filter((item) => item.phone == phone));
    }
  }

  //create columns for data grid
  const columns = React.useMemo(
    () => [
      { field: "name", headerName: "Teacher Name", width: "200" },
      { field: "teacherInitial", headerName: "Teacher Initial", width: "200" },
      {
        field: "education",
        headerName: "Educational Qualification ",
        width: "200",
      },
      { field: "designation", headerName: "Designation", width: "200" },
      { field: "groupName", headerName: "Group", width: "200" },
      { field: "phone", headerName: "Phone", width: "200" },
      { field: "email", headerName: "Email", width: "200" },
      { field: "address", headerName: "Address", width: "200" },
      {
        field: "joiningDate",
        headerName: "Joining Date",
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
                onClick={() => resetPassword(params.row.id)}
              >
                <LockResetIcon />
              </IconButton>
              <IconButton
                variant="contained"
                color="secondary"
                onClick={() =>
                  router.push(
                    `/dashboard/teacher/update?id=${params.row.id}&name=${params.row.name}&teacherInitial=${params.row.teacherInitial}&phone=${params.row.phone}&email=${params.row.email}&gender=${params.row.gender}&address=${params.row.address}&designation=${params.row.designation}&education=${params.row.education}&groupName=${params.row.groupName}`
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
    [teachers]
  );
  //record deleting function
  async function recordDeletingFun(id) {
    Swal.fire({
      title: "Are you sure?",
      text: `You want to delete this teacher`,
      icon: "question",
      showCancelButton: true,
      cancelButtonColor: "red",
      confirmButtonText: "Yes",
      reverseButtons: true,
      allowOutsideClick: false,
    }).then(async (result) => {
      if (result.isConfirmed) {
        setOpen(true);
        const { data } = await axios.delete(`/api/teacher/delete?id=${id}`);
        setOpen(false);
        if (data == "Teacher has been deleted successfully") {
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
  // reset password function
  function resetPassword(id) {
    Swal.fire({
      title: "Change Password",
      input: "password",
      inputAttributes: {
        autocapitalize: "off",
      },
      showCancelButton: true,
      confirmButtonText: "Change",
      showLoaderOnConfirm: true,
      reverseButtons: true,
      cancelButtonColor: "red",
      allowOutsideClick: false,
      preConfirm: async (password) => {
        const { data } = await axios.put(
          `/api/teacher/resetPassword?id=${id}&password=${password}`
        );
        if (data == "Password has been changed successfully") {
          Swal.fire("Success", data, "success");
        } else {
          Swal.showValidationMessage(`Request failed: ${data}`);
        }
      },
    });
  }
  return (
    <React.Fragment>
      <Stack direction={{ xs: "column", sm: "row", md: "row" }} spacing={1}>
        <TextField
          variant="outlined"
          type="search"
          size="small"
          fullWidth
          color="yallo"
          placeholder="Search by phone"
          onChange={(e) => recordFilteringFun(e.target.value)}
        />
        <Button
          sx={{ minWidth: "150px" }}
          size="small"
          variant="contained"
          color="yallo"
          onClick={() => router.push("/dashboard/teacher/create")}
        >
          Add Teacher
        </Button>
      </Stack>
      <ShowDataGrid rows={teachers} columns={columns} />
      <Backdrop open={open}>
        <CircularProgress color="yallo" />
      </Backdrop>
    </React.Fragment>
  );
}
