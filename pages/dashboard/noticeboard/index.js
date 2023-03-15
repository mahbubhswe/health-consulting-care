import React from "react";
import useSWR from "swr";
import ManageNoticeboard from "../../../components/ManageNoticeboard";
import Loading from "../../../components/Loading";
import Layout from "../../../components/Layout";
import axios from "axios";
const getNotice = (url) => axios.get(url).then((res) => res.data);
export default function Index() {
  const { data, error } = useSWR(`/api/notice/read`, getNotice);

  if (!data) {
    return (
      <Layout pageTitle="Loading...">
        <Loading />;
      </Layout>
    );
  }
  return (
    <Layout pageTitle="Manage Noticeboard">
      <ManageNoticeboard data={data} />
    </Layout>
  );
}
