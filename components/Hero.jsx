import { Box, Button, Container, Stack, Typography } from "@mui/material";
import PrimaryAnim from "./PrimaryAnim";
import Typewriter from "typewriter-effect";
import Lottie from "lottie-web";
import dynamic from "next/dynamic";
import * as React from "react";
import Link from "next/link";
function Hero() {
  const container = React.useRef(null);
  React.useEffect(() => {
    const instance = Lottie.loadAnimation({
      container: container.current,
      renderer: "svg",
      autoplay: true,
      autoplay: true,
      animationData: require("../public/heroAnim.json"),
    });
    return () => instance.destroy();
  }, []);
  return (
    <div className="heroStyle">
      <Container>
        <Stack
          direction={{ xs: "column", sm: "column", md: "row" }}
          sx={{ height: "700px" }}
          justifyContent="center"
          alignItems="center"
          spacing={5}
        >
          <Box
            ref={container}
            sx={{
              width: { xs: "100%", sm: "100%", md: "50%" },
              display: "grid",
              placeContent: "center",
            }}
          >
            <PrimaryAnim />
            <Typography
              variant="h2"
              fontWeight={900}
              sx={{ color: "#22292F" }}
              align="center"
            >
              {"Health"}
              <span style={{ color: "#FFFFFF" }}> Consulting</span> Care
            </Typography>

            <Typography
              align="center"
              variant="h4"
              sx={{ fontFamily: "cursive", fontWeight: 800, color: "#FFFFFF" }}
            >
              <Typewriter
                options={{
                  strings: "Your Health Solutions",
                  autoStart: true,
                  loop: true,
                }}
              />
            </Typography>
            <br></br>
            <Typography align="center">
              <Link href="/login">
                <Button
                  variant="contained"
                  color="secondary"
                  sx={{
                    width: "200px",
                    p: "10px",
                    background: "#14b486",
                    color: "white",
                  }}
                  size="large"
                >
                  Login
                </Button>
              </Link>
            </Typography>
          </Box>

          <Box
            ref={container}
            sx={{
              width: { xs: "100%", sm: "100%", md: "50%" },
              display: "grid",
              placeContent: "center",
            }}
          />
        </Stack>
      </Container>
    </div>
  );
}

export default dynamic(() => Promise.resolve(Hero), {
  ssr: false,
});
