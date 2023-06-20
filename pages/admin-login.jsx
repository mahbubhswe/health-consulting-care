import React from "react";
import AdminLogin from "../components/admin/AdminLogin";
import AuthLayout from "../components/AuthLayout";
import { Typography } from "@mui/material";
export default function Index() {
  return (
    <AuthLayout pageTitle={"Admin Login"}>
      <Typography align="center" component={"h1"} variant="bold">Admin Login</Typography>
      <br />
      <AdminLogin />
    </AuthLayout>
  );
}
