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
import React from "react";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SocialMediaLink from "./SocialMediaLInk";
export default function Footer() {
  return (
    <Box
      sx={{
        backgroundColor: "#E9E9E9",
        paddingY: "25px",
        borderTop: "1px solid #ccc",
      }}
    >
      <Container>
        <Stack direction={{ xs: "column", sm: "row", md: "row" }} spacing={1}>
          <Box
            sx={{
              display: {
                xs: "none",
                sm: "none",
                md: "block",
                lg: "block",
                xl: "block",
              },
              width: { xs: "100%", sm: "100%", md: "50%" },
              height: "300px",
              display: "grid",
              placeContent: "center",
            }}
          >
            <SocialMediaLink />
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              height: "300px",
              display: "grid",
              placeContent: "center",
            }}
          >
            <List>
              <ListItem>
                <ListItemIcon>
                  <PhoneIcon sx={{ color: "#21335C" }} />
                </ListItemIcon>
                <ListItemText primary="Phone" secondary="+123456789" />
              </ListItem>

              <ListItem>
                <ListItemIcon>
                  <EmailIcon sx={{ color: "#21335C" }} />
                </ListItemIcon>
                <ListItemText primary="Email" secondary="example@gmail.com" />
              </ListItem>

              <ListItem>
                <ListItemIcon>
                  <LocationOnIcon sx={{ color: "#21335C" }} />
                </ListItemIcon>
                <ListItemText primary="Address" secondary="House, Road ,xxx" />
              </ListItem>
            </List>
          </Box>
        </Stack>
      </Container>
      <Divider></Divider>
      <Typography align="center" sx={{ color: "gray", mt: "20px" }}>
        All Rights Reserved @ {new Date().getFullYear()} XYZ Health Consulting Care
      </Typography>
    </Box>
  );
}
