import React from "react";
import useSWR from "swr";
import StudentPortalHome from "../../components/StudentPortalHome";
import Loading from "../../components/Loading";
import { useLocalStorage } from "@rehooks/local-storage";
import StudentPortalLayout from "../../components/StudentPortalLayout";
import axios from "axios";
const getStudentDashboardInfo = (url) => axios.get(url).then((res) => res.data);
export default function Index() {
  const [userInfo] = useLocalStorage("userInfo");
  const { data, error } = useSWR(
    `/api/student/getStudentDashboardInfo?studentId=${
      userInfo && userInfo.studentId
    }
  `,
    getStudentDashboardInfo
  );
  if (!data) {
    return (
      <StudentPortalLayout pageTitle="Loading...">
        <Loading />
      </StudentPortalLayout>
    );
  }
  return (
    <StudentPortalLayout
      pageTitle="Manage User"
      name={userInfo ? userInfo.name : null}
      studentId={userInfo ? userInfo.studentId : null}
    >
      <StudentPortalHome data={data} />
    </StudentPortalLayout>
  );
}
