import React, { useState } from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useRouter } from "next/router";
import axios from "axios";
import Swal from "sweetalert2";
import CreateFormButtonSpacer from "./CreateFormButtonSpacer";
import Autocomplete from "@mui/material/Autocomplete";
import { Typography } from "@mui/material";
import { useLocalStorage } from "@rehooks/local-storage";
export default function CreateTeacherAssignForm({ data }) {
  const [open, setOpen] = useState(false);
  const [subject, setSubject] = useState([]);
  const [subjectId, setSubjectId] = useState();
  const [className, setClassName] = useState();
  const [teacherInitial, setTeacherInitial] = useState(data);
  const router = useRouter();
  const [userInfo] = useLocalStorage("userInfo");
  const handelSubmit = async (e) => {
    e.preventDefault();
    e.target.reset();
    setOpen(true);
    const { data } = await axios.post(
      `/api/teacherAssign/create`,
      {
        subjectId: subjectId,
        className: className,
        teacherInitial: teacherInitial,
      },
      {
        headers: {
          authorization: `Bearer ${userInfo.token}`,
        },
      }
    );
    setOpen(false);
    if (data == "Teacher assigned successfully") {
      router.push("/dashboard/teacher-assign");
      Swal.fire("Success", data, "success").then((result) => {
        router.reload(window.location.reload);
      });
    } else if (
      data ==
      "Sorry, this subject already assigned to this teacher in the same class"
    ) {
      Swal.fire("Warning", data, "warning");
    } else {
      Swal.fire("Error", data, "error");
    }
  };
  const getSubject = async (newValue) => {
    setSubject([]);
    if (newValue) {
      const { data } = await axios.get(
        `/api/subject/getSubjectByClass?className=${newValue}`
      );
      setSubject(data);
    }
  };
  return (
    <React.Fragment>
      <Stack spacing={2} component="form" onSubmit={handelSubmit}>
        <Autocomplete
          options={data.classList.map((option) => option.className)}
          onChange={(event, newValue) => {
            setClassName(newValue);
            getSubject(newValue);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Select a Class"
              size="small"
              required
              fullWidth
              color="yallo"
            />
          )}
        />
        <Autocomplete
          options={subject.map((option) => option.subjectName)}
          onChange={(event, newValue) => {
            const obj = subject.find((item) => item.subjectName == newValue);
            setSubjectId(obj.id);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Select Subject"
              size="small"
              required
              fullWidth
              color="yallo"
            />
          )}
        />
        <Autocomplete
          options={data.teacher.map((option) => option.teacherInitial)}
          onChange={(event, newValue) => {
            setTeacherInitial(newValue);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Select Teacher"
              size="small"
              required
              fullWidth
              color="yallo"
              helperText={
                <Typography color="error">
                  {!data.teacher &&
                    "Sorry, first you need to add teacher. Without teacher can't assign."}
                </Typography>
              }
            />
          )}
        />
        <CreateFormButtonSpacer>
          <Button
            type="button"
            variant="contained"
            color="error"
            size="small"
            onClick={() => router.push("/dashboard/teacher-assign")}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={
              className
                ? setSubjectId
                  ? teacherInitial
                    ? false
                    : true
                  : true
                : true
            }
            variant="contained"
            color="yallo"
            size="small"
          >
            Assign Teacher
          </Button>
        </CreateFormButtonSpacer>
        <Typography align="right" color="error">
          {className
            ? setSubjectId
              ? teacherInitial
                ? false
                : "Please select a teacher"
              : "Please select a subject"
            : "Please select a class"}
        </Typography>
      </Stack>
      <Backdrop open={open}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </React.Fragment>
  );
}
