import React from "react";
import useSWR from "swr";
import Loading from "../../../components/Loading";
import PatienLayout from "../../../components/patient/PatienLayout";
import DoctorList from "../../../components/patient/DoctorList";
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
    <PatienLayout pageTitle="Doctor List">
      <DoctorList data={data} />
    </PatienLayout>
  );
}
