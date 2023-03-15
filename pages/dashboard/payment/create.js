import React from "react";
import useSWR from "swr";
import CreateStudentPaymentForm from "../../../components/CreateStudentPaymentForm";
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
    <Layout pageTitle="Student Payment System">
      <CreateStudentPaymentForm data={data} />
    </Layout>
  );
}
