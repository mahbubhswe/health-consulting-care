import { useRouter } from "next/router";
import React from "react";
import UpdateFeesForm from "../../../components/UpdateFeesForm";
import Layout from "../../../components/Layout";

export default function UpdateUser() {
  const router = useRouter();
  return (
    <Layout pageTitle="Update Fees">
      <UpdateFeesForm data={router.query} />
    </Layout>
  );
}
