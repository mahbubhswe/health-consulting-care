import React from "react";
import useSWR from "swr";
import ManageSubject from "../../../components/ManageSubject";
import Loading from "../../../components/Loading";
import Layout from "../../../components/Layout";
import axios from "axios";
const getSubject = (url) => axios.get(url).then((res) => res.data);
export default function Index() {
  const { data, error } = useSWR(`/api/subject/read`, getSubject);

  if (!data) {
    return (
      <Layout pageTitle="Loading...">
        <Loading />;
      </Layout>
    );
  }
  return (
    <Layout pageTitle="Manage Subject">
      <ManageSubject data={data} />
    </Layout>
  );
}
