import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { useRouter } from "next/router";
import axios from "axios";
import Swal from "sweetalert2";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import ShowDataGrid from "../ShowDataGrid";
import { ButtonGroup, Tooltip } from "@mui/material";
export default function ManageCabin({ data }) {
  const [open, setOpen] = React.useState(false);
  const [cabin, setCabin] = React.useState(data);
  const router = useRouter();
  //fees filtering function based on phone
  async function recordFilteringFun(roomNumber) {
    if (roomNumber == "") {
      setCabin(data);
    } else {
      setCabin(data.filter((item) => item.roomNumber == roomNumber));
    }
  }

  //record deleting function
  async function recordDeletingFun(id) {
    Swal.fire({
      title: "Are you sure?",
      text: `You want to delete this cabin`,
      icon: "question",
      showCancelButton: true,
      cancelButtonColor: "red",
      confirmButtonText: "Yes",
      reverseButtons: true,
      allowOutsideClick: false,
    }).then(async (result) => {
      if (result.isConfirmed) {
        setOpen(true);
        const { data } = await axios.delete(`/api/admin/deleteCabin?id=${id}`);
        setOpen(false);
        if (data == "Cabin deleted successfully") {
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
        field: "roomAndCabinNumber",
        headerName: "Room And Cabin Number",
        width: "200",
      },
      {
        field: "status",
        headerName: "Status",
        width: "200",
      },
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
                      title: "Do you want to change cabin status",
                      showCancelButton: true,
                      confirmButtonText: "Change",
                      showLoaderOnConfirm: true,
                      reverseButtons: true,
                      cancelButtonColor: "red",
                      allowOutsideClick: false,
                      preConfirm: async () => {
                        const { data } = await axios.put(
                          `/api/admin/changeCabinStatus?id=${params.row.id}&status=${params.row.status}`
                        );
                        if (data == "Request change successfully!") {
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
    [cabin]
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
          placeholder="Filter by roomNumber"
          onChange={(e) => recordFilteringFun(e.target.value)}
        />
        <Button
          sx={{ minWidth: "160px", color: "#ffffff" }}
          size="small"
          variant="contained"
          color="secondary"
          onClick={() => router.push("/dashboard/admin/cabin/create")}
        >
          Add Cabin
        </Button>
      </Stack>
      <ShowDataGrid rows={cabin} columns={columns} />
      <Backdrop open={open}>
        <CircularProgress color="secondary" />
      </Backdrop>
    </React.Fragment>
  );
}
