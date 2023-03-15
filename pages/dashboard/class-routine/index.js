import React from "react";
import useSWR from "swr";
import ManageClassRoutine from "../../../components/ManageClassRoutine";
import Loading from "../../../components/Loading";
import Layout from "../../../components/Layout";
import axios from "axios";
const getRoutine = (url) => axios.get(url).then((res) => res.data);
export default function Index() {
  const { data } = useSWR(
    `/api/classRoutine/read`,
    getRoutine
  );
  if (!data) {
    return (
      <Layout pageTitle="Loading...">
        <Loading />;
      </Layout>
    );
  }
  return (
    <Layout pageTitle="Manage Student Marks">
      <ManageClassRoutine data={data} />
    </Layout>
  );
}
