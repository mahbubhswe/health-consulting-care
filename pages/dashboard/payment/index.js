import React from "react";
import useSWR from "swr";
import ManagePayment from "../../../components/ManagePayment";
import Loading from "../../../components/Loading";
import Layout from "../../../components/Layout";
import axios from "axios";
const getPayment = (url) => axios.get(url).then((res) => res.data);
export default function Index() {
  const { data, error } = useSWR(`/api/payment/read`, getPayment);
  if (!data) {
    return (
      <Layout pageTitle="Loading...">
        <Loading />;
      </Layout>
    );
  }
  return (
    <Layout pageTitle="Manage Payment">
      <ManagePayment data={data} />
    </Layout>
  );
}
