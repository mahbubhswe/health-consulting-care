import React from "react";
import useSWR from "swr";
import Loading from "../../../../components/Loading";
import PatienLayout from "../../../../components/patient/PatienLayout";
import ManageAmbulanceBooking from "../../../../components/patient/ManageAmbulanceBooking";
import axios from "axios";
const readData = (url) => axios.get(url).then((res) => res.data);
export default function Index() {
  const { data } = useSWR(`/api/common/readAmbulanceBooking`, readData);
  if (!data) {
    return (
      <PatienLayout pageTitle="Loading...">
        <Loading />
      </PatienLayout>
    );
  }
  return (
    <PatienLayout pageTitle="Manage Ambulance Booking">
      <ManageAmbulanceBooking data={data} />
    </PatienLayout>
  );
}
