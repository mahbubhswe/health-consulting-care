import * as React from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import FileBase64 from "react-file-base64";
import Typography from "@mui/material/Typography";
import CreateFormButtonSpacer from "./CreateFormButtonSpacer";
import { useRouter } from "next/router";
import axios from "axios";
import Swal from "sweetalert2";
import cymd from "year-month-date";
import { useLocalStorage } from "@rehooks/local-storage";
export default function CreateGroupForm() {
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState();
  const [photo, setPhoto] = React.useState();
  const [currentDate] = React.useState(cymd);
  const router = useRouter();
  const [userInfo] = useLocalStorage("userInfo");

  //crete a new events
  const handelSubmit = async (e) => {
    e.preventDefault();
    setOpen(true);
    const { data } = await axios.post(
      `/api/recentEvents/create`,
      {
        title: title,
        photo: photo,
        createdAt: currentDate,
      },
      {
        headers: {
          authorization: `Bearer ${userInfo.token}`,
        },
      }
    );
    setOpen(false);
    if (data == "Event added successfully") {
      e.target.reset();
      router.push("/dashboard/recent-events");
      Swal.fire("Success", data, "success").then((result) => {
        if (result.isConfirmed) {
          router.reload(window.location.reload);
        }
      });
    } else {
      Swal.fire("Error", data, "error");
    }
  };
  return (
    <React.Fragment>
      <Stack spacing={2} component="form" onSubmit={handelSubmit}>
        <TextField
          label="Event Title"
          type="text"
          placeholder="Give a title..."
          size="small"
          required
          fullWidth
          name="name"
          color="yallo"
          onChange={(e) => setTitle(e.target.value)}
        />

        <Typography>Select photo </Typography>
        <FileBase64 onDone={(data) => setPhoto(data.base64)} />
        <CreateFormButtonSpacer>
          <Button
            type="button"
            variant="contained"
            color="error"
            size="small"
            onClick={() => router.push("/dashboard/recent-events")}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={title ? (photo ? false : true) : false}
            variant="contained"
            color="yallo"
            size="small"
          >
            Create
          </Button>
        </CreateFormButtonSpacer>
      </Stack>
      <Backdrop open={open}>
        <CircularProgress color="yallo" />
      </Backdrop>
    </React.Fragment>
  );
}
