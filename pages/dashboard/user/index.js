import React from "react";
import useSWR from "swr";
import ManageUser from "../../../components/ManageUser";
import Loading from "../../../components/Loading";
import Layout from "../../../components/Layout";
import axios from "axios";
const getUser = (url) => axios.get(url).then((res) => res.data);
export default function Index() {
  const { data, error } = useSWR(`/api/user/read`, getUser);
  if (!data) {
    return (
      <Layout pageTitle="Loading...">
        <Loading />;
      </Layout>
    );
  }
  return (
    <Layout pageTitle="Manage User">
      <ManageUser data={data} />
    </Layout>
  );
}
