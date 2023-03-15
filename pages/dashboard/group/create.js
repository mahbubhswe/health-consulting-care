import React from "react";
import CreateGroupForm from "../../../components/CreateGroupForm";
import Layout from "../../../components/Layout";
export default function Index() {
  return (
    <Layout pageTitle="Create a New Group">
      <CreateGroupForm />
    </Layout>
  );
}
