import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import ButtonGroup from "@mui/material/ButtonGroup";
import IconButton from "@mui/material/IconButton";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import { useRouter } from "next/router";
import axios from "axios";
import Swal from "sweetalert2";
import moment from "moment";
import ShowDataGrid from "./ShowDataGrid";
import { Backdrop, CircularProgress } from "@mui/material";
export default function ManageStudentMark({ data }) {
  const [open, setOpen] = React.useState(false);
  const [studentExamInfo, setStudentExamInfo] = React.useState(data);
  const router = useRouter();
  //fees filtering function based on class name
  async function recordFilteringFun(className) {
    if (className == "") {
      setStudentExamInfo(data);
    } else {
      setStudentExamInfo(data.filter((item) => item.className == className));
    }
  }
  //record deleting function
  async function recordDeletingFun(id) {
    Swal.fire({
      title: "Are you sure?",
      text: `You want to delete this student marks for this class an subject`,
      icon: "question",
      showCancelButton: true,
      cancelButtonColor: "red",
      confirmButtonText: "Yes",
      reverseButtons: true,
      allowOutsideClick: false,
    }).then(async (result) => {
      if (result.isConfirmed) {
        setOpen(true);
        const { data } = await axios.delete(`/api/exam/delete?id=${id}`);
        setOpen(false);
        if (
          data == "Stuent marks for this class and subject deleted successfully"
        ) {
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
      { field: "studentId", headerName: "Student ID", width: "200" },
      { field: "subjectName", headerName: "Subject Name", width: "200" },
      { field: "marks", headerName: "Marks", width: "200" },
      { field: "outOfMarks", headerName: "Out of Marks", width: "200" },
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
                  changeStudentMarks(params.row.id, params.row.outOfMarks)
                }
              >
                <ChangeCircleIcon />
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
    [studentExamInfo]
  );
  //change student marks function
  function changeStudentMarks(id, outOfMarks) {
    Swal.fire({
      title: "Change Student Marks",
      input: "number",
      inputAttributes: {
        autocapitalize: "off",
      },
      showCancelButton: true,
      confirmButtonText: "Change",
      showLoaderOnConfirm: true,
      reverseButtons: true,
      cancelButtonColor: "red",
      allowOutsideClick: false,
      preConfirm: async (marks) => {
        const { data } = await axios.put(
          `/api/exam/changeMarks?id=${id}&marks=${marks}&outOfMarks=${outOfMarks}`
        );
        if (
          data ==
          "Student marks for this class and subject changed successfully"
        ) {
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
            router.push(
              "/teacher-portal/examination/add-student-marks"
            )
          }
        >
          Add Student Mark
        </Button>
      </Stack>
      <ShowDataGrid rows={studentExamInfo} columns={columns} />
      <Backdrop open={open}>
        <CircularProgress color="yallo" />
      </Backdrop>
    </React.Fragment>
  );
}
