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
export default function ManageBloodDoner({ data }) {
  const [open, setOpen] = React.useState(false);
  const [bloodDoner, setBloodDoner] = React.useState(data);
  const router = useRouter();
  //fees filtering function based on phone
  async function recordFilteringFun(address) {
    if (address == "") {
      setBloodDoner(data);
    } else {
      setBloodDoner(data.filter((item) => item.address == address));
    }
  }

  //record deleting function
  async function recordDeletingFun(id) {
    Swal.fire({
      title: "Are you sure?",
      text: `You want to delete this blood doner`,
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
          `/api/admin/deleteBloodDoner?id=${id}`
        );
        setOpen(false);
        if (data == "Blood doner deleted successfully") {
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
      { field: "name", headerName: "Doner Name", width: "200" },
      { field: "bloodGroup", headerName: "Blood Group", width: "200" },
      { field: "phone", headerName: "Phone", width: "200" },
      { field: "gender", headerName: "Gender", width: "200" },

      { field: "address", headerName: "Address", width: "200" },
      {
        field: "lastDonationDate",
        headerName: "Last Donation Date",
        width: "200",
      },
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
    [bloodDoner]
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
          color="secondary"
          placeholder="Filter by address"
          onChange={(e) => recordFilteringFun(e.target.value)}
        />
        <Button
          sx={{ minWidth: "160px", color: "#ffffff" }}
          size="small"
          variant="contained"
          color="secondary"
          onClick={() => router.push("/dashboard/admin/blood-bank/create")}
        >
          Add Blood Doner
        </Button>
      </Stack>
      <ShowDataGrid rows={bloodDoner} columns={columns} />
      <Backdrop open={open}>
        <CircularProgress color="secondary" />
      </Backdrop>
    </React.Fragment>
  );
}
