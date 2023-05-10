import * as React from "react";
import Head from "next/head";
import Container from "@mui/material/Container";

import Lottie from "lottie-web";
import { Paper } from "@mui/material";
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
      <main>
        <Container maxWidth="sm" sx={{mt:"25px"}}>
          <Paper sx={{p:"20px"}} variant="outlined">
            <p style={{ height: "200px" }} ref={container}></p>
            {children}
          </Paper>
        </Container>
      </main>
    </React.Fragment>
  );
}
