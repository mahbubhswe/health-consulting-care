import { useRouter } from "next/router";
import React from "react";
import UpdateGroupForm from "../../../components/UpdateGroupForm";
import Layout from "../../../components/Layout";

export default function UpdateUser() {
  const router = useRouter();
  return (
    <Layout pageTitle="Update Group">
      <UpdateGroupForm data={router.query} />
    </Layout>
  );
}
