import React from "react";
import useSWR from "swr";
import CreateStudentAttendanceForm from "../../../../components/CreateStudentAttendanceForm";
import Loading from "../../../../components/Loading";
import TeacherPortalLayout from "../../../../components/TeacherPortalLayout";
import axios from "axios";
import {useLocalStorage} from "@rehooks/local-storage";
const getClass = (url) => axios.get(url).then((res) => res.data);
export default function Index() {
    const [userInfo] = useLocalStorage("userInfo");
    const { data, error } = useSWR(
      `/api/class/getClassByTeachersInitial?teacherInitial=${
        userInfo && userInfo.teacherInitial
      }`,
      getClass
    );
  if (!data) {
    return (
      <TeacherPortalLayout pageTitle="Loading...">
        <Loading />
      </TeacherPortalLayout>
    );
  }
  return (
    <TeacherPortalLayout pageTitle="Student Attendance System">
      <CreateStudentAttendanceForm classList={data} />
    </TeacherPortalLayout>
  );
}
