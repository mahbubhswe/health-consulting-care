import React from "react";
import useSWR from "swr";
import ManageTeacherAttendance from "../../../../components/ManageTeacherAttendance";
import Loading from "../../../../components/Loading";
import Layout from "../../../../components/Layout";
import axios from "axios";
const getTeacherAttendance = (url) => axios.get(url).then((res) => res.data);
export default function Index() {
  const { data, error } = useSWR(
    `/api/attendance/teacher/read`,
    getTeacherAttendance
  );
  if (!data) {
    return (
      <Layout pageTitle="Loading...">
        <Loading />;
      </Layout>
    );
  }
  return (
    <Layout pageTitle="Manage Teacher Attendance">
      <ManageTeacherAttendance data={data} />
    </Layout>
  );
}
