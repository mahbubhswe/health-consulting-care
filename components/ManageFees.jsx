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
import ShowDataGrid from "./ShowDataGrid";

import { Backdrop, CircularProgress } from "@mui/material";
export default function ManageInstalment({ data }) {
  const [open, setOpen] = React.useState(false);
  const [fees, setFees] = React.useState(data);
  const router = useRouter();
  //fees filtering function based on class name
  async function recordFilteringFun(className) {
    if (className == "") {
      setFees(className);
    } else {
      setFees(data.filter((item) => item.className == className));
    }
  }
  //record deleting function
  async function recordDeletingFun(id) {
    Swal.fire({
      title: "Are you sure?",
      text: `You want to delete fess of this class`,
      icon: "question",
      showCancelButton: true,
      cancelButtonColor: "red",
      confirmButtonText: "Yes",
      reverseButtons: true,
      allowOutsideClick: false,
    }).then(async (result) => {
      if (result.isConfirmed) {
        setOpen(true);
        const { data } = await axios.delete(`/api/fees/delete?id=${id}`);
        setOpen(false);
        if (data == "Fees of this class deleted successfully") {
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
      { field: "admissionFee", headerName: "Admission Fee", width: "200" },
      { field: "tutionFee", headerName: "Tution Fee", width: "200" },
      {
        field: "campusDevelopmentFee",
        headerName: "Campus Development Fee",
        width: "200",
      },
      { field: "sessionFee", headerName: "Session Fee", width: "200" },
      { field: "examFee", headerName: "Exam Fee", width: "200" },
      { field: "othersFee", headerName: "Others Fee", width: "200" },
      { field: "totalAmount", headerName: "Total", width: "200" },
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
                onClick={() =>
                  router.push(
                    `/dashboard/fees/update?id=${params.row.id}&className=${params.row.className}&admissionFee=${params.row.admissionFee}&tutionFee=${params.row.tutionFee}&examFee=${params.row.examFee}&sessionFee=${params.row.sessionFee}&campusDevelopmentFee=${params.row.campusDevelopmentFee}&othersFee=${params.row.othersFee}`
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
    [fees]
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
          color="yallo"
          placeholder="Filter by class name"
          onChange={(e) => recordFilteringFun(e.target.value)}
        />
        <Button
          sx={{ minWidth: "100px" }}
          size="small"
          variant="contained"
          color="yallo"
          onClick={() => router.push("/dashboard/fees/create")}
        >
          Add Fees
        </Button>
      </Stack>
      <ShowDataGrid rows={fees} columns={columns} />
      <Backdrop open={open}>
        <CircularProgress color="yallo" />
      </Backdrop>
    </React.Fragment>
  );
}
