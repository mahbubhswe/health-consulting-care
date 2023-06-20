import { Tabs } from "react-simple-tabs-component";
import "react-simple-tabs-component/dist/index.css";
import DoctorLogin from "./../components/doctor/DoctorLogin";
import PatientLogin from "./../components/patient/PatientLogin";

const tabs1 = () => {
  return <PatientLogin />;
};

const tabs2 = () => {
  return <DoctorLogin />;
};


const tabs = [
  {
    label: "Patient", // Tab Title - String
    Component: tabs1, // Tab Body - JSX.Element
  },
  {
    label: "Doctor",
    Component: tabs2,
  },
 
];

export default function Login() {
  return <Tabs tabs={tabs} />;
}
