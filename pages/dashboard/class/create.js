import React from "react";
import CreateClassForm from "../../../components/CreateClassForm";
import Layout from "../../../components/Layout";
export default function Index() {
  return (
    <Layout pageTitle="Create a New Class">
      <CreateClassForm />
    </Layout>
  );
}
