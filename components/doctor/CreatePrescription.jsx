import {
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
import React, { useMemo } from "react";
import { useState } from "react";
import { useRouter } from "next/router";
import useLocalStorage from "@rehooks/local-storage";
import CreateFormButtonSpacer from "../CreateFormButtonSpacer";
import Swal from "sweetalert2";
import axios from "axios";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";

const ymd = require("year-month-date");

export default function Create({ data }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const [name, setName] = useState();
  const [age, setAge] = useState();
  const [sex, setSex] = useState();
  const [date, setDate] = useState(ymd());
  const [description, setDescription] = useState();

  const container = React.useRef(null);
  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ font: [] }],
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          ["bold", "italic", "underline", "strike"],
          [{ color: [] }, { background: [] }],
          [{ script: "sub" }, { script: "super" }],
          ["blockquote", "code-block"],
          [{ list: "ordered" }, { list: "bullet" }],

          [{ indent: "-1" }, { indent: "+1" }, { align: [] }],
          [{ direction: "rtl" }],
          [{ size: ["small", false, "large", "huge"] }],
          
          ["clean"],
        ],

        history: {
          delay: 500,
          maxStack: 100,
          userOnly: true,
        },
      },
    }),
    []
  );
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
      text: "Want to create this presentation",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        setOpen(true);
        const { data } = await axios.post(`/api/doctor/create-prescription`, {
          name: name,
          age: age,
          sex: sex,
          date: date,
          description: description,
          reportedBy: userInfo ? userInfo.email : null,
        });
        setOpen(false);
        if (data == "Presentation created successfully") {
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
          <p style={{ height: "150px" }} ref={container}></p>
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
              {data.fullName}
            </Typography>
            <Typography>{data.departmentName}</Typography>
            <Typography>{data.phone}</Typography>
            <Typography>{data.email}</Typography>
            <br></br>
            <div
              style={{
                border: "1px solid #ccc",
                borderRadius: "4px",
                padding: "16px",
                textAlign: "left",
              }}
            >
              <Typography>Visiting Hour: {data.visitingHours}</Typography>{" "}
              <Typography>Room Number: {data.roomNumber}</Typography>{" "}
              <Typography style={{ color: "red" }}>Closs on Friday</Typography>{" "}
            </div>
          </div>
        </Stack>
        <Divider sx={{ my: "10px" }} />

        <br />
        <Stack spacing={2} component={"form"} onSubmit={handelSubmit}>
          <Stack spacing={1} direction={{ xs: "column", sm: "row", md: "row" }}>
            <TextField
              size="small"
              required
              fullWidth
              color="secondary"
              label="Name"
              type="text"
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              size="small"
              required
              fullWidth
              color="secondary"
              label="Age"
              type="number"
              onChange={(e) => setAge(e.target.value)}
            />{" "}
            <TextField
              size="small"
              required
              fullWidth
              color="secondary"
              label="Sex"
              type="text"
              onChange={(e) => setSex(e.target.value)}
            />{" "}
            <TextField
              size="small"
              required
              fullWidth
              color="secondary"
              label="Date"
              value={date}
              type="text"
              onChange={(e) => setDate(e.target.value)}
            />
          </Stack>{" "}
          <ReactQuill
            value={description}
            modules={modules}
            onChange={setDescription}
          />
          <br />
          <CreateFormButtonSpacer>
            <Button
              type="button"
              variant="contained"
              color="error"
              size="small"
              onClick={() => router.push("/dashboard/doctor/prescription/")}
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
          </CreateFormButtonSpacer>{" "}
        </Stack>
      </Paper>{" "}
      <Backdrop open={open}>
        <CircularProgress color="secondary" />
      </Backdrop>
    </>
  );
}
