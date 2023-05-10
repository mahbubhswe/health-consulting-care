import * as React from "react";
import TextField from "@mui/material/TextField";
import ButtonGroup from "@mui/material/ButtonGroup";
import IconButton from "@mui/material/IconButton";
import PictureAsPdf from "@mui/icons-material/PictureAsPdf";
import DeleteIcon from "@mui/icons-material/Delete";
import { useRouter } from "next/router";
import axios from "axios";
import Swal from "sweetalert2";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import moment from "moment";
import ShowDataGrid from "../ShowDataGrid";
export default function ViewPatientDetails({ data }) {
  const [open, setOpen] = React.useState(false);
  const [record, setRecord] = React.useState(data);
  const router = useRouter();
  //fees filtering function based on phone
  async function recordFilteringFun(phone) {
    if (phone == "") {
      setRecord(data);
    } else {
      setRecord(data.filter((item) => item.phone == phone));
    }
  }

  //record deleting function
  async function recordDeletingFun(id) {
    Swal.fire({
      title: "Are you sure?",
      text: `You want to delete this pataint`,
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
          `/api/common/deletePatient?id=${id}`
        );
        setOpen(false);
        if (data == "Patient deleted successfully") {
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
  console.log(data);
  //create columns for data grid
  const columns = React.useMemo(
    () => [
      { field: "fullName", headerName: "Patient Name", width: "200" },
      { field: "phone", headerName: "Phone", width: "200" },
      { field: "address", headerName: "Address", width: "200" },
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
                  router.push(`/dashboard/view-report?id=${params.row.id}`)
                }
              >
                <PictureAsPdf />
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
    [record]
  );

  return (
    <React.Fragment>
      <TextField
        label="Filter..."
        variant="outlined"
        type="search"
        size="small"
        fullWidth
        color="secondary"
        placeholder="Filter by patient phone"
        onChange={(e) => recordFilteringFun(e.target.value)}
      />

      <ShowDataGrid rows={record} columns={columns} />
      <Backdrop open={open}>
        <CircularProgress color="secondary" />
      </Backdrop>
    </React.Fragment>
  );
}
