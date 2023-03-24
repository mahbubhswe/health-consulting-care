import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { useRouter } from "next/router";
import axios from "axios";
import Swal from "sweetalert2";

import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import ShowDataGrid from "../ShowDataGrid";
export default function ManageAmbulance({ data }) {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  //record deleting function
  async function recordDeletingFun(id) {
    Swal.fire({
      title: "Are you sure?",
      text: `You want to delete this ambulance`,
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
          `/api/admin/deleteAmbulance?id=${id}`
        );
        setOpen(false);
        if (data == "Ambulance deleted successfully") {
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
      {
        field: "ambulanceNumber",
        headerName: "Ambulance Number",
        width: "200",
      },
      ,
      {
        field: "id",
        headerName: "Action",
        width: "200",
        renderCell: (params) => {
          return (
            <IconButton
              variant="contained"
              color="error"
              onClick={() => recordDeletingFun(params.row.id)}
            >
              <DeleteIcon />
            </IconButton>
          );
        },
      },
    ],
    [data]
  );

  return (
    <React.Fragment>
      <Button
        sx={{ minWidth: "160px", color: "#ffffff" }}
        size="small"
        variant="contained"
        color="secondary"
        onClick={() => router.push("/dashboard/admin/ambulance/create")}
      >
        Add Ambulance
      </Button>

      <ShowDataGrid rows={data} columns={columns} />
      <Backdrop open={open}>
        <CircularProgress color="secondary" />
      </Backdrop>
    </React.Fragment>
  );
}
