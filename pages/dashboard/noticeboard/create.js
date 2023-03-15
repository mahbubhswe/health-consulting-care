import React from "react";
import CreateNoticeForm from "../../../components/CreateNoticeForm";
import Layout from "../../../components/Layout";
export default function Index() {

  return (
    <Layout pageTitle="Create a New Notice">
      <CreateNoticeForm />
    </Layout>
  );
}
