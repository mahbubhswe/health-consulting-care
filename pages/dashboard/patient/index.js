import React from "react";
import useSWR from "swr";
import PatientDashboard from "../../../components/patient/PatientDashboard";
import DashboardLoader from "../../../components/DashboardLoader";
import PatienLayout from "../../../components/patient/PatienLayout";
import axios from "axios";
const getDashboardInfo = (url) => axios.get(url).then((res) => res.data);
export default function Index() {
  const { data } = useSWR(`/api/user/getDashboardInfo`, getDashboardInfo);

  if (!data) {
    return (
      <PatienLayout pageTitle="Loading...">
        <DashboardLoader />
      </PatienLayout>
    );
  }
  return (
    <PatienLayout pageTitle="Welcome to Pateint Dashboard">
      <PatientDashboard data={data} />
    </PatienLayout>
  );
}
