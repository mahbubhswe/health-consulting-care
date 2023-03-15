import { useRouter } from "next/router";
import React from "react";
import DownloadPdf from "../../../../components/DownloadPdf";
import Layout from "../../../../components/Layout";

export default function UpdateUser() {
  const router = useRouter();
  return (
    <Layout pageTitle="Download Student Information">
      <DownloadPdf data={router.query} />
    </Layout>
  );
}
