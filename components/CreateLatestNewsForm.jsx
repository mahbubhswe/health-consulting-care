import *as React from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import CreateFormButtonSpacer from "./CreateFormButtonSpacer";
import { useRouter } from "next/router";
import axios from "axios";
import Swal from "sweetalert2";
import { useLocalStorage } from "@rehooks/local-storage";
export default function CreateLatestNewsForm() {
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState();
  const router = useRouter();
      const [userInfo] = useLocalStorage("userInfo");

  //save notice function
  const handelSubmit = async (e) => {
    e.preventDefault();
    e.target.reset();
    setOpen(true);
    const { data } = await axios.post(
      `/api/latestNews/create`,
      { title },
      {
        headers: {
          authorization: `Bearer ${userInfo.token}`,
        },
      }
    );
    setOpen(false);
    if (data == "Latest news created successfully") {
      router.push("/dashboard/latest-news");
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
          label="News"
          type="text"
          placeholder="Write latest news..."
          size="small"
          required
          fullWidth
          multiline
          rows={4}
          color="yallo"
          onChange={(e) => setTitle(e.target.value)}
        />

        <CreateFormButtonSpacer>
          <Button
            type="button"
            variant="contained"
            color="error"
            size="small"
            onClick={() => router.push("/dashboard/latest-news")}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={title ? false : true}
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
