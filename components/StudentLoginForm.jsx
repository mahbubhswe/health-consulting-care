import {
  Backdrop,
  Button,
  CircularProgress,
  Divider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Cookies from "js-cookie";
import React, { useState } from "react";
import EmailIcon from "@mui/icons-material/Email";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import axios from "axios";
import Image from "next/image";
import { writeStorage } from "@rehooks/local-storage";
import Swal from "sweetalert2";
import { useRouter } from "next/router";

export default function Login() {
  const [open, setOpen] = useState(false);
  const [loginCredentials, setLoginCredential] = useState({
    studentId: "",
    password: "",
  });
  const router = useRouter();
  //login
  const hubmitHandler = async (e) => {
    e.preventDefault();
    setOpen(true);
    const { data } = await axios.post(
      `/api/auth/student/login?studentId=${loginCredentials.studentId}&password=${loginCredentials.password}`
    );
    setOpen(false);
    if (loginCredentials.studentId == data.studentId) {
      e.target.reset();
      writeStorage("userInfo", data);
      Cookies.set("token", data.token);
      router.replace("/student-portal");
    } else {
      Swal.fire("Failed to login", data, "error");
    }
  };

  return (
    <Stack spacing={1} component="form" onSubmit={hubmitHandler}>
      <Typography align="center">
        <Image
          src="/studentLogin.png"
          height={150}
          width={150}
          quality={100}
          alt="login"
        />
      </Typography>
      <Typography
        align="center"
        variant="bold"
        component="h1"
        sx={{ fontSize: "25px", fontWeight: 900 }}
      >
        School Name
      </Typography>
      <Typography
        align="center"
        variant="bold"
        component="h3"
        sx={{ color: "gray" }}
      >
        Welcome to Student Portal
      </Typography>
      <Divider>Please, sign in to continue</Divider>
      <TextField
        className="styleTextField"
        size="large"
        variant="standard"
        type="text"
        placeholder="Student id"
        required
        InputProps={{
          endAdornment: <EmailIcon />,
          disableUnderline: true,
        }}
        onChange={(e) =>
          setLoginCredential({
            ...loginCredentials,
            studentId: e.target.value,
          })
        }
      />
      <TextField
        className="styleTextField"
        size="large"
        variant="standard"
        type="password"
        placeholder="Password"
        required
        InputProps={{
          endAdornment: <VisibilityOffIcon />,
          disableUnderline: true,
        }}
        onChange={(e) =>
          setLoginCredential({
            ...loginCredentials,
            password: e.target.value,
          })
        }
      />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button
          size="medium"
          variant="contained"
          sx={{
            width: "120px",
            backgroundColor: "#47A7FF",
            color: "#FFFFFF",
          }}
          type="submit"
        >
          Sign In
        </Button>
      </div>

      <Backdrop open={open}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </Stack>
  );
}
