import React from "react";
import AddDoctor from "../../../../components/AddDoctor";
import AdminLayout from "../../../../components/AdminLayout";

export default function Index() {
  return (
    <AdminLayout pageTitle={"Add New Doctor"}>
      <AddDoctor />
    </AdminLayout>
  );
}
