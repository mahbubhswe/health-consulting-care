import React from "react";
import useSWR from "swr";
import CreatePrescription from "../../../../components/doctor/CreatePrescription";
import DashboardLoader from "../../../../components/DashboardLoader";
import DoctorLayout from "../../../../components/doctor/DoctorLayout";
import axios from "axios";
import useLocalStorage from "@rehooks/local-storage";
const getData = (url) => axios.get(url).then((res) => res.data);
export default function Index() {
  const [userInfo] = useLocalStorage("userInfo");
  const { data } = useSWR(
    `/api/doctor/readByEmail?email=${userInfo ? userInfo.email : null}`,
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
    <DoctorLayout pageTitle="Generate Prescription">
      <CreatePrescription data={data} />
    </DoctorLayout>
  );
}
