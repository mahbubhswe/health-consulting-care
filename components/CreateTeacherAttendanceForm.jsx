import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import cymd from "year-month-date";
import moment from "moment";
import {
  Autocomplete,
  Backdrop,
  Button,
  Checkbox,
  CircularProgress,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useRouter } from "next/router";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Swal from "sweetalert2";
import axios from "axios";
import { useLocalStorage } from "@rehooks/local-storage";
export default function CreateTeacherAttendanceForm({ data }) {
  const [open, setOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(cymd);
  const router = useRouter();
      const [userInfo] = useLocalStorage("userInfo");

  const attendance = [];
  //save attendance
  const saveAttendance = () => {
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
        data.forEach((value, index, arr) => {
          var isChecked = document.getElementById(value.teacherInitial).checked;
          attendance.push({
            name: value.name,
            teacherInitial: value.teacherInitial,
            status: isChecked ? "present" : "absent",
            createdAt: currentDate,
          });
        });
        const apiRes = await axios.post(
          `/api/attendance/teacher/create`,
          attendance,
          {
            headers: {
              authorization: `Bearer ${userInfo.token}`,
            },
          }
        );
        setOpen(false);
        if (apiRes.data == "Attendance saved successfully") {
          router.push("/dashboard/attendance/teacher");
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
    <Stack spacing={2}>
      <TextField
        label="Select Dete"
        type="date"
        size="small"
        required
        color="yallo"
        value={currentDate}
        onChange={(e) => setCurrentDate(e.target.value)}
      />

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
              <TableCell>Teacher Name</TableCell>
              <TableCell>Teacher Initial</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.teacherInitial}
                </TableCell>
                <TableCell>
                  <Checkbox id={row.teacherInitial} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Button
          type="button"
          variant="contained"
          color="error"
          size="small"
          onClick={() => router.push("/dashboard/attendance/teacher")}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={data.length < 0 ? true : false}
          onClick={() => saveAttendance()}
          variant="contained"
          color="yallo"
          size="small"
        >
          Save Attendance
        </Button>
      </div>
      <Typography align="right" color="error">
        {data.length < 0 ? "No teacher found to take attendance" : null}
      </Typography>
      <Backdrop open={open}>
        <CircularProgress />
      </Backdrop>
    </Stack>
  );
}
