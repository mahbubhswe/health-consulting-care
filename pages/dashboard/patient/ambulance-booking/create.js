import React from "react";
import useSWR from "swr";
import Loading from "../../../../components/Loading";
import PatienLayout from "../../../../components/patient/PatienLayout";
import CreateAmbulanceBooking from "../../../../components/patient/CreateAmbulanceBooking";
import axios from "axios";
const getAmbulane = (url) => axios.get(url).then((res) => res.data);
export default function Index() {
  const { data } = useSWR(
    `/api/patient/ambulance/readAmbulanceForBooking`,
    getAmbulane
  );
  if (!data) {
    return (
      <PatienLayout pageTitle="Loading...">
        <Loading />
      </PatienLayout>
    );
  }
  return (
    <PatienLayout pageTitle="Ambulance Booking ">
      <CreateAmbulanceBooking data={data} />
    </PatienLayout>
  );
}
