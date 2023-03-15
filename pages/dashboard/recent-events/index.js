import React from "react";
import useSWR from "swr";
import ManageRecentEvents from "../../../components/ManageRecentEvents";
import Loading from "../../../components/Loading";
import Layout from "../../../components/Layout";
import axios from "axios";
const getRecentEvents = (url) => axios.get(url).then((res) => res.data);
export default function Index() {
  const { data } = useSWR(`/api/recentEvents/read`, getRecentEvents);
  if (!data) {
    return (
      <Layout pageTitle="Loading...">
        <Loading />
      </Layout>
    );
  }
  return (
    <Layout pageTitle="Manage Recent Events">
      <ManageRecentEvents data={data} />
    </Layout>
  );
}
