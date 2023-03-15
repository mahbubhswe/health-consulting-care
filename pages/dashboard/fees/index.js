import React from "react";
import useSWR from "swr";
import ManageFees from "../../../components/ManageFees";
import Loading from "../../../components/Loading";
import Layout from "../../../components/Layout";
import axios from "axios";
const getFees = (url) => axios.get(url).then((res) => res.data);
export default function Index() {
  const { data, error } = useSWR(`/api/fees/read`, getFees);

  if (!data) {
    return (
      <Layout pageTitle="Loading...">
        <Loading />;
      </Layout>
    );
  }
  return (
    <Layout pageTitle="Manage Fees">
      <ManageFees data={data} />
    </Layout>
  );
}
