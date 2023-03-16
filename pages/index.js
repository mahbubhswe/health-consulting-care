import React from "react";
import Hero from "../components/Hero";
import OurMission from "../components/OurMission";
import OurSpeciality from "../components/OurSpeciality";
import Footer from "../components/Footer";
export default function Index() {
  return (
    <React.Fragment>
      <Hero />
      <OurMission />
      <OurSpeciality />
      <Footer />
    </React.Fragment>
  );
}
