import React from "react";
import useSWR from "swr";
import ManageEmployeeSalary from "../../../components/ManageEmployeeSalary";
import Loading from "../../../components/Loading";
import Layout from "../../../components/Layout";
import axios from "axios";
const getImployeeSalary = (url) => axios.get(url).then((res) => res.data);
export default function Index() {
  const { data } = useSWR(`/api/employeeSalary/read`, getImployeeSalary);
  if (!data) {
    return (
      <Layout pageTitle="Loading...">
        <Loading />;
      </Layout>
    );
  }
  return (
    <Layout pageTitle="Manage Employee Salary">
      <ManageEmployeeSalary data={data} />
    </Layout>
  );
}
