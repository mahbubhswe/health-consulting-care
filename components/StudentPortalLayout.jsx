import {
  AppBar,
  Container,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import { deleteFromStorage } from "@rehooks/local-storage";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
export default function StudentProfileLayout({
  pageTitle,
  name,
  studentId,
  children,
}) {
  const router = useRouter();
  return (
    <React.Fragment>
      <Head>
        <title>{pageTitle ? pageTitle : "Student Protal"}</title>
      </Head>
      <AppBar sx={{ background: "#1FB4B4" }}>
        <Toolbar>
          <Typography align="right" flexGrow={1}>
            <Link style={{ color: "#FFFFFF" }} href="/student-portal/profile">
              {name && name} (ID: {studentId && studentId})
            </Link>
          </Typography>
          <IconButton
            color="error"
            onClick={() => {
              deleteFromStorage("userInfo");
              Cookies.remove("token");
              router.replace("/auth/student/login");
            }}
          >
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Container sx={{ my: "100px" }}>{children}</Container>
    </React.Fragment>
  );
}
