import React from "react";
import AddCabine from "../../../../components/admin/AddCabine";
import AdminLayout from "../../../../components/admin/AdminLayout";

export default function Index() {
  return (
    <AdminLayout pageTitle={"Add Cabine"}>
      <AddCabine />
    </AdminLayout>
  );
}
