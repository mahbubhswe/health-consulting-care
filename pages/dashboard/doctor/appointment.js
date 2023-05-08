import React from "react";
import useSWR from "swr";
import Loading from "../../../components/Loading";
import DoctorLayout from "../../../components/doctor/DoctorLayout";
import ManageAppointmentRequest from "../../../components/doctor/ManageAppointmentRequest";
import axios from "axios";
import useLocalStorage from "@rehooks/local-storage";
const getData = (url) => axios.get(url).then((res) => res.data);
export default function Index() {
  const [userInfo] = useLocalStorage("userInfo");
  const { data } = useSWR(
    `/api/doctor/appointment/read?${userInfo ? userInfo.phone : null}`,
    getData
  );
  if (!data) {
    return (
      <DoctorLayout pageTitle="Loading...">
        <Loading />
      </DoctorLayout>
    );
  }
  return (
    <DoctorLayout pageTitle="Manage Appointment Request">
      <ManageAppointmentRequest data={data} />
    </DoctorLayout>
  );
}
