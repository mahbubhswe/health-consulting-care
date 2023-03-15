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
import { useRouter } from "next/router";
import axios from "axios";
import Swal from "sweetalert2";
import moment from "moment";
import ShowDataGrid from "./ShowDataGrid";
export default function ManageClass({ data }) {
  const [open, setOpen] = React.useState(false);
  const [subject, setSubject] = React.useState(data);
  const router = useRouter();
  //fees filtering function based on class name
  async function recordDeletingFun(className) {
    if (subjectName == "") {
      setSubject(data);
    } else {
      setSubject(data.filter((item) => item.subjectName == subjectName));
    }
  }

  //record deleting function
  async function recordDeletingFun(id) {
    Swal.fire({
      title: "Are you sure?",
      text: `You want to delete this subject`,
      icon: "question",
      showCancelButton: true,
      cancelButtonColor: "red",
      confirmButtonText: "Yes",
      reverseButtons: true,
      allowOutsideClick: false,
    }).then(async (result) => {
      if (result.isConfirmed) {
        setOpen(true);
        const { data } = await axios.delete(`/api/subject/delete?id=${id}`);
        setOpen(false);
        if (data == "Subject has been deleted successfully") {
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

  // subject update function
  function updateSubject(id) {
    Swal.fire({
      title: "Update Subject Name",
      input: "text",
      inputAttributes: {
        autocapitalize: "off",
      },
      showCancelButton: true,
      confirmButtonText: "Change",
      showLoaderOnConfirm: true,
      reverseButtons: true,
      cancelButtonColor: "red",
      allowOutsideClick: false,
      preConfirm: async (subjectName) => {
        const { data } = await axios.put(
          `/api/subject/update?id=${id}&subjectName=${subjectName}`
        );
        if (data == "Subject name updated successfully") {
          Swal.fire("Success", data, "success").then((result) => {
            if (result.isConfirmed) {
              router.reload(window.location.reload);
            }
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
      { field: "subjectName", headerName: "Subject Name", width: "200" },
      { field: "className", headerName: "Class Name", width: "200" },
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
                onClick={() => updateSubject(params.row.id)}
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
    [subject]
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
          onClick={() => router.push("/dashboard/subject/create")}
        >
          Create Subject
        </Button>
      </Stack>
      <ShowDataGrid rows={subject} columns={columns} />
      <Backdrop open={open}>
        <CircularProgress color="yallo" />
      </Backdrop>
    </React.Fragment>
  );
}
