import React from "react";
import useSWR from "swr";
import Loading from "../../../../components/Loading";
import AdminLayout from "../../../../components/admin/AdminLayout";
import ManageMedicine from "../../../../components/admin/ManageMedicine";
import axios from "axios";
const getMedicine = (url) => axios.get(url).then((res) => res.data);
export default function Index() {
  const { data } = useSWR(`/api/admin/readMedicine`, getMedicine);
  if (!data) {
    return (
      <AdminLayout pageTitle="Loading...">
        <Loading />
      </AdminLayout>
    );
  }
  return (
    <AdminLayout pageTitle="Manage Medicine">
      <ManageMedicine data={data} />
    </AdminLayout>
  );
}
