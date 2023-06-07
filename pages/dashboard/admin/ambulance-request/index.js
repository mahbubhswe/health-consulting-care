import React from "react";
import useSWR from "swr";
import Loading from "../../../../components/Loading";
import AdminLayout from "../../../../components/admin/AdminLayout";
import ManageAmbulanceRrquest from "../../../../components/admin/ManageAmbulanceRrquest";
import axios from "axios";
const getAmbulaneRequest = (url) => axios.get(url).then((res) => res.data);
export default function Index() {
  const { data } = useSWR(
    `/api/common/readAmbulanceBooking`,
    getAmbulaneRequest
  );
  if (!data) {
    return (
      <AdminLayout pageTitle="Loading...">
        <Loading />
      </AdminLayout>
    );
  }
  return (
    <AdminLayout pageTitle="Manage Ambulance Rrquest">
      <ManageAmbulanceRrquest data={data} />
    </AdminLayout>
  );
}
