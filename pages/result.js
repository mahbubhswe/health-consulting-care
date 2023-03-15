import React from "react";
import useSWR from "swr";
import ChechResult from "../components/ChechResult";
import Loading from "../components/Loading";
import SiteLayout from "../components/SiteLayout";
import axios from "axios";
const getClassName = (url) => axios.get(url).then((res) => res.data);
export default function Result() {
  const { data } = useSWR(`/api/exam/getClassName`, getClassName);
  if (!data) {
    return (
      <SiteLayout pageTitle="Loading...">
        <Loading />;
      </SiteLayout>
    );
  }
  return (
    <SiteLayout pageTitle="Reasult Checking">
      <ChechResult data={data} />
    </SiteLayout>
  );
}
