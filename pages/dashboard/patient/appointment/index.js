import React from "react";
import useSWR from "swr";
import Loading from "../../../../components/Loading";
import PatienLayout from "../../../../components/patient/PatienLayout";
import ManageAppointment from "../../../../components/patient/ManageAppointment";
import axios from "axios";
const getAppointment = (url) => axios.get(url).then((res) => res.data);
export default function Index() {
  const { data } = useSWR(`/api/patient/read`, getAppointment);
  if (!data) {
    return (
      <PatienLayout pageTitle="Loading...">
        <Loading />
      </PatienLayout>
    );
  }
  return (
    <PatienLayout pageTitle="Doctor List">
      <ManageAppointment data={data} />
    </PatienLayout>
  );
}
