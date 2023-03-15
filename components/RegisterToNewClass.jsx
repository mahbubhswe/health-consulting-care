import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Autocomplete from "@mui/material/Autocomplete";
import Typography from "@mui/material/Typography";
import CreateFormButtonSpacer from "./CreateFormButtonSpacer";
import { useRouter } from "next/router";
import axios from "axios";
import Swal from "sweetalert2";
import { DataGrid } from "@mui/x-data-grid";
import Stack from "@mui/material/Stack";
import { useLocalStorage } from "@rehooks/local-storage";
import { ClipLoader } from "react-spinners";
export default function RegisterToNewClass({ classList }) {
  const [open, setOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [studentList, setStudentList] = React.useState([]);
  const [className, setClassName] = React.useState();
  const [selectedClass, setSelectedClass] = React.useState();
  const [selectedStudent, setSelectedStudent] = React.useState([]);
  const [userInfo] = useLocalStorage("userInfo");
  const router = useRouter();
  //create columns for data grid
  const columns = React.useMemo(
    () => [
      { field: "studentId", headerName: "Student Id", width: "200" },
      { field: "name", headerName: "Name", width: "200" },
      {
        field: "dueAmount",
        headerName: "Due",
        width: "200",
      },
    ],
    [studentList]
  );
  const moveToNewClass = () => {
    if (selectedClass === className) {
      Swal.fire({
        title: "Warning",
        text: "You have selected same class",
        icon: "warning",
      });
    } else if (selectedStudent.length === 0) {
      Swal.fire({
        title: "Warning",
        text: "Please select student",
        icon: "warning",
      });
    } else {
      Swal.fire({
        title: "Are you sure?",
        text: "Want to update class",
        icon: "question",
        confirmButtonText: "Yes",
        showCancelButton: true,
        reverseButtons: true,
        cancelButtonColor: "red",
      }).then(async (result) => {
        if (result.isConfirmed) {
          setOpen(true);

          let apiRes = await axios.put(
            `/api/student/moveToNewClass`,
            {
              ids: selectedStudent.map((value) => value),
              className,
            },
            {
              headers: {
                authorization: `Bearer ${userInfo.token}`,
              },
            }
          );
          setOpen(false);
          if (apiRes.data === "Student's class updated successfully") {
            Swal.fire({
              title: "Success",
              icon: "success",
              text: apiRes.data,
            }).then((result) => {
              if (result.isConfirmed) {
                router.reload(window.location.reload);
              }
            });
          } else {
            Swal.fire({
              title: "Error",
              icon: "error",
              text: apiRes.data,
            }).then((result) => {
              if (result.isConfirmed) {
                router.reload(window.location.reload);
              }
            });
          }
        }
      });
    }
  };

  const getStudentByClass = async (newValue) => {
    setSelectedClass(newValue);
    setStudentList([]);
    if (newValue) {
      if (newValue == "completed") {
        Swal.fire({
          title: "Warning",
          icon: "warning",
          text: "Sorry, you have selected completed class. Student of this class passed from school.",
        });
      } else {
        setIsLoading(true);
        const { data } = await axios.get(
          `/api/class/getStudentByClassForNewRegister?className=${newValue}`
        );
        setIsLoading(false);
        setStudentList(data);
      }
    }
  };
  return (
    <React.Fragment>
      <Stack spacing={1} direction={{ xs: "column", sm: "row", md: "row" }}>
        <Autocomplete
          fullWidth
          options={classList.map((option) => option.className)}
          onChange={(event, newValue) => {
            getStudentByClass(newValue);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="From"
              size="small"
              required
              color="yallo"
              helperText={
                <Typography color="error">
                  {classList.length > 0
                    ? null
                    : "First you need to create a class"}
                </Typography>
              }
            />
          )}
        />
        <Autocomplete
          fullWidth
          options={classList.map((option) => option.className)}
          onChange={(event, newValue) => {
            setClassName(newValue);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="To"
              size="small"
              required
              color="yallo"
              helperText={
                <Typography color="error">
                  {classList.length > 0
                    ? null
                    : "First you need to create a class"}
                </Typography>
              }
            />
          )}
        />
      </Stack>
      <ClipLoader size={20} color={"green"} loading={isLoading} />
      <div style={{ height: 400, width: "100%", marginTop: "10px" }}>
        <DataGrid
          rows={studentList}
          columns={columns}
          autoPageSize={true}
          rowsPerPageOptions={[50]}
          getRowId={(row) => row.id}
          checkboxSelection
          isRowSelectable={(params) => params.row.dueAmount <= 0}
          onSelectionModelChange={setSelectedStudent}
        />
      </div>
      <br></br>
      <CreateFormButtonSpacer>
        <Button
          type="button"
          variant="contained"
          color="error"
          size="small"
          onClick={() => router.push("/dashboard/student")}
        >
          Cancel
        </Button>
        <Button
          disabled={selectedStudent ? (className ? false : true) : true}
          type="submit"
          variant="contained"
          color="yallo"
          size="small"
          onClick={moveToNewClass}
        >
          Register on new class
        </Button>
      </CreateFormButtonSpacer>
      <Backdrop open={open}>
        <CircularProgress />
      </Backdrop>
    </React.Fragment>
  );
}
