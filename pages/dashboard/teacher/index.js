import React from "react";
import useSWR from "swr";
import ManageTeacher from "../../../components/ManageTeacher";
import Loading from "../../../components/Loading";
import Layout from "../../../components/Layout";
import axios from "axios";
const getSubject = (url) => axios.get(url).then((res) => res.data);
export default function Index() {
  const { data, error } = useSWR(`/api/teacher/read`, getSubject);
  if (!data) {
    return (
      <Layout pageTitle="Loading...">
        <Loading />;
      </Layout>
    );
  }
  return (
    <Layout pageTitle="Manage Teacher">
      <ManageTeacher data={data} />
    </Layout>
  );
}
