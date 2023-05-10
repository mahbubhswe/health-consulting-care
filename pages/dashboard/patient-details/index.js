import React from "react";
import useSWR from "swr";
import Loading from "../../../components/Loading";
import DoctorLayout from "../../../components/doctor/DoctorLayout";
import ViewPatient from "../../../components/ViewPatient";
import axios from "axios";
const getData = (url) => axios.get(url).then((res) => res.data);
export default function Index() {
  const { data } = useSWR(`/api/patient/read`, getData);
  if (!data) {
    return (
      <DoctorLayout pageTitle="Loading...">
        <Loading />
      </DoctorLayout>
    );
  }
  return (
    <DoctorLayout pageTitle="Manage Patient">
      <ViewPatient data={data} />
    </DoctorLayout>
  );
}
