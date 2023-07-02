import React from "react";
import useSWR from "swr";
import Loading from "../../../../components/Loading";
import PdfLayout from "../../../../components/PdfLayout";
import ShowPdf from "../../../../components/doctor/ShowPdf";
import axios from "axios";
import { useRouter } from "next/router";
import useLocalStorage from "@rehooks/local-storage";
const getData = (url) => axios.get(url).then((res) => res.data);
export default function Index() {
  const [userInfo] = useLocalStorage("userInfo");
  const router = useRouter();
  const { data } = useSWR(
    `/api/doctor/readPrescriptionByid?id=${
      router ? router.query.id : null
    }&email=${userInfo ? userInfo.email : null}`,
    getData
  );
  if (!data) {
    return (
      <PdfLayout pageTitle="Creating Prescription...">
        <Loading />
      </PdfLayout>
    );
  }
  return (
    <PdfLayout pageTitle="View and Download Prescription">
      <ShowPdf data={data} />
    </PdfLayout>
  );
}
