import React from "react";
import useSWR from "swr";
import Loading from "../../../../components/Loading";
import AdminLayout from "../../../../components/admin/AdminLayout";
import ManagePatient from "../../../../components/admin/ManagePatient";
import axios from "axios";
const getData = (url) => axios.get(url).then((res) => res.data);
export default function Index() {
  const { data } = useSWR(`/api/patient/read`, getData);
  if (!data) {
    return (
      <AdminLayout pageTitle="Loading...">
        <Loading />
      </AdminLayout>
    );
  }
  return (
    <AdminLayout pageTitle="Manage Patient">
      <ManagePatient data={data} />
    </AdminLayout>
  );
}
