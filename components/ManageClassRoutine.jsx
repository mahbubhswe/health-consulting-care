import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import ButtonGroup from "@mui/material/ButtonGroup";
import IconButton from "@mui/material/IconButton";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import DeleteIcon from "@mui/icons-material/Delete";
import { useRouter } from "next/router";
import axios from "axios";
import Swal from "sweetalert2";
import moment from "moment";
import ShowDataGrid from "./ShowDataGrid";
export default function ManageClassRoutine({ data }) {
    const [open, setOpen] = React.useState(false);

  const [classRoutine, setClassRoutine] = React.useState(data);
  const router = useRouter();
  //fees filtering function based on class name
  async function recordFilteringFun(className) {
    if (className == "") {
      setClassRoutine(data);
    } else {
      setClassRoutine(data.filter((item) => item.className == className));
    }
  }

  //create columns for data grid
  const columns = React.useMemo(
    () => [
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
    [classRoutine]
  );
  //record deleting function
  async function recordDeletingFun(id) {
    Swal.fire({
      title: "Are you sure?",
      text: `You want to delete this class routine`,
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
          `/api/classRoutine/delete?id=${id}`
        );
        setOpen(false);
        if (data == "Class routine deleted successfully") {
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
          placeholder="Filter by class name"
          onChange={(e) => recordFilteringFun(e.target.value)}
        />
        <Button
          sx={{ minWidth: "160px" }}
          size="small"
          variant="contained"
          color="yallo"
          onClick={() =>
            router.push("/dashboard/class-routine/add-day-subject-time")
          }
        >
          Add Subject Time
        </Button>
        <Button
          sx={{ minWidth: "160px" }}
          size="small"
          variant="contained"
          color="yallo"
          onClick={() => router.push("/dashboard/class-routine/create")}
        >
          Create Routine
        </Button>
      </Stack>
      <ShowDataGrid rows={classRoutine} columns={columns} />
      <Backdrop open={open}>
        <CircularProgress color="yallo" />
      </Backdrop>
    </React.Fragment>
  );
}
