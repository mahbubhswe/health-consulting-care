import React from "react";
import useSWR from "swr";
import ManageStudent from "../../../components/ManageStudent";
import Loading from "../../../components/Loading";
import Layout from "../../../components/Layout";
import axios from "axios";
const getStudent = (url) => axios.get(url).then((res) => res.data);
export default function Index() {
  const { data, error } = useSWR(`/api/student/read`, getStudent);
  if (!data) {
    return (
      <Layout pageTitle="Loading...">
        <Loading />;
      </Layout>
    );
  }
  return (
    <Layout pageTitle="Manage Student">
      <ManageStudent data={data} />
    </Layout>
  );
}
