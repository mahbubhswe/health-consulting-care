import React from "react";
import useSWR from "swr";
import DoctorDashboard from "../../../components/doctor/DoctorDashboard";
import DashboardLoader from "./../../../components/DashboardLoader";
import DoctorLayout from "../../../components/doctor/DoctorLayout";
import axios from "axios";
const getDashboardInfo = (url) => axios.get(url).then((res) => res.data);
export default function Index() {
  const { data } = useSWR(`/api/user/getDashboardInfo`, getDashboardInfo);

  if (!data) {
    return (
      <DoctorLayout pageTitle="Loading...">
        <DashboardLoader />
      </DoctorLayout>
    );
  }
  return (
    <DoctorLayout pageTitle="Welcome to Doctor Dashboard">
      <DoctorDashboard data={data} />
    </DoctorLayout>
  );
}
