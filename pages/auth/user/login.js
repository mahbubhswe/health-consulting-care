import React from "react";
import AuthLayout from "../../../components/AuthLayout";
import UserLoginForm from "../../../components/UserLoginForm";
export default function Index() {
  return (
    <AuthLayout pageTitle="Login">
      <UserLoginForm />
    </AuthLayout>
  );
}
