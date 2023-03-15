import React from "react";
import useSWR from "swr";
import ManageStudentExamMark from "../../../components/ManageStudentExamMark";
import Loading from "../../../components/Loading";
import TeacherPortalLayout from "../../../components/TeacherPortalLayout";
import axios from "axios";
const getStudentExamInfo = (url) => axios.get(url).then((res) => res.data);
export default function Index() {
  const { data } = useSWR(`/api/exam/getStudentExamInfo`, getStudentExamInfo);
  if (!data) {
    return (
      <TeacherPortalLayout pageTitle="Loading...">
        <Loading />;
      </TeacherPortalLayout>
    );
  }
  return (
    <TeacherPortalLayout pageTitle="Manage Student Marks">
      <ManageStudentExamMark data={data} />
    </TeacherPortalLayout>
  );
}
