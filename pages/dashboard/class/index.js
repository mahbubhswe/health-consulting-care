import React from "react";
import useSWR from "swr";
import ManageClass from "../../../components/ManageClass";
import Loading from "../../../components/Loading";
import Layout from "../../../components/Layout";
import axios from "axios";
const getClass = (url) => axios.get(url).then((res) => res.data);
export default function Index() {
  const { data, error } = useSWR(`/api/class/read`, getClass);

  if (!data) {
    return (
      <Layout pageTitle="Loading...">
        <Loading />;
      </Layout>
    );
  }
  return (
    <Layout pageTitle="Manage Class">
      <ManageClass data={data} />
    </Layout>
  );
}
