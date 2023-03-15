import React from "react";
import useSWR from "swr";
import CreateTeacherForm from "../../../components/CreateTeacherForm";
import Loading from "../../../components/Loading";
import Layout from "../../../components/Layout";
import axios from "axios";
const getGroup = (url) => axios.get(url).then((res) => res.data);
export default function Index() {
  const { data, error } = useSWR(`/api/group/read`, getGroup);
  if (!data) {
    return (
      <Layout pageTitle="Loading...">
        <Loading />;
      </Layout>
    );
  }
  return (
    <Layout pageTitle="Add New Teacher">
      <CreateTeacherForm data={data} />
    </Layout>
  );
}
