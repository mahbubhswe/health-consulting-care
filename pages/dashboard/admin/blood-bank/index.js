import React from "react";
import useSWR from "swr";
import Loading from "../../../../components/Loading";
import AdminLayout from "../../../../components/admin/AdminLayout";
import ManageBloodDoner from "../../../../components/admin/ManageBloodDoner";
import axios from "axios";
const getBloodDoner = (url) => axios.get(url).then((res) => res.data);
export default function Index() {
  const { data } = useSWR(`/api/admin/readBloodDoner`, getBloodDoner);
  if (!data) {
    return (
      <AdminLayout pageTitle="Loading...">
        <Loading />
      </AdminLayout>
    );
  }
  return (
    <AdminLayout pageTitle="Manage Blood Doner">
      <ManageBloodDoner data={data} />
    </AdminLayout>
  );
}
