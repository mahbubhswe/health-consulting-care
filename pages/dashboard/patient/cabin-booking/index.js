import React from "react";
import useSWR from "swr";
import Loading from "../../../../components/Loading";
import PatienLayout from "../../../../components/patient/PatienLayout";
import ManageCabinBooking from "../../../../components/patient/ManageCabinBooking";
import axios from "axios";
import useLocalStorage from "@rehooks/local-storage";
const readData = (url) => axios.get(url).then((res) => res.data);
export default function Index() {
  const [userInfo] = useLocalStorage("userInfo");
  const { data } = useSWR(
    `/api/patient/cabin/readCabinBookingByPhone?phone=${
      userInfo ? userInfo.phone : null
    }`,
    readData
  );
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
