import React from "react";
import CreateAppoinment from "../../../../components/patient/CreateAppoinment";
import PatienLayout from "../../../../components/patient/PatienLayout";
import useSWR from "swr";
import Loading from "../../../../components/Loading";
import axios from "axios";
const getDoctor = (url) => axios.get(url).then((res) => res.data);
export default function Index() {
  const { data } = useSWR(`/api/doctor/read`, getDoctor);
  if (!data) {
    return (
      <PatienLayout pageTitle="Loading...">
        <Loading />
      </PatienLayout>
    );
  }
  return (
    <PatienLayout pageTitle={"Create Appoinment"}>
      <CreateAppoinment data={data} />
    </PatienLayout>
  );
}
