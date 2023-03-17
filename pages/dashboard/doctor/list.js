import React from "react";
import useSWR from "swr";
import Loading from "../../../components/Loading";
import DoctorLayout from "../../../components/doctor/DoctorLayout";
import DoctorList from "../../../components/doctor/DoctorList";
import axios from "axios";
const getDoctor = (url) => axios.get(url).then((res) => res.data);
export default function Index() {
  const { data } = useSWR(`/api/doctor/read`, getDoctor);
  if (!data) {
    return (
      <DoctorLayout pageTitle="Loading...">
        <Loading />
      </DoctorLayout>
    );
  }
  return (
    <DoctorLayout pageTitle="Doctor List">
      <DoctorList data={data} />
    </DoctorLayout>
  );
}
