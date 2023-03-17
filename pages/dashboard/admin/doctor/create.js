import React from "react";
import AddDoctor from "../../../../components/admin/AddDoctor";
import AdminLayout from "../../../../components/admin/AdminLayout";

export default function Index() {
  return (
    <AdminLayout pageTitle={"Add New Doctor"}>
      <AddDoctor />
    </AdminLayout>
  );
}
