import React from "react";
import useSWR from "swr";
import Loading from "../../../../components/Loading";
import PatienLayout from "../../../../components/patient/PatienLayout";
import CreateCabinBooking from "../../../../components/patient/CreateCabinBooking";
import axios from "axios";
const getData = (url) => axios.get(url).then((res) => res.data);
export default function Index() {
  const { data } = useSWR(`/api/patient/cabin/readCabinForBooking`, getData);
  if (!data) {
    return (
      <PatienLayout pageTitle="Loading...">
        <Loading />
      </PatienLayout>
    );
  }
  return (
    <PatienLayout pageTitle="Cabin Booking">
      <CreateCabinBooking data={data} />
    </PatienLayout>
  );
}
