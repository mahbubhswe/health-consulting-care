import React from "react";
import AddMedicine from "../../../../components/admin/AddMedicine";
import AdminLayout from "../../../../components/admin/AdminLayout";

export default function Index() {
  return (
    <AdminLayout pageTitle={"Add Medicine"}>
      <AddMedicine />
    </AdminLayout>
  );
}
