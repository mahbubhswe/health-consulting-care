import React from "react";
import useSWR from "swr";
import Loading from "../../../../components/Loading";
import AdminLayout from "../../../../components/admin/AdminLayout";
import ManageAppointmentRequest from "../../../../components/admin/ManageAppointmentRequest";
import axios from "axios";
const getData = (url) => axios.get(url).then((res) => res.data);
export default function Index() {
  const { data } = useSWR(`/api/admin/appointment/read`, getData);
  if (!data) {
    return (
      <AdminLayout pageTitle="Loading...">
        <Loading />
      </AdminLayout>
    );
  }
  return (
    <AdminLayout pageTitle="Manage Appointment Request">
      <ManageAppointmentRequest data={data} />
    </AdminLayout>
  );
}
