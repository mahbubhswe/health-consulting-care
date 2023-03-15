import { useRouter } from "next/router";
import React from "react";
import UpdateTeacherForm from "../../../components/UpdateTeacherForm";
import Layout from "../../../components/Layout";

export default function UpdateUser() {
  const router = useRouter();
  return (
    <Layout pageTitle="Update Teacher">
      <UpdateTeacherForm data={router.query} />
    </Layout>
  );
}
