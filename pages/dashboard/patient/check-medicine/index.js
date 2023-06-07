import React from "react";
import useSWR from "swr";
import DisplayMedicine from "../../../../components/patient/DisplayMedicine";
import Loading from "../../../../components/Loading";
import PatienLayout from "../../../../components/patient/PatienLayout";
import axios from "axios";
const readMedicine = (url) => axios.get(url).then((res) => res.data);
export default function Index() {
  const { data } = useSWR(`/api/admin/readMedicine`, readMedicine);

  if (!data) {
    return (
      <PatienLayout pageTitle="Loading...">
        <Loading />
      </PatienLayout>
    );
  }
  return (
    <PatienLayout pageTitle="Check Medicine">
      <DisplayMedicine data={data} />
    </PatienLayout>
  );
}
