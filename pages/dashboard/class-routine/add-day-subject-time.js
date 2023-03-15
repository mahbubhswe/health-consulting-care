import React from "react";
import useSWR from "swr";
import AddDaySubjectAndTimeForm from "../../../components/AddDaySubjectAndTimeForm";
import Loading from "../../../components/Loading";
import Layout from "../../../components/Layout";
import axios from "axios";
const getClassName = (url) => axios.get(url).then((res) => res.data);
export default function Index() {
  const { data, error } = useSWR(`/api/classRoutine/read`, getClassName);
  if (!data) {
    return (
      <Layout pageTitle="Loading...">
        <Loading />
      </Layout>
    );
  }
  return (
    <Layout pageTitle="Add Class Subject and Time">
      <AddDaySubjectAndTimeForm data={data} />
    </Layout>
  );
}
