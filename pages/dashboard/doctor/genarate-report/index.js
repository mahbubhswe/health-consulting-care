import React from "react";
import useSWR from "swr";
import GenerateReportForm from "../../../../components/doctor/GenerateReportForm";
import DashboardLoader from "../../../../components/DashboardLoader";
import DoctorLayout from "../../../../components/doctor/DoctorLayout";
import axios from "axios";
const getData = (url) => axios.get(url).then((res) => res.data);
export default function Index() {
  const { data } = useSWR(`/api/patient/read`, getData);

  if (!data) {
    return (
      <DoctorLayout pageTitle="Loading...">
        <DashboardLoader />
      </DoctorLayout>
    );
  }
  return (
    <DoctorLayout pageTitle="Generate Patient Report">
      <GenerateReportForm data={data} />
    </DoctorLayout>
  );
}
