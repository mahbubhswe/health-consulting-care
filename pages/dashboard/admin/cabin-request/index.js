import React from "react";
import useSWR from "swr";
import Loading from "../../../../components/Loading";
import AdminLayout from "../../../../components/admin/AdminLayout";
import ManageCabinRequest from "../../../../components/admin/ManageCabinRequest";
import axios from "axios";
const getCabinRequest = (url) => axios.get(url).then((res) => res.data);
export default function Index() {
  const { data } = useSWR(`/api/common/readCabinBooking`, getCabinRequest);
  if (!data) {
    return (
      <AdminLayout pageTitle="Loading...">
        <Loading />
      </AdminLayout>
    );
  }
  return (
    <AdminLayout pageTitle="Manage Cabin Request">
      <ManageCabinRequest data={data} />
    </AdminLayout>
  );
}
