import React from "react";
import useSWR from "swr";
import ManageLatestNews from "../../../components/ManageLatestNews";
import Loading from "../../../components/Loading";
import Layout from "../../../components/Layout";
import axios from "axios";
const getLatestNews = (url) => axios.get(url).then((res) => res.data);
export default function Index() {
  const { data, error } = useSWR(`/api/latestNews/read`, getLatestNews);

  if (!data) {
    return (
      <Layout pageTitle="Loading...">
        <Loading />;
      </Layout>
    );
  }
  return (
    <Layout pageTitle="Manage Latest News">
      <ManageLatestNews data={data} />
    </Layout>
  );
}
