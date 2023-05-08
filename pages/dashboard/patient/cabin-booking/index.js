import React from "react";
import useSWR from "swr";
import Loading from "../../../../components/Loading";
import PatienLayout from "../../../../components/patient/PatienLayout";
import ManageCabinBooking from "../../../../components/patient/ManageCabinBooking";
import axios from "axios";
const readData = (url) => axios.get(url).then((res) => res.data);
export default function Index() {
  const { data } = useSWR(`/api/common/readCabinBooking`, readData);
  if (!data) {
    return (
      <PatienLayout pageTitle="Loading...">
        <Loading />
      </PatienLayout>
    );
  }
  return (
    <PatienLayout pageTitle="Manage Cabin Booking">
      <ManageCabinBooking data={data} />
    </PatienLayout>
  );
}
