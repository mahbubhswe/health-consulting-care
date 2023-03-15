import { useRouter } from "next/router";
import React from "react";
import UpdateEmployeeForm from "../../../components/UpdateEmployeeForm";
import Layout from "../../../components/Layout";

export default function UpdateUser() {
  const router = useRouter();
  return (
    <Layout pageTitle="Update Employee">
      <UpdateEmployeeForm data={router.query} />
    </Layout>
  );
}
