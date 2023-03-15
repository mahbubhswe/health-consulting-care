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
import { Typography } from "@mui/material";
import { useLocalStorage } from "@rehooks/local-storage";
export default function CreateUtilityForm() {
  const [open, setOpen] = useState(false);
  const [costTitle, setCostTitle] = useState();
  const [amount, setAmount] = useState();
  const [amountInputError, setAmountInputError] = useState();
  const [titleInputError, setTitleInputError] = useState();
  const router = useRouter();
  const [userInfo] = useLocalStorage("userInfo");

  const handelSubmit = async (e) => {
    e.preventDefault();
    setOpen(true);
    const { data } = await axios.post(
      `/api/utilityCost/create`,
      {
        costTitle: costTitle,
        amount: amount,
      },
      {
        headers: {
          authorization: `Bearer ${userInfo.token}`,
        },
      }
    );
    setOpen(false);
    if (data == "Utility cost added successfully") {
      e.target.reset();
      router.push("/dashboard/utility-cost");
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
          label="Cost Title"
          type="text"
          placeholder="Cost title"
          size="small"
          required
          fullWidth
          color="yallo"
          error={titleInputError && titleInputError}
          helperText={titleInputError && titleInputError}
          onChange={(e) => {
            const newValue = e.target.value;
            if (newValue.match(/^[aA-zZ\s]+$/)) {
              setTitleInputError();
              setCostTitle(e.target.value);
            } else {
              setCostTitle();
              setTitleInputError("Title should be alphabetic characters");
            }
          }}
        />
        <TextField
          label="Amout"
          type="number"
          placeholder="Type amount"
          size="small"
          required
          fullWidth
          color="yallo"
          error={amountInputError && amountInputError}
          helperText={amountInputError && amountInputError}
          onChange={(e) => {
            const newValue = e.target.value;
            if (newValue < 1) {
              setAmount();
              setAmountInputError("Amuont can't be nagative number or zero");
            } else {
              setAmountInputError();
              setAmount(e.target.value);
            }
          }}
        />
        <CreateFormButtonSpacer>
          <Button
            type="button"
            variant="contained"
            color="error"
            size="small"
            onClick={() => router.push("/dashboard/utility-cost")}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={costTitle ? (amount ? false : true) : true}
            variant="contained"
            color="yallo"
            size="small"
          >
            Save Utility Cost
          </Button>
        </CreateFormButtonSpacer>
        <Typography align="right" color="error">
          {costTitle
            ? amount
              ? null
              : "Please input amount"
            : "Please give cost title"}
        </Typography>
      </Stack>
      <Backdrop open={open}>
        <CircularProgress color="yallo" />
      </Backdrop>
    </React.Fragment>
  );
}
