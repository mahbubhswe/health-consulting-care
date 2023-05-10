import React from "react";
import PatienLayout from "../../../components/patient/PatienLayout";
import Lottie from "lottie-web";
import { Typography } from "@mui/material";
import useLocalStorage from "@rehooks/local-storage";
import dynamic from "next/dynamic";
import BrsAnim from "../../../components/BrsAnim";
function Index() {
  const [userInfo] = useLocalStorage("userInfo");
  const container = React.useRef(null);
  React.useEffect(() => {
    const instance = Lottie.loadAnimation({
      container: container.current,
      renderer: "svg",
      autoplay: true,
      autoplay: true,

      animationData: require("../../../public/login.json"),
    });
    return () => instance.destroy();
  }, []);
  return (
    <PatienLayout>
      <Typography
        component={"h1"}
        sx={{ textAlign: "center", fontSize: "40px", fontWeight: "900" }}
      >
        Welcome back! {userInfo ? userInfo.fullName : "Loading..."}
      </Typography>
      <p ref={container} style={{ height: "300px" }}></p>
      <div style={{ textAlign: "right" }}>
        {" "}
        <Typography
          sx={{ color: "grey", fontSize: "25px", fontWeight: "bold" }}
        >
          XYZ Health Consulting Care
        </Typography>
        <Typography sx={{ color: "grey", fontWeight: "bold" }}>
          Your Health Solutions
        </Typography>{" "}
        <BrsAnim />
      </div>
    </PatienLayout>
  );
}
export default dynamic(() => Promise.resolve(Index), {
  ssr: false,
});
