import React from "react";
import AuthLayout from "../../components/AuthLayout";
import Registration from "./../../components/patient/Registration";
export default function Index() {
  return (
    <AuthLayout pageTitle={"Registration"}>
      <Registration />
    </AuthLayout>
  );
}
