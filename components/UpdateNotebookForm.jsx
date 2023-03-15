import {
  Button,
  Stack,
  TextField,
  Typography,
  Backdrop,
  CircularProgress,
  Paper,
} from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import Swal from "sweetalert2";
import { useLocalStorage } from "@rehooks/local-storage";
export default function CreateServicesForm({ data }) {
  const [open, setOpen] = useState(false);
  const [id, setId] = useState(data.id);
  const [title, setTitle] = useState(data.title);
  const [description, setDescription] = useState(data.description);
  const router = useRouter();
    const [userInfo] = useLocalStorage("userInfo");

  const handelSubmit = async (e) => {
    e.preventDefault();
    e.target.reset();
    setOpen(true);
    const apiRes = await axios.put(
      `/api/notebook/update`,
      {
        id: id,
        title: title,
        description: description,
      },
      {
        headers: {
          authorization: `Bearer ${userInfo.token}`,
        },
      }
    );
    setOpen(false);
    if (apiRes.data == "Note updated successfully") {
      Swal.fire("Success", apiRes.data, "success").then((result) => {
        if (result.isConfirmed) {
          router.reload();
        }
      });
    } else {
      Swal.fire("Failed to update", apiRes.data, "error");
    }
  };
  return (
    <Paper sx={{ p: "50px" }}>
   
      <Stack spacing={2} component="form" onSubmit={handelSubmit}>
        <Typography
          align="center"
          sx={{ color: "gray" }}
          variant="bold"
          component="h2"
        >
          Update your note
        </Typography>
        <TextField
          label="Title"
          type="text"
          placeholder="Give a name"
          size="small"
          required
          fullWidth
          value={title}
          color="secondary"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        ></TextField>

        <TextField
          label="Description"
          type="text"
          placeholder="Write description"
          size="small"
          required
          fullWidth
          value={description}
          color="secondary"
          multiline
          rows={4}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        ></TextField>

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            type="button"
            variant="contained"
            color="error"
            size="small"
            onClick={() => router.push("/dashboard/notebook")}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            size="small"
          >
            Update
          </Button>
        </div>
      </Stack>
      <Backdrop open={open}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </Paper>
  );
}
