import React from "react";
import useSWR from "swr";
import Loading from "../../../../components/Loading";
import AdminLayout from "../../../../components/AdminLayout";
import ManageDoctor from "../../../../components/ManageDoctor";
import axios from "axios";
const getDoctor = (url) => axios.get(url).then((res) => res.data);
export default function Index() {
  const { data } = useSWR(`/api/doctor/read`, getDoctor);
  if (!data) {
    return (
      <AdminLayout pageTitle="Loading...">
        <Loading />;
      </AdminLayout>
    );
  }
  return (
    <AdminLayout pageTitle="Manage Doctor">
      <ManageDoctor data={data} />
    </AdminLayout>
  );
}
