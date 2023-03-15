import React from "react";
import useSWR from "swr";
import ManageStudentAttendance from "../../../../components/ManageStudentAttendance";
import Loading from "../../../../components/Loading";
import TeacherPortalLayout from "../../../../components/TeacherPortalLayout";
import axios from "axios";
const getStudentAttendance = (url) => axios.get(url).then((res) => res.data);
export default function Index() {
  const { data, error } = useSWR(`/api/attendance/student/read`, getStudentAttendance);
  if (!data) {
    return (
      <TeacherPortalLayout pageTitle="Loading...">
        <Loading />;
      </TeacherPortalLayout>
    );
  }
  return (
    <TeacherPortalLayout pageTitle="Manage Student Attendance">
      <ManageStudentAttendance data={data} />
    </TeacherPortalLayout>
  );
}
