import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import ButtonGroup from "@mui/material/ButtonGroup";
import IconButton from "@mui/material/IconButton";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import LockResetIcon from "@mui/icons-material/LockReset";
import { useRouter } from "next/router";
import axios from "axios";
import Swal from "sweetalert2";
import moment from "moment";
import ShowDataGrid from "./ShowDataGrid";
export default function ManageUser({ data }) {
  const [open, setOpen] = React.useState(false);
  const [users, setUsers] = React.useState(data);
  const router = useRouter();
  //record filtering function
  async function recordFilteringFun(phone) {
    if (phone == "") {
      setUsers(data);
    } else {
      setUsers(data.filter((item) => item.phone == phone));
    }
  }
  //record deleting function
  async function recordDeletingFun(id) {
    Swal.fire({
      title: "Are you sure?",
      text: `You want to delete this user`,
      icon: "question",
      showCancelButton: true,
      cancelButtonColor: "red",
      confirmButtonText: "Yes",
      reverseButtons: true,
      allowOutsideClick: false,
    }).then(async (result) => {
      if (result.isConfirmed) {
        setOpen(true);
        const { data } = await axios.delete(`/api/user/delete?id=${id}`);
        setOpen(false);
        if (data == "User has been deleted successfully") {
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
      { field: "role", headerName: "Role", width: "200" },
      {
        field: "phone",
        headerName: "Phone",
        width: "200",
      },
      { field: "email", headerName: "Email", width: "200" },
      { field: "gender", headerName: "Gender", width: "200" },
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
                    `/dashboard/user/update?id=${params.row.id}&name=${params.row.name}&role=${params.row.role}&phone=${params.row.phone}&email=${params.row.email}&password=${params.row.password}&gender=${params.row.gender}`
                  )
                }
              >
                <EditIcon />
              </IconButton>
              <IconButton
                disabled={
                  params.row.role == "System Administrator" ? true : false
                }
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
    [users]
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
          `/api/user/resetPassword?id=${id}&password=${password}`
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
          placeholder="Search by phone number..."
          onChange={(e) => recordFilteringFun(e.target.value)}
        />
        <Button
          sx={{ minWidth: "150px" }}
          size="small"
          variant="contained"
          color="yallo"
          onClick={() => router.push("/dashboard/user/create")}
        >
          Add New User
        </Button>
      </Stack>
      <ShowDataGrid rows={users} columns={columns} />
      <Backdrop open={open}>
        <CircularProgress color="yallo" />
      </Backdrop>
    </React.Fragment>
  );
}
