import React from "react";
import AuthLayout from "../../../components/AuthLayout";
import TeacherLoginForm from "../../../components/TeacherLoginForm";
export default function Index() {
  return (
    <AuthLayout pageTitle="Login">
      <TeacherLoginForm />
    </AuthLayout>
  );
}
