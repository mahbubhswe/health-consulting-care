import React from "react";
import useSWR from "swr";
import CreateStudentForm from "../../../components/CreateStudentForm";
import Loading from "../../../components/Loading";
import Layout from "../../../components/Layout";
import axios from "axios";
const getStudentIdAndClassList = (url) =>
  axios.get(url).then((res) => res.data);
export default function Index() {
  const { data, error } = useSWR(
    `/api/student/getStudentIdAndClassList`,
    getStudentIdAndClassList
  );

  if (!data) {
    return (
      <Layout pageTitle="Loading...">
        <Loading />;
      </Layout>
    );
  }
  return (
    <Layout pageTitle="Student New Admission">
      <CreateStudentForm data={data} />
    </Layout>
  );
}
