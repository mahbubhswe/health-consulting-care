import  { useRouter } from "next/router";
import React from "react";
import UpdateUserForm from "../../../components/UpdateUserForm";
import Layout from "../../../components/Layout";

export default function UpdateUser() {
  const router=useRouter()
  return (
    <Layout pageTitle="Update User Form">
      <UpdateUserForm data={router.query} />
    </Layout>
  );
}
