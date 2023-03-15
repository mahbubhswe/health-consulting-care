import React from "react";
import useSWR from "swr";
import ShowClassRoutine from "../components/ShowClassRoutine";
import Loading from "../components/Loading";
import SiteLayout from "../components/SiteLayout";
import axios from "axios";
const getRoutineClass = (url) => axios.get(url).then((res) => res.data);
export default function Result() {
  const { data } = useSWR(`/api/classRoutine/getRoutineClass`, getRoutineClass);
  if (!data) {
    return (
      <SiteLayout pageTitle="Loading...">
        <Loading />;
      </SiteLayout>
    );
  }
  return (
    <SiteLayout pageTitle="Chack Class Routine">
      <ShowClassRoutine data={data} />
    </SiteLayout>
  );
}
