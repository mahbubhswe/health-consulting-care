import {
  Backdrop,
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Cookies from "js-cookie";
import React, { useState } from "react";
import Phone from "@mui/icons-material/Phone";
import axios from "axios";
import { writeStorage } from "@rehooks/local-storage";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Link from "next/link";
export default function AdminLogin() {
  const [open, setOpen] = useState(false);

  const [showHidePassword, setShowHidePassword] = React.useState(false);
  const [loginCredentials, setLoginCredential] = useState({
    phone: "",
    password: "",
  });
  const router = useRouter();
  //user login
  const hubmitHandler = async (e) => {
    e.preventDefault();
    setOpen(true);
    const { data } = await axios.post(
      `/api/auth/login/patient?phone=${loginCredentials.phone}&password=${loginCredentials.password}`
    );
    setOpen(false);
    if (loginCredentials.phone == data.phone) {
      e.target.reset();
      writeStorage("userInfo", data);
      Cookies.set("token", data.token);
      router.replace("/dashboard/patient");
    } else {
      Swal.fire("Failed to login", data, "error");
    }
  };

  return (
    <Stack spacing={1} component="form" onSubmit={hubmitHandler}>
      <TextField
        className="styleTextField"
        size="large"
        variant="standard"
        type="tel"
        placeholder="Enter phone"
        required
        InputProps={{
          endAdornment: <Phone />,
          disableUnderline: true,
        }}
        onChange={(e) =>
          setLoginCredential({
            ...loginCredentials,
            phone: e.target.value,
          })
        }
      />
      <TextField
        className="styleTextField"
        size="large"
        variant="standard"
        type={showHidePassword ? "text" : "password"}
        placeholder="Password"
        required
        InputProps={{
          disableUnderline: true,
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={(e) => setShowHidePassword(!showHidePassword)}
              >
                {showHidePassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
              </IconButton>
            </InputAdornment>
          ),
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
      <br />
      <Typography align="right">
        <Link
          href={"/registration"}
        >{`Don't have an account? Create now`}</Link>
      </Typography>
      <Backdrop open={open}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </Stack>
  );
}
