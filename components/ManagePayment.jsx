import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import ButtonGroup from "@mui/material/ButtonGroup";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useRouter } from "next/router";
import axios from "axios";
import Swal from "sweetalert2";
import moment from "moment";

import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import ShowDataGrid from "./ShowDataGrid";
export default function ManageNoticeboard({ data }) {
  const [open, setOpen] = React.useState(false);

  const [payment, setPayment] = React.useState(data);
  const router = useRouter();
  //fees filtering function based on class name
  async function recordFilteringFun(id) {
    if (id == "") {
      setPayment(data);
    } else {
      setPayment(data.filter((item) => item.id == id));
    }
  }
  // update payment amount function
  function updateAmount(id) {
    Swal.fire({
      title: "Update Payment Amount",
      text: "If you want to reduce the existing amount use minus(-) sign",
      input: "number",
      showCancelButton: true,
      confirmButtonText: "Update",
      showLoaderOnConfirm: true,
      reverseButtons: true,
      cancelButtonColor: "red",
      allowOutsideClick: false,
      preConfirm: async (amount) => {
        const { data } = await axios.put(
          `/api/payment/update?id=${id}&amount=${amount}`
        );
        if (data == "Amount has been updated successfully for this payment") {
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
  //record deleting function
  async function recordDeletingFun(id) {
    Swal.fire({
      title: "Are you sure?",
      text: `You want to delete this student payment record`,
      icon: "question",
      showCancelButton: true,
      cancelButtonColor: "red",
      confirmButtonText: "Yes",
      reverseButtons: true,
      allowOutsideClick: false,
    }).then(async (result) => {
      if (result.isConfirmed) {
        setOpen(true);
        const { data } = await axios.delete(`/api/payment/delete?id=${id}`);
        setOpen(false);
        if (data == "Payment record has been deleted successfully") {
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
      { field: "className", headerName: "Class Name", width: "200" },
      { field: "studentName", headerName: "Student Name", width: "200" },
      { field: "studentId", headerName: "ID", width: "200" },
      { field: "amount", headerName: "Amount", width: "200" },
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
                onClick={() => updateAmount(params.row.id)}
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
    [payment]
  );

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
          onChange={(e) => searchNotebook(e.target.value)}
        />
        <Button
          sx={{ minWidth: "100px" }}
          size="small"
          variant="contained"
          color="yallo"
          onClick={() => router.push("/dashboard/payment/create")}
        >
          Payment
        </Button>
      </Stack>
      <ShowDataGrid rows={payment} columns={columns} />
      <Backdrop open={open}>
        <CircularProgress color="yallo" />
      </Backdrop>
    </React.Fragment>
  );
}
