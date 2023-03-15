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
export default function ManageLatestNews({ data }) {
  const [open, setOpen] = React.useState(false);
  const [latestNews, setLatestNews] = React.useState(data);
  const router = useRouter();
  //fees filtering function based on class name
  async function recordFilteringFun(className) {
    if (className == "") {
      setLatestNews(data);
    } else {
      setLatestNews(data.filter((item) => item.className == className));
    }
  }

  //record deleting function
  async function recordDeletingFun(id) {
    Swal.fire({
      title: "Are you sure?",
      text: `You want to delete this news`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
      showLoaderOnConfirm: true,
      reverseButtons: true,
      allowOutsideClick: false,
    }).then(async (result) => {
      if (result.isConfirmed) {
        setOpen(true);
        const { data } = await axios.delete(`/api/latestNews/delete?id=${id}`);
        setOpen(false);
        if (data == "News deleted successfully") {
          Swal.fire({
            title: "Success",
            text: data,
            icon: "success",
          }).then((result) => {
            if (result.isConfirmed) {
              router.reload(window.location.pathname);
            }
          });
        } else {
          Swal.fire({
            title: "Oops...!",
            text: data,
            icon: "error",
          });
        }
      }
    });
  }
  //create columns for data grid
  const columns = React.useMemo(
    () => [
      { field: "title", headerName: "Title", width: "200" },
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
    [latestNews]
  );

  return (
    <React.Fragment>
      <Button
        sx={{ minWidth: "160px" }}
        size="small"
        variant="contained"
        color="yallo"
        onClick={() => router.push("/dashboard/latest-news/create")}
      >
        Create News
      </Button>

      <ShowDataGrid rows={latestNews} columns={columns} />
      <Backdrop open={open}>
        <CircularProgress color="yallo" />
      </Backdrop>
    </React.Fragment>
  );
}
