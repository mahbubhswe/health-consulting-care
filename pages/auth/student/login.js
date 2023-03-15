import React from "react";
import AuthLayout from "../../../components/AuthLayout";
import StudentLoginForm from "../../../components/StudentLoginForm";
export default function Index() {
  return (
    <AuthLayout pageTitle="Login">
      <StudentLoginForm />
    </AuthLayout>
  );
}
