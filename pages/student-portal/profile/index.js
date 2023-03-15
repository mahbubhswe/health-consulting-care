import React from "react";
import useSWR from "swr";
import StudentPortalLayout from "../../../components/StudentPortalLayout";
import StudentProfile from "../../../components/StudentProfile";
import Loading from "../../../components/Loading";
import axios from "axios";
import useLocalStorage from "@rehooks/local-storage";
const getStudentProfileInfo = (url) => axios.get(url).then((res) => res.data);
export default function Index() {
  const [userInfo] = useLocalStorage("userInfo");
  const { data, error } = useSWR(
    `/api/student/getStudentProfileInfo?studentId=${
      userInfo && userInfo.studentId
    }`,
    getStudentProfileInfo
  );
  if (!data) {
    return (
      <StudentPortalLayout pageTitle="Loading...">
        <Loading />
      </StudentPortalLayout>
    );
  }
  return (
    <StudentPortalLayout pageTitle="Student Profile">
      <StudentProfile data={data} />
    </StudentPortalLayout>
  );
}
