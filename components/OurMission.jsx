import {
  Box,
  Container,
  Stack,
  Typography,
  ListItem,
  List,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import * as React from "react";
import AdjustIcon from "@mui/icons-material/Adjust";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Fade from "react-reveal/Fade";
import Lottie from "lottie-web";
export default function OurMission() {
  const container = React.useRef(null);
  React.useEffect(() => {
    const instance = Lottie.loadAnimation({
      container: container.current,
      renderer: "svg",
      autoplay: true,
      autoplay: true,
      animationData: require("../public/missionAnim.json"),
    });
    return () => instance.destroy();
  }, []);
  return (
    <Box sx={{ backgroundColor: "#F3ECEA" }}>
      <Container>
        <Typography
          sx={{ color: "#BB3D6E" }}
          pt={7}
          align="center"
          variant="bold"
          component="h1"
        >
          What is Our Mission?
        </Typography>
        <Divider>
          <AdjustIcon fontSize="3" />
          <AdjustIcon fontSize="3" />
          <AdjustIcon fontSize="3" />
        </Divider>
        <Stack direction={{ xs: "column", sm: "row", md: "row" }}>
          <Box
            ref={container}
            sx={{
              height: "500px",
              width: { xs: "100%", sm: "50%", md: "50%" },
              display: "grid",
              placeContent: "center",
            }}
          />
          <Box
            sx={{
              height: "500px",
              width: { xs: "100%", sm: "50%", md: "50%" },
              display: "grid",
              placeContent: "center",
            }}
          >
            <List>
              <Fade bottom delay={100} duration={1000}>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon sx={{ color: "#21335C" }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Lorem Ipsum"
                    secondary="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                  />
                </ListItem>
              </Fade>
            </List>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
