import * as React from "react";
import { useRouter } from "next/router";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import ShowDataGrid from "../ShowDataGrid";
import { ButtonGroup, IconButton, Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";
import axios from "axios";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";

export default function ManageAmbulanceBookin({ data }) {
  const [open, setOpen] = React.useState(false);
  const [dataRecord] = React.useState(data);
  const router = useRouter();
  //fees filtering function based on phone

  //create columns for data grid
  const columns = React.useMemo(
    () => [
      { field: "name", headerName: "Name", width: "200" },
      { field: "phone", headerName: "Phone", width: "200" },
      { field: "pickupPoint", headerName: "pickupPoint", width: "200" },
      { field: "destination", headerName: "Destination", width: "200" },
      { field: "date", headerName: "Date", width: "200" },
      { field: "time", headerName: "Time", width: "200" },
      {
        field: "ambulanceNumber",
        headerName: "Ambulance Number",
        width: "200",
      },
      { field: "status", headerName: "Status", width: "200" },
      { field: "createdAt", headerName: "Request Date", width: "200" },
      {
        field: "id",
        headerName: "Action",
        width: "200",
        renderCell: (params) => {
          return (
            <ButtonGroup>
              <Tooltip title={params.row.status}>
                <IconButton
                  disabled={params.row.status == "approved" ? true : false}
                  onClick={() => {
                    Swal.fire({
                      title: "Enter ambulance number if want to change.",
                      input: "number",
                      inputAttributes: {
                        autocapitalize: "off",
                      },
                      showCancelButton: true,
                      confirmButtonText: "Approve request",
                      showLoaderOnConfirm: true,
                      reverseButtons: true,
                      cancelButtonColor: "red",
                      allowOutsideClick: false,
                      preConfirm: async (ambulanceNumber) => {
                        const { data } = await axios.put(
                          `/api/admin/approveAmbulanceRequest?id=${params.row.id}&ambulanceNumber=${ambulanceNumber}`
                        );
                        if (data == "Request approved successfully!") {
                          Swal.fire("Success", data, "success").then(
                            (result) => {
                              if (result.isConfirmed) {
                                window.location.reload();
                              }
                            }
                          );
                        } else {
                          Swal.showValidationMessage(`Request failed: ${data}`);
                        }
                      },
                    });
                  }}
                >
                  <ChangeCircleIcon color="secondary" />
                </IconButton>
              </Tooltip>
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
    [dataRecord]
  );
  //record deleting function
  async function recordDeletingFun(id) {
    Swal.fire({
      title: "Are you sure?",
      text: `You want to delete this request`,
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
          `/api/common/deleteAmbulanceBookingRequest?id=${id}`
        );
        setOpen(false);
        if (data == "Request deleted successfully") {
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
      <ShowDataGrid rows={dataRecord} columns={columns} />
      <Backdrop open={open}>
        <CircularProgress color="secondary" />
      </Backdrop>
    </React.Fragment>
  );
}
