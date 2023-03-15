import { useRouter } from "next/router";
import React from "react";
import StudentSelfProfileUpdateForm from "../../../components/StudentSelfProfileUpdateForm";
import StudentPortalLayout from "../../../components/StudentPortalLayout";
import useLocalStorage from "@rehooks/local-storage";
export default function UpdateUser() {
  const [userInfo] = useLocalStorage("userInfo");
  const router = useRouter();
  return (
    <StudentPortalLayout
      pageTitle="Update Profile"
      name={userInfo && userInfo.name}
      studentId={userInfo && userInfo.studentId}
    >
      <StudentSelfProfileUpdateForm data={router.query} />
    </StudentPortalLayout>
  );
}
