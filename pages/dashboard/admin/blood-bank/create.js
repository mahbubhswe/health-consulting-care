import React from "react";
import AddBlood from "../../../../components/admin/AddBlood";
import AdminLayout from "../../../../components/admin/AdminLayout";

export default function Index() {
  return (
    <AdminLayout pageTitle={"Add Blood"}>
      <AddBlood />
    </AdminLayout>
  );
}
