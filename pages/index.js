import React from "react";
import GroupSection from "../components/GroupSection";
import Hero from "../components/Hero";
import SiteLayout from "../components/SiteLayout";
import OurMission from "../components/OurMission";
import OurSpeciality from "../components/OurSpeciality";
import Footer from "../components/Footer";
import TeacherList from "../components/TeacherList";
import RecentEvents from "../components/RecentEvents";
export default function Index() {
  return (
    <SiteLayout>
      <Hero />
      <GroupSection />
      <TeacherList />
      <RecentEvents />
      <OurMission />
      <OurSpeciality />
      <Footer />
    </SiteLayout>
  );
}
