import { useRouter } from "next/router";
import React from "react";
import UpdateNoticeForm from "../../../components/UpdateNoticeForm";
import Layout from "../../../components/Layout";

export default function UpdateUser() {
  const router = useRouter();
  return (
    <Layout pageTitle="Update Notice">
      <UpdateNoticeForm data={router.query} />
    </Layout>
  );
}
