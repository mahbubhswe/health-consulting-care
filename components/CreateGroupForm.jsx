import * as React from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import CreateFormButtonSpacer from "./CreateFormButtonSpacer";
import FileBase64 from "react-file-base64";
import { useRouter } from "next/router";
import axios from "axios";
import Swal from "sweetalert2";
import { useLocalStorage } from "@rehooks/local-storage";
export default function CreateGroupForm() {
  const [open, setOpen] = React.useState(false);
  const [groupName, setGroupName] = React.useState();
  const [photo, setPhoto] = React.useState();
  const [wrongGroupNameInput, setWrongGroupNameInput] = React.useState();
    const [userInfo] = useLocalStorage("userInfo");

  const router = useRouter();
  //create subject group
  const handelSubmit = async (e) => {
    e.preventDefault();
    setOpen(true);
    const { data } = await axios.post(
      `/api/group/create`,
      {
        groupName,
        photo,
      },
      {
        headers: {
          authorization: `Bearer ${userInfo.token}`,
        },
      }
    );
    setOpen(false);
    if (data == "Group created successfully") {
      router.push("/dashboard/group");
      Swal.fire("Success", data, "success").then((result) => {
        if (result.isConfirmed) {
          router.reload(window.location.reload);
        }
      });
    } else if (data == "Sorry, this group already exists") {
      Swal.fire("Warning", data, "warning");
    } else {
      Swal.fire("Error", data, "error");
    }
  };

  return (
    <React.Fragment>
      <Stack spacing={2} component="form" onSubmit={handelSubmit}>
        <TextField
          label="Group Name"
          type="text"
          placeholder="Give a group name"
          size="small"
          required
          fullWidth
          name="name"
          color="yallo"
          error={wrongGroupNameInput && wrongGroupNameInput}
          helperText={wrongGroupNameInput && wrongGroupNameInput}
          onChange={(e) => {
            let newValue = e.target.value;
            if (newValue.match(/^(?! )[A-Za-z ]*(?<! )$/)) {
              if (newValue.length < 3) {
                setWrongGroupNameInput(
                  "Group name must be at least 3 characters"
                );
                setGroupName(newValue);
              } else {
                setWrongGroupNameInput();
                setGroupName(newValue);
              }
            } else {
              setWrongGroupNameInput(
                "Input allowed only alphabetic characters and space not allowed at the beginning and end of the string"
              );
            }
          }}
        />
        <Avatar alt="Check avater" src={photo} sx={{ width: 80, height: 80 }} />
        <Typography>Select photo</Typography>
        <FileBase64 onDone={(data) => setPhoto(data.base64)} />
        <CreateFormButtonSpacer>
          <Button
            type="button"
            variant="contained"
            color="error"
            size="small"
            onClick={() => router.push("/dashboard/group")}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="yallo"
            size="small"
            disabled={wrongGroupNameInput ? true : photo ? false : true}
          >
            Create New Group
          </Button>
        </CreateFormButtonSpacer>
      </Stack>
      <Backdrop open={open}>
        <CircularProgress color="yallo" />
      </Backdrop>
    </React.Fragment>
  );
}
