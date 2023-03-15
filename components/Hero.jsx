import { Box, Button, Stack, Typography } from "@mui/material";
import Lottie from "lottie-web";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import * as React from "react";
import Typewriter from "typewriter-effect";
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
    <Stack
      direction={{ xs: "column", sm: "column", md: "row" }}
      sx={{ background: "#F8F9FA", height: "600px" }}
      justifyContent="center"
      alignItems="center"
      spacing={5}
    >
      <Box sx={{  width: { xs: "100%", sm: "100%", md: "50%" }, display: "grid", placeContent: "center" }}>
        <Typography
          sx={{
            fontSize: { xs: "150%", sm: "150%", md: "250%" },
            fontFamily: "fantasy",
            color: "#BB3D6E",
          }}
        >
          <Typewriter
            options={{
              strings: "Welcome to Our School",
              autoStart: true,
              loop: true,
            }}
          />
        </Typography>
        <Typography
          sx={{
            textAlign: "center",
            fontSize: { xs: "100%", sm: "100%", md: "200%" },
            fontFamily: "Georgia",
          }}
        >
          Get Admission Today
        </Typography>
        <Typography align="center">
          <Button
            color="yallo"
            size="large"
            variant="contained"
            sx={{ width: "200px" }}
            onClick={() => router.push("/student-portal")}
          >
            Student Portal
          </Button>
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
  );
}

export default dynamic(() => Promise.resolve(Hero), {
  ssr: false,
});
