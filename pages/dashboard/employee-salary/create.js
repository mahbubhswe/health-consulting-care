import React from "react";
import useSWR from "swr";
import CreateEmployeeSalaryForm from "../../../components/CreateEmployeeSalaryForm";
import Loading from "../../../components/Loading";
import Layout from "../../../components/Layout";
import axios from "axios";
const getEmployee = (url) => axios.get(url).then((res) => res.data);
export default function Index() {
  const { data, error } = useSWR(`/api/employee/read`, getEmployee);
  if (!data) {
    return (
      <Layout pageTitle="Loading...">
        <Loading />
      </Layout>
    );
  }
  return (
    <Layout pageTitle="Employee Salary">
      <CreateEmployeeSalaryForm data={data} />
    </Layout>
  );
}
