import React, { useState } from "react";
import Button from "@mui/material/Button";
import Autocomplete from "@mui/material/Autocomplete";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useRouter } from "next/router";
import axios from "axios";
import Swal from "sweetalert2";
import CreateFormButtonSpacer from "./CreateFormButtonSpacer";
import { Typography } from "@mui/material";
import { useLocalStorage } from "@rehooks/local-storage";
export default function CreateSubjectForm({ data }) {
  const [open, setOpen] = useState(false);
  const [subjectCode, setSubjectCode] = useState();
  const [subjectName, setSubjectName] = useState();
  const [subjectNameError, setSubjectNameError] = useState();
  const [className, setClassName] = useState();
  const [classList] = useState(data);
  const router = useRouter();
      const [userInfo] = useLocalStorage("userInfo");

  const handelSubmit = async (e) => {
    e.preventDefault();
    e.target.reset();
    setOpen(true);
    const { data } = await axios.post(
      `/api/subject/create`,
      {
        subjectCode: subjectCode,
        subjectName: subjectName,
        className: className,
      },
      {
        headers: {
          authorization: `Bearer ${userInfo.token}`,
        },
      }
    );
    setOpen(false);
    if (data == "Subject created successfully") {
      router.push("/dashboard/subject")
      Swal.fire("Success", data, "success").then(result => {
        if (result.isConfirmed) {
          router.reload(window.location.reload)
        }
      })
    } else if (data == "Sorry, this subject already exists") {
      Swal.fire("Warning", data, "warning");
    } else {
      Swal.fire("Error", data, "error");
    }
  };

  return (
    <React.Fragment>
      <Stack spacing={2} component="form" onSubmit={handelSubmit}>
        <Autocomplete
          options={classList.map((option) => option.className)}
          onChange={(event, newValue) => {
            setClassName(newValue);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Select Class"
              size="small"
              required
              fullWidth
              color="yallo"
              helperText={
                <Typography color="error">
                  {classList.length > 0
                    ? null
                    : "Sorry, first you need to create a class. Without a class can't add subject."}
                </Typography>
              }
            />
          )}
        />
        <TextField
          label="Subject Name"
          type="text"
          placeholder="Give a subject name"
          size="small"
          required
          fullWidth
          color="yallo"
          error={subjectNameError && subjectNameError}
          helperText={subjectNameError && subjectNameError}
          onChange={(e) => {
            let newValue = e.target.value;
            if (newValue.match(/^(?! )[A-Za-z ]*(?<! )$/)) {
              if (newValue.length < 3) {
                setSubjectNameError(
                  "Subject name must be at least 3 characters"
                );
                setSubjectName(newValue);
              } else {
                setSubjectNameError();
                setSubjectName(newValue);
              }
            } else {
              setSubjectNameError(
                "Input allowed only alphabetic characters and space not allowed at the beginning and end of the string"
              );
            }
          }}
        />

        <CreateFormButtonSpacer>
          <Button
            type="button"
            variant="contained"
            color="error"
            size="small"
            onClick={() => router.push("/dashboard/subject")}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="yallo"
            size="small"
            disabled={className ? (subjectNameError ? true : false) : true}
          >
            Create
          </Button>
        </CreateFormButtonSpacer>
        <Typography align="right" color="error">
          {className
            ? subjectNameError
              ? "Please give a subject name"
              : null
            : "Please select a class"}
        </Typography>
      </Stack>
      <Backdrop open={open}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </React.Fragment>
  );
}
