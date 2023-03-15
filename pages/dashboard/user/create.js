import React from "react";
import CreateUserForm from "../../../components/CreateUserForm";
import Layout from "../../../components/Layout";
export default function Index() {
  return (
    <Layout pageTitle="Add New User">
      <CreateUserForm />
    </Layout>
  );
}
