import * as React from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Autocomplete from "@mui/material/Autocomplete";
import Typography from "@mui/material/Typography";
import CreateFormButtonSpacer from "./CreateFormButtonSpacer";
import { useRouter } from "next/router";
import axios from "axios";
import Swal from "sweetalert2";
import { useLocalStorage } from "@rehooks/local-storage";
export default function CreateClassRoutineForm({ data }) {
  const [open, setOpen] = React.useState(false);
  const [className, setClassName] = React.useState();
  const router = useRouter();
  const [userInfo] = useLocalStorage("userInfo");
  //create class routine
  const handelSubmit = async (e) => {
    e.preventDefault();
    e.target.reset();
    setOpen(true);
    const { data } = await axios.post(
      `/api/classRoutine/create`,
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
    if (data == "Routine created successfully") {
      router.push("/dashboard/class-routine/");
      Swal.fire("Success", data, "success").then((result) => {
        if (result.isConfirmed) {
          router.reload(window.location.reload);
        }
      });
    } else if (data == "Sorry, This routine already exist") {
      Swal.fire("Warning", data, "warning");
    } else {
      Swal.fire("Error", data, "error");
    }
  };

  return (
    <React.Fragment>
      <Stack spacing={2} component="form" onSubmit={handelSubmit}>
        <Autocomplete
          options={data.map((option) => option.className)}
          onChange={(event, newValue) => {
            setClassName(newValue);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              size="small"
              required
              fullWidth
              color="yallo"
              label="Select Class"
              helperText={
                <Typography color="error">
                  {data.length == 0
                    ? "Sorry, first you need to create class. Without a class can't create class routine."
                    : null}
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
            onClick={() => router.push("/dashboard/class-routine")}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={className ? false : true}
            variant="contained"
            color="yallo"
            size="small"
          >
            Create
          </Button>
        </CreateFormButtonSpacer>
        <Typography align="right" color="error">
          {className ? null : "Please select a class"}
        </Typography>
      </Stack>
      <Backdrop open={open}>
        <CircularProgress color="yallo" />
      </Backdrop>
    </React.Fragment>
  );
}
