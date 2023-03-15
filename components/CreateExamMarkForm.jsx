import * as React from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Autocomplete from "@mui/material/Autocomplete";
import Divider from "@mui/material//Divider";
import Paper from "@mui/material//Paper";
import Typography from "@mui/material//Typography";
import CreateFormButtonSpacer from "./CreateFormButtonSpacer";
import { useRouter } from "next/router";
import axios from "axios";
import Swal from "sweetalert2";
import { useLocalStorage } from "@rehooks/local-storage";
export default function AddStudentExamMarksForm({ data }) {
  const [open, setOpen] = React.useState(false);
  const [studentAndSubject, setStudentAndSubject] = React.useState();
  const [className, setClassName] = React.useState();
  const [studentInfo, setStudentInfo] = React.useState();
  const [selectedSubject, setSelectedSubject] = React.useState();
  const [idOfSelectedSubject, setIdOfSelectedSubject] = React.useState();
  const [marks, setMarks] = React.useState();
  const [outOfMarks, setOutOfMarks] = React.useState(100);
  const [wrongStudentMarksInput, setWrongStudentMarksInput] = React.useState();
  const router = useRouter();
  const [userInfo] = useLocalStorage("userInfo");

  //save student payment
  const addStudentMarks = async (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to save stuent marks",
      icon: "question",
      showCancelButton: true,
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        setOpen(true);
        const { data } = await axios.post(
          `/api/exam/addExamMarks`,
          {
            studentId: studentInfo.studentId,
            className: className,
            subjectId: idOfSelectedSubject,
            subjectName: selectedSubject,
            marks: marks,
            outOfMarks: outOfMarks,
          },
          {
            headers: {
              authorization: `Bearer ${userInfo.token}`,
            },
          }
        );
        setOpen(false);
        if (data == "Marks saved successfully") {
          Swal.fire("Success", data, "success");
        } else if (
          data == "Sorry, marks of this subject for this student already exists"
        ) {
          Swal.fire("Warning", data, "warning");
        } else {
          Swal.fire("Error", data, "error");
        }
      }
    });
  };

  const getStudentAndSubject = async (className) => {
    setClassName(className);
    const { data } = await axios.get(
      `/api/exam/getStudentAndSubject?className=${className}`,
      {
        headers: {
          authorization: `Bearer ${userInfo.token}`,
        },
      }
    );
    setStudentAndSubject(data);
  };

  const setStudentNameAndId = (newValue) => {
    if (newValue) {
      const studentInfo = studentAndSubject.student.filter(
        (item) => item.studentId == newValue
      );
      setStudentInfo(studentInfo[0]);
    } else {
      setStudentInfo();
    }
  };
  const studentMarksHandler = (e) => {
    const newValue = e.target.value;
    if (newValue < 0) {
      setWrongStudentMarksInput("Sorry, negative marks not allowed.");
    } else if (newValue > outOfMarks) {
      setWrongStudentMarksInput(
        `Marks should be less than or equal to ${outOfMarks}`
      );
    } else {
      setMarks(newValue);
      setWrongStudentMarksInput();
    }
  };
  return (
    <React.Fragment>
      <Stack spacing={1} component="form" onSubmit={addStudentMarks}>
        <Autocomplete
          size="small"
          fullWidth
          options={data.map((option) => option.className)}
          onChange={(event, newValue) => {
            getStudentAndSubject(newValue);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              required
              color="yallo"
              label="Select class"
              helperText={
                <Typography color="error">
                  {!data.length &&
                    "Sorry, there is no class. Without class can't add student mark."}
                </Typography>
              }
            />
          )}
        />
        <Autocomplete
          size="small"
          fullWidth
          options={
            studentAndSubject
              ? studentAndSubject.student.map((option) => option.studentId)
              : []
          }
          onChange={(event, newValue) => {
            setStudentNameAndId(newValue);
          }}
          renderInput={(params) => (
            <TextField {...params} required color="yallo" label="Student ID" />
          )}
        />
        <Autocomplete
          size="small"
          fullWidth
          options={
            studentAndSubject
              ? studentAndSubject.subject.map((option) => option.subjectName)
              : []
          }
          onChange={(event, newValue) => {
            const obj = studentAndSubject.subject.find(
              (item) => item.subjectName == newValue
            );
            setSelectedSubject(obj.subjectName);
            setIdOfSelectedSubject(obj.id);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              required
              color="yallo"
              label="Subject Name"
            />
          )}
        />
        <Paper
          sx={{ p: "15px", borderTop: "2px solid #F2D801" }}
          variant="outlined"
        >
          <Typography sx={{ color: "gray" }} fontWeight={700}>
            Student Information
          </Typography>
          <Divider />
          <Typography>Class: {className}</Typography>
          <Typography>Name: {studentInfo ? studentInfo.name : null}</Typography>
          <Typography>
            Student ID: {studentInfo ? studentInfo.studentId : null}
          </Typography>
          <Typography>Subject: {selectedSubject}</Typography>
          <Typography>Marks: {marks}</Typography>
          <Typography>Out of marks: {outOfMarks}</Typography>
        </Paper>
        <Stack
          spacing={1}
          direction={{ xs: "column", sm: "column", md: "row" }}
        >
          <TextField
            label="Marks"
            type="number"
            fullWidth
            required
            placeholder="Enter marks"
            size="small"
            color="yallo"
            onChange={studentMarksHandler}
            error={wrongStudentMarksInput ? true : false}
            helperText={wrongStudentMarksInput ? wrongStudentMarksInput : null}
          />
          <TextField
            value={outOfMarks}
            label="Out of Marks"
            type="number"
            fullWidth
            required
            placeholder="Enter out of marks"
            size="small"
            color="yallo"
            inputProps={{ readOnly: true }}
            onChange={(e) => setOutOfMarks(e.target.value)}
          />
        </Stack>

        <CreateFormButtonSpacer>
          <Button
            type="button"
            variant="contained"
            color="error"
            size="small"
            onClick={() => router.push("/teacher-portal/examination")}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={
              className
                ? selectedSubject
                  ? marks
                    ? null
                    : true
                  : true
                : true || wrongStudentMarksInput
                ? true
                : false
            }
            variant="contained"
            color="yallo"
            size="small"
          >
            Save Marks
          </Button>
        </CreateFormButtonSpacer>
        <Typography align="right" color="error">
          {className
            ? selectedSubject
              ? marks
                ? null
                : "Please input marks"
              : "Please select a subject"
            : "Please select a class"}
        </Typography>
      </Stack>
      <Backdrop open={open}>
        <CircularProgress color="yallo" />
      </Backdrop>
    </React.Fragment>
  );
}
