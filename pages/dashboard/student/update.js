import { useRouter } from "next/router";
import React from "react";
import UpdateStudentForm from "../../../components/UpdateStudentForm";
import Layout from "../../../components/Layout";

export default function UpdateUser() {
  const router = useRouter();
  return (
    <Layout pageTitle="Update Student">
      <UpdateStudentForm data={router.query} />
    </Layout>
  );
}
