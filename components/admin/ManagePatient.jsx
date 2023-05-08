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

import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import moment from "moment";
import ShowDataGrid from "../ShowDataGrid";
export default function ManageDoctor({ data }) {
  const [open, setOpen] = React.useState(false);
  const [patient, setPatient] = React.useState(data);
  const router = useRouter();
  //fees filtering function based on phone
  async function recordFilteringFun(phone) {
    if (phone == "") {
      setPatient(data);
    } else {
      setPatient(data.filter((item) => item.phone == phone));
    }
  }

  //record deleting function
  async function recordDeletingFun(id) {
    Swal.fire({
      title: "Are you sure?",
      text: `You want to delete this employee`,
      icon: "question",
      showCancelButton: true,
      cancelButtonColor: "red",
      confirmButtonText: "Yes",
      reverseButtons: true,
      allowOutsideClick: false,
    }).then(async (result) => {
      if (result.isConfirmed) {
        setOpen(true);
        const { data } = await axios.delete(`/api/employee/delete?id=${id}`);
        setOpen(false);
        if (data == "Employee deleted successfully") {
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
      { field: "fullName", headerName: "Name", width: "200" },
      { field: "phone", headerName: "Phone", width: "200" },
      { field: "gender", headerName: "Gender", width: "200" },
      {
        field: "createdAt",
        headerName: "Date",
        width: "200",
        renderCell: (params) => moment(params.row.createdAt).format("YY-MM-DD"),
      },
    ],
    [patient]
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
          placeholder="Filter by phone number"
          onChange={(e) => recordFilteringFun(e.target.value)}
        />
      
      <ShowDataGrid rows={patient} columns={columns} />
      <Backdrop open={open}>
        <CircularProgress color="secondary" />
      </Backdrop>
    </React.Fragment>
  );
}
