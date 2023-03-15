import React from "react";
import useSWR from "swr";
import CreateTeacherAssignForm from "../../../components/CreateTeacherAssignForm";
import Loading from "../../../components/Loading";
import Layout from "../../../components/Layout";
import axios from "axios";
const getClassTeacher = (url) => axios.get(url).then((res) => res.data);
export default function Index() {
  const { data, error } = useSWR(
    `/api/teacherAssign/getClassTeacher`,
    getClassTeacher
  );
  if (!data) {
    return (
      <Layout pageTitle="Loading...">
        <Loading />;
      </Layout>
    );
  }
  return (
    <Layout pageTitle="Teacher Assign to Subject">
      <CreateTeacherAssignForm data={data} />
    </Layout>
  );
}
