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
import { useLocalStorage } from "@rehooks/local-storage";
export default function UpdateNoticeForm({ data }) {
  const [open, setOpen] = useState(false);
  const [notice, setNotice] = useState({
    id: data.id,
    title: data.title,
    description: data.description,
  });
  const router = useRouter();
      const [userInfo] = useLocalStorage("userInfo");

  //get value from textfield and store to state
  const handelInput = (e) => {
    setNotice({ ...notice, [e.target.name]: e.target.value });
  };
  //update notice function
  const handelSubmit = async (e) => {
    e.preventDefault();
    e.target.reset();
    setOpen(true);
    const { data } = await axios.put(`/api/notice/update`, notice, {
      headers: {
        authorization: `Bearer ${userInfo.token}`,
      },
    });
    setOpen(false);
    if (data == "Notice has been updated successfully") {
      router.push("/dashboard/noticeboard");
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
          value={notice.title}
          label="Title"
          type="text"
          placeholder="Give a title"
          size="small"
          required
          fullWidth
          name="title"
          color="yallo"
          onChange={handelInput}
        />

        <TextField
          value={notice.description}
          label="Description"
          type="text"
          placeholder="Write description"
          size="small"
          required
          fullWidth
          name="description"
          multiline
          rows={5}
          color="yallo"
          onChange={handelInput}
        />
        <CreateFormButtonSpacer>
          <Button
            type="button"
            variant="contained"
            color="error"
            size="small"
            onClick={() => router.push("/dashboard/noticeboard")}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={notice.title ? (notice.description ? false : true) : true}
            variant="contained"
            color="yallo"
            size="small"
          >
            Update Notice
          </Button>
        </CreateFormButtonSpacer>
      </Stack>
      <Backdrop open={open}>
        <CircularProgress color="yallo" />
      </Backdrop>
    </React.Fragment>
  );
}
