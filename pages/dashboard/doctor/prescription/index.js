import React from "react";
import useSWR from "swr";
import ManagePrescription from "../../../../components/doctor/ManagePrescription";
import DashboardLoader from "./../../../../components/DashboardLoader";
import DoctorLayout from "../../../../components/doctor/DoctorLayout";
import axios from "axios";
import useLocalStorage from "@rehooks/local-storage";
const getData = (url) => axios.get(url).then((res) => res.data);
export default function Index() {
  const [userInfo] = useLocalStorage("userInfo");
  const { data } = useSWR(
    `/api/doctor/readPrescription?email=${userInfo ? userInfo.email : null}`,
    getData
  );

  if (!data) {
    return (
      <DoctorLayout pageTitle="Loading...">
        <DashboardLoader />
      </DoctorLayout>
    );
  }
  return (
    <DoctorLayout pageTitle="Prescription List">
      <ManagePrescription data={data} />
    </DoctorLayout>
  );
}
