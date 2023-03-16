import React from "react";
import useSWR from "swr";
import AdminDashboard from "../../../components/AdminDashboard";
import DashboardLoader from "../../../components/DashboardLoader";
import AdminLayout from "../../../components/AdminLayout";
import axios from "axios";
const getDashboardInfo = (url) => axios.get(url).then((res) => res.data);
export default function Index() {
  const { data } = useSWR(`/api/user/getDashboardInfo`, getDashboardInfo);

  if (!data) {
    return (
      <AdminLayout pageTitle="Loading...">
        <DashboardLoader />
      </AdminLayout>
    );
  }
  return (
    <AdminLayout pageTitle="Welcome to Admin Dashboard">
      <AdminDashboard data={data} />
    </AdminLayout>
  );
}
