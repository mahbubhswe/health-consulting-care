import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import ButtonGroup from "@mui/material/ButtonGroup";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { useRouter } from "next/router";
import axios from "axios";
import Swal from "sweetalert2";
import ShowDataGrid from "./ShowDataGrid";
import { Backdrop, CircularProgress } from "@mui/material";
import LockResetIcon from "@mui/icons-material/LockReset";
export default function ManageStudent({ data }) {
  const [open, setOpen] = React.useState(false);
  const [students, setStudents] = React.useState(data);
  const router = useRouter();
  //fees filtering function based on class name
  async function recordDeletingFun(studentId) {
    if (studentId == "") {
      setStudents(data);
    } else {
      setStudents(data.filter((item) => item.studentId == studentId));
    }
  }

  //record deleting function
  async function recordDeletingFun(id) {
    Swal.fire({
      title: "Are you sure?",
      text: `You want to delete this student`,
      icon: "question",
      showCancelButton: true,
      cancelButtonColor: "red",
      confirmButtonText: "Yes",
      reverseButtons: true,
      allowOutsideClick: false,
    }).then(async (result) => {
      if (result.isConfirmed) {
        setOpen(true);
        const { data } = await axios.delete(`/api/student/delete?id=${id}`);
        setOpen(false);
        if (data == "Student has been deleted successfully") {
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
      { field: "name", headerName: "Name", width: "200" },
      { field: "studentId", headerName: "Student ID", width: "200" },
      { field: "className", headerName: "Class Name", width: "200" },
      { field: "phone", headerName: "Phone", width: "200" },
      { field: "email", headerName: "Email", width: "200" },
      { field: "address", headerName: "Address", width: "200" },
      { field: "fatherName", headerName: "Father's Name", width: "200" },
      { field: "motherName", headerName: "Mother's Name", width: "200" },
      {
        field: "guardianContactNumber",
        headerName: "Guardian Number",
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
                  router.push(
                    `/dashboard/student/pdf-generator?id=${params.row.id}&className=${params.row.className}&name=${params.row.name}&studentId=${params.row.studentId}&rollNumber=${params.row.rollNumber}&phone=${params.row.phone}&email=${params.row.email}&gender=${params.row.gender}&dob=${params.row.dob}&address=${params.row.address}&fatherName=${params.row.fatherName}&motherName=${params.row.motherName}&guardianContactNumber=${params.row.guardianContactNumber}&createdAt=${params.row.createdAt}`
                  )
                }
              >
                <PictureAsPdfIcon />
              </IconButton>
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
                    `/dashboard/student/update?id=${params.row.id}&className=${params.row.className}&name=${params.row.name}&studentId=${params.row.studentId}&rollNumber=${params.row.rollNumber}&phone=${params.row.phone}&email=${params.row.email}&gender=${params.row.gender}&dob=${params.row.dob}&address=${params.row.address}&fatherName=${params.row.fatherName}&motherName=${params.row.motherName}&guardianContactNumber=${params.row.guardianContactNumber}`
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
    [students]
  );
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
          `/api/student/resetPassword?id=${id}&password=${password}`
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
          label="Search..."
          variant="outlined"
          type="search"
          size="small"
          fullWidth
          color="yallo"
          placeholder="Search by student id"
          onChange={(e) => studentFiltering(e.target.value)}
        />
        <Button
          sx={{ minWidth: "150px" }}
          size="small"
          variant="contained"
          color="yallo"
          onClick={() => router.push("/dashboard/student/create")}
        >
          New Addmission
        </Button>
        <Button
          sx={{ minWidth: "150px" }}
          size="small"
          variant="contained"
          color="yallo"
          onClick={() => router.push("/dashboard/student/register-new-class")}
        >
          New Class
        </Button>
      </Stack>
      <ShowDataGrid rows={students} columns={columns} />
      <Backdrop open={open}>
        <CircularProgress color="yallo" />
      </Backdrop>
    </React.Fragment>
  );
}
