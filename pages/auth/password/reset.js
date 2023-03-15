import React from "react";
import AuthLayout from "../../../components/AuthLayout";
import ResetPasswordForm from "../../../components/ResetPasswordForm";
export default function Index() {
  return (
    <AuthLayout pageTitle="Reset password">
      <ResetPasswordForm />
    </AuthLayout>
  );
}
