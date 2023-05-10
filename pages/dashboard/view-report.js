import React from "react";
import useSWR from "swr";
import Loading from "../../components/Loading";
import DoctorLayout from "../../components/doctor/DoctorLayout";
import ShowPdf from "../../components/ShowPdf";
import axios from "axios";
import { useRouter } from "next/router";
const getData = (url) => axios.get(url).then((res) => res.data);
export default function Index() {
  const router = useRouter();
  const { data } = useSWR(
    `/api/common/readById?id=${router ? router.query.id : null}`,
    getData
  );
  if (!data) {
    return (
      <DoctorLayout pageTitle="Loading...">
        <Loading />
      </DoctorLayout>
    );
  }
  return (
    <DoctorLayout pageTitle="View Patient Report">
      <ShowPdf data={data} />
    </DoctorLayout>
  );
}
