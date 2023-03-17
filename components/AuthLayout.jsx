import * as React from "react";
import Head from "next/head";
import Container from "@mui/material/Container";

import Lottie from "lottie-web";
export default function Layout({ pageTitle, children }) {
  const container = React.useRef(null);
  React.useEffect(() => {
    const instance = Lottie.loadAnimation({
      container: container.current,
      renderer: "svg",
      autoplay: true,
      autoplay: true,
      animationData: require("../public/login.json"),
    });
    return () => instance.destroy();
  }, []);
  return (
    <React.Fragment>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <div
        style={{
          height: "100vh",
          background: "#FFFFFF",
        }}
      >
        <p style={{ height: "200px" }} ref={container}></p>
        <Container maxWidth="sm">{children}</Container>
      </div>
    </React.Fragment>
  );
}
