import React from "react";
import useSWR from "swr";
import CheckStudentPayment from "../../../components/CheckStudentPayment";
import Loading from "../../../components/Loading";
import Layout from "../../../components/Layout";
import axios from "axios";
const getStudentId = (url) => axios.get(url).then((res) => res.data);
export default function Index() {
  const { data, error } = useSWR(`/api/student/getStudentId`, getStudentId);
  if (!data) {
    return (
      <Layout pageTitle="Loading...">
        <Loading />
      </Layout>
    );
  }
  return (
    <Layout pageTitle="Check Student Payment">
      <CheckStudentPayment data={data} />
    </Layout>
  );
}
