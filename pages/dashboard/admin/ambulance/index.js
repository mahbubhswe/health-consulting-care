import React from "react";
import useSWR from "swr";
import Loading from "../../../../components/Loading";
import AdminLayout from "../../../../components/admin/AdminLayout";
import ManageAmbulance from "../../../../components/admin/ManageAmbulance";
import axios from "axios";
const getAmbulane = (url) => axios.get(url).then((res) => res.data);
export default function Index() {
  const { data } = useSWR(`/api/admin/readAmbulance`, getAmbulane);
  if (!data) {
    return (
      <AdminLayout pageTitle="Loading...">
        <Loading />
      </AdminLayout>
    );
  }
  return (
    <AdminLayout pageTitle="Manage Ambulance">
      <ManageAmbulance data={data} />
    </AdminLayout>
  );
}
