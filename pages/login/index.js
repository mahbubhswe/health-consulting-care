import React from "react";
import Login from "./../../components/Login";
import AuthLayout from "./../../components/AuthLayout";
import { Typography } from "@mui/material";
export default function Index() {
  return (
    <AuthLayout pageTitle={"Login"}>
      <Typography align="center">Please, sign in to continue</Typography>
      <br />
      <Login />
    </AuthLayout>
  );
}
