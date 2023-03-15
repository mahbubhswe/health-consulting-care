import * as React from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import CreateFormButtonSpacer from "./CreateFormButtonSpacer";
import { useRouter } from "next/router";
import axios from "axios";
import Swal from "sweetalert2";
import { useLocalStorage } from "@rehooks/local-storage";
export default function CreateClassForm() {
  const [open, setOpen] = React.useState(false);
  const [className, setClassName] = React.useState();
  const [classNameError, setClassNameError] = React.useState();
  const router = useRouter();
      const [userInfo] = useLocalStorage("userInfo");

  //create a new class function
  const createClass = async (e) => {
    e.preventDefault();
    setOpen(true);
    const { data } = await axios.post(
      `/api/class/create`,
      {
        className,
      },
      {
        headers: {
          authorization: `Bearer ${userInfo.token}`,
        },
      }
    );
    setOpen(false);
    if (data == "Class created successfully") {
      e.target.reset();
      router.push("/dashboard/class");
      Swal.fire("Success", data, "success").then((result) => {
        if (result.isConfirmed) {
          router.reload(window.location.reload);
        }
      });
    } else if (data == "Sorry, this class already exists") {
      Swal.fire("Warning", data, "warning");
    } else {
      Swal.fire("Error", data, "error");
    }
  };

  return (
    <React.Fragment>
      <Stack spacing={2} component="form" onSubmit={createClass}>
        <TextField
          label="Class Name"
          type="text"
          placeholder="Give a class name"
          size="small"
          required
          fullWidth
          color="yallo"
          error={classNameError && classNameError}
          helperText={classNameError && classNameError}
          onChange={(e) => {
            let newValue = e.target.value;
            if (newValue.match(/^(?! )[A-Za-z ]*(?<! )$/)) {
              if (newValue.length < 3) {
                setClassNameError("Class name must be at least 3 characters");
                setClassName(newValue);
              } else {
                setClassNameError();
                setClassName(newValue);
              }
            } else {
              setClassNameError(
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
            onClick={() => router.push("/dashboard/class")}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={classNameError ? true : false}
            variant="contained"
            color="yallo"
            size="small"
          >
            Create
          </Button>
        </CreateFormButtonSpacer>
        <Typography align="right" color="error">
          {classNameError ? "Please give a class name" : null}
        </Typography>
      </Stack>
      <Backdrop open={open}>
        <CircularProgress color="yallo" />
      </Backdrop>
    </React.Fragment>
  );
}
