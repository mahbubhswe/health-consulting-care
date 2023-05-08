import React from "react";
import useSWR from "swr";
import DisplayBloodBank from "../../../components/patient/DisplayBloodBank";
import Loading from "../../../components/Loading";
import PatienLayout from "../../../components/patient/PatienLayout";
import axios from "axios";
const getData = (url) => axios.get(url).then((res) => res.data);
export default function Index() {
  const { data } = useSWR(`/api/admin/readBloodDoner`, getData);

  if (!data) {
    return (
      <PatienLayout pageTitle="Loading...">
        <Loading />
      </PatienLayout>
    );
  }
  return (
    <PatienLayout pageTitle="Check Blood Bank">
      <DisplayBloodBank data={data} />
    </PatienLayout>
  );
}
