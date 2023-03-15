import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Autocomplete from "@mui/material/Autocomplete";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import CreateFormButtonSpacer from "./CreateFormButtonSpacer";
import { useRouter } from "next/router";
import cymd from "year-month-date";
import useSWR from "swr";
import axios from "axios";
import Swal from "sweetalert2";
import { useLocalStorage } from "@rehooks/local-storage";
//get student and subject based on selected class
const getStudentAndSubject = (url) => axios.get(url).then((res) => res.data);
export default function CreateStudentAttendanceForm({ classList }) {
  const [open, setOpen] = React.useState(false);
  const [currentDate, setCurrentDate] = React.useState(cymd);
  const [selectedClass, setSelectedClass] = React.useState();
  const [idOfSelectedSubject, setIdOfSelectedSubject] = React.useState();
  const { data } = useSWR(
    `/api/attendance/student/getStudentAndSubject?className=${selectedClass}`,
    getStudentAndSubject
  );
  const [userInfo] = useLocalStorage("userInfo");

  const router = useRouter();
  const attendance = [];
  //save student attendance function
  const saveStudentAttendance = () => {
    Swal.fire({
      title: "Are you sure?",
      text: `You want to save today's attendance`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
      showLoaderOnConfirm: true,
      reverseButtons: true,
      allowOutsideClick: false,
    }).then(async (result) => {
      if (result.isConfirmed) {
        setOpen(true);
        data.student.forEach((value) => {
          var isChecked = document.getElementById(value.studentId).checked;
          attendance.push({
            stuentName: value.name,
            studentId: value.studentId,
            status: isChecked ? "present" : "absent",
            className: selectedClass,
            subjectId: idOfSelectedSubject,
            createdAt: currentDate,
          });
        });
        const apiRes = await axios.post(
          `/api/attendance/student/create`,
          attendance,
          {
            headers: {
              authorization: `Bearer ${userInfo.token}`,
            },
          }
        );
        setOpen(false);
        if (apiRes.data == "Attendance saved successfully") {
          router.push("/teacher-portal/attendance/student");
          Swal.fire({
            title: "Success",
            text: apiRes.data,
            icon: "success",
          }).then((result) => {
            if (result.isConfirmed) {
              router.reload(window.location.pathname);
            }
          });
        } else if (data == "Sorry, today's attendance already taken") {
          Swal.fire({
            title: "Warning",
            text: apiRes.data,
            icon: "warning",
          });
        } else {
          Swal.fire({
            title: "Oops...!",
            text: apiRes.data,
            icon: "error",
          });
        }
      }
    });
  };
  return (
    <React.Fragment>
      <Stack direction={{ xs: "column", sm: "row", md: "row" }} spacing={1}>
        <Autocomplete
          fullWidth
          options={classList.map((option) => option.className)}
          onChange={(event, newValue) => {
            setSelectedClass(newValue);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Select Class"
              size="small"
              required
              color="yallo"
              helperText={
                <Typography color="error">
                  {classList.length > 0
                    ? null
                    : "Sorry, you are not assigned to any class as a teacher"}
                </Typography>
              }
            />
          )}
        />
        <Autocomplete
          fullWidth
          options={data ? data.subject.map((option) => option.subjectName) : []}
          onChange={(event, newValue) => {
            const obj = data.subject.find(
              (item) => item.subjectName == newValue
            );
            setIdOfSelectedSubject(obj.id);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Select Subject"
              size="small"
              required
              color="yallo"
            />
          )}
        />
        <TextField
          label="Select Dete"
          type="date"
          size="small"
          fullWidth
          required
          color="yallo"
          value={currentDate}
          onChange={(e) => setCurrentDate(e.target.value)}
        />
      </Stack>
      <TableContainer
        sx={{
          border: "1px solid #ccc",
          borderRadius: "8px",
          my: "15px",
        }}
      >
        <Table sx={{ minWidth: 650 }} size="small" aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Stduent Name</TableCell>
              <TableCell>ID</TableCell>
              <TableCell>Attendance</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              ? data.student.map((row) => (
                  <TableRow key={row.studentId}>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.studentId}</TableCell>
                    <TableCell>
                      <Checkbox id={row.studentId} />
                    </TableCell>
                  </TableRow>
                ))
              : null}
          </TableBody>
        </Table>
      </TableContainer>
      <CreateFormButtonSpacer>
        <Button
          type="button"
          variant="contained"
          color="error"
          size="small"
          onClick={() => router.push("/teacher-portal/attendance/student")}
        >
          Cancel
        </Button>
        <Button
          disabled={selectedClass ? (idOfSelectedSubject ? false : true) : true}
          type="submit"
          onClick={() => saveStudentAttendance()}
          variant="contained"
          color="yallo"
          size="small"
        >
          Save Attendance
        </Button>
      </CreateFormButtonSpacer>
      <Typography align="right" color="error">
        {selectedClass
          ? idOfSelectedSubject
            ? null
            : "Please select a subject"
          : "Please select a class"}
      </Typography>
      <Backdrop open={open}>
        <CircularProgress color="yallo" />
      </Backdrop>
    </React.Fragment>
  );
}
