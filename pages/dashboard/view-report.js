import React from "react";
import useSWR from "swr";
import Loading from "../../components/Loading";
import PdfLayout from "../../components/PdfLayout";
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
      <PdfLayout pageTitle="Loading...">
        <Loading />
      </PdfLayout>
    );
  }
  return (
    <PdfLayout pageTitle="View Patient Report">
      <ShowPdf data={data} />
    </PdfLayout>
  );
}
