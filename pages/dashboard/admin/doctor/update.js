import React from "react";
import Loading from "../../../../components/Loading";
import AdminLayout from "../../../../components/admin/AdminLayout";
import UpdateDoctorInfo from "../../../../components/admin/UpdateDoctorInfo";
import { useRouter } from "next/router";
export default function Index() {
  const router = useRouter();
  if (!router) {
    return (
      <AdminLayout pageTitle="Loading...">
        <Loading />
      </AdminLayout>
    );
  }
  return (
    <AdminLayout pageTitle="Update Doctor Information">
      <UpdateDoctorInfo data={router.query} />
    </AdminLayout>
  );
}
