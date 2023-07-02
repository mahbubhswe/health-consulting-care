import {
  Autocomplete,
  Backdrop,
  Button,
  CircularProgress,
  Divider,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Lottie from "lottie-web";
import React from "react";
import { useState } from "react";
import { useRouter } from "next/router";
import useLocalStorage from "@rehooks/local-storage";
import CreateFormButtonSpacer from "../CreateFormButtonSpacer";
import Swal from "sweetalert2";
import axios from "axios";
export default function Create({ data }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const [patientPhone, setPatientPhone] = useState();
  const [testName, setTestName] = useState();
  const [report, setReport] = useState();
  const [description, setDescription] = useState();
  const container = React.useRef(null);
  React.useEffect(() => {
    const instance = Lottie.loadAnimation({
      container: container.current,
      renderer: "svg",
      autoplay: true,
      autoplay: true,
      animationData: require("../../public/login.json"),
    });
    return () => instance.destroy();
  }, []);
  const [userInfo] = useLocalStorage("userInfo");

  //generate report
  const handelSubmit = async (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Are you sure?",
      text: "Want to generate this report",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        setOpen(true);
        const { data } = await axios.post(`/api/common/generateReport`, {
          patientPhone: patientPhone,
          testName: testName,
          report: report,
          description: description,
          reportedBy: userInfo ? userInfo.fullName : null,
        });
        setOpen(false);
        if (data == "Report generated successfully") {
          Swal.fire("Success", data, "success").then((result) => {
            if (result.isConfirmed) {
              router.reload(window.location.pathname);
            }
          });
        } else {
          Swal.fire("Error", data, "error");
        }
      }
    });
  };

  return (
    <>
      <Paper variant="none" sx={{ p: "30px", border: "2px dashed #ccc" }}>
        <Stack direction={"row"} justifyContent={"space-between"}>
          <p style={{ height: "200px" }} ref={container}></p>
          <div
            style={{
              display: "grid",
              placeContent: "center",
              textAlign: "right",
            }}
          >
            <Typography
              sx={{ fontWeight: 900, color: "grey", fontSize: "21px" }}
            >
              XYZ Health Consulting Care
            </Typography>
            <Typography>Your Health Solution</Typography>
            <Typography>23/3 Dhanmondi, Dhaka, Bangladesh</Typography>
            <Typography>xyzchh.help@gmail.com - www.hcc.com</Typography>
            <Typography>+8801623232323</Typography>
          </div>
        </Stack>
        <Divider sx={{ my: "10px" }} />
        <Typography
          align="center"
          sx={{ fontWeight: 900, color: "grey", fontSize: "30px" }}
        >
          Patient Report
        </Typography>
        <br />
        <Stack spacing={2} component={"form"} onSubmit={handelSubmit}>
          <Autocomplete
            options={data.map((option) => option.phone)}
            onChange={(event, newValue) => {
              setPatientPhone(newValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                size="small"
                required
                fullWidth
                color="secondary"
                label="Select Pateint"
              />
            )}
          />

          <Stack spacing={1} direction={{ xs: "column", sm: "row", md: "row" }}>
            <TextField
              size="small"
              required
              fullWidth
              color="secondary"
              label="Test Name"
              type="text"
              onChange={(e) => setTestName(e.target.value)}
            />

            <Autocomplete
              fullWidth
              options={["Positive", "Nagative"].map((option) => option)}
              onChange={(event, newValue) => {
                setReport(newValue);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  size="small"
                  required
                  fullWidth
                  color="secondary"
                  label="Select Result"
                />
              )}
            />
          </Stack>
          <TextField
            size="small"
            required
            fullWidth
            color="secondary"
            label="Report description"
            type="text"
            multiline
            minRows={5}
            onChange={(e) => setDescription(e.target.value)}
          />

          <CreateFormButtonSpacer>
            <Button
              type="button"
              variant="contained"
              color="error"
              size="small"
              onClick={() => router.push("/dashboard/doctor")}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="small"
            >
              Save
            </Button>
          </CreateFormButtonSpacer>
        </Stack>
      </Paper>{" "}
      <Backdrop open={open}>
        <CircularProgress color="secondary" />
      </Backdrop>
    </>
  );
}
