import { Box, Button, Stack, Typography } from "@mui/material";
import PrimaryAnim from "./PrimaryAnim";
import Typewriter from "typewriter-effect";
import Lottie from "lottie-web";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import * as React from "react";
import Link from "next/link";
function Hero() {
  const router = useRouter();
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
    <div style={{ backgroundImage: "linear-gradient(180deg,#019D91,#FFFFFF)" }}>
      <Stack
        direction={{ xs: "column", sm: "column", md: "row" }}
        sx={{ height: { xs: "800", sm: "800", md: "600" } }}
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
            fontWeight={800}
            sx={{ color: "#22292F" }}
            align="center"
          >
            {"Health"}
            <span style={{ color: "#ffffff" }}> Consulting</span> Care
          </Typography>

          <Typography
            align="center"
            variant="h4"
            sx={{ fontFamily: "cursive", fontWeight: 800, color: "#BB3D6E" }}
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
                variant="outlined"
                color="secondary"
                sx={{ width: "200px", p: "10px" }}
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
    </div>
  );
}

export default dynamic(() => Promise.resolve(Hero), {
  ssr: false,
});
