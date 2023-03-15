import React from "react";
import useSWR from "swr";
import CreateTeacherAttendanceForm from "../../../../components/CreateTeacherAttendanceForm";
import Loading from "../../../../components/Loading";
import Layout from "../../../../components/Layout";
import axios from "axios";
const getTeacher = (url) => axios.get(url).then((res) => res.data);
export default function Index() {
  const { data, error } = useSWR(
    `/api/attendance/teacher/getTeacher`,
    getTeacher
  );
  if (!data) {
    return (
      <Layout pageTitle="Loading...">
        <Loading />;
      </Layout>
    );
  }
  return (
    <Layout pageTitle="Teacher Attendance System">
      <CreateTeacherAttendanceForm data={data} />
    </Layout>
  );
}
