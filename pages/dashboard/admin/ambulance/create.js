import React from "react";
import AddAmbulance from "../../../../components/admin/AddAmbulance";
import AdminLayout from "../../../../components/admin/AdminLayout";

export default function Index() {
  return (
    <AdminLayout pageTitle={"Add Ambulance"}>
      <AddAmbulance />
    </AdminLayout>
  );
}
