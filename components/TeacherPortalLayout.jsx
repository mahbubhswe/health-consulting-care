import {
  Box,
  Container,
  Divider,
  Drawer,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import Head from "next/head";
import React, { useState } from "react";
import UserProfile from "./UserProfile";
import TeacherPortalOptions from "./TeacherPortalOptions";
import MenuIcon from "@mui/icons-material/Menu";
export default function Layout({ pageTitle, children }) {
  const [open, setOpen] = useState(false);
  return (
    <React.Fragment>
      <Head>
        <title>{pageTitle ? pageTitle : "Admin Dashboard"}</title>
      </Head>
      <Stack direction={{ xs: "column", sm: "row", md: "row" }}>
        <Paper
          sx={{
            display: { xs: "none", sm: "none", md: "block" },
            width: "250px",
            minHeight: "100vh",
          }}
        >
          <Box
            sx={{
              height: "100vh",
              overflowY: "scroll",
              scrollBehavior: "smooth",
              position: "fixed",
            }}
          >
            <UserProfile />
            <Divider />
            <TeacherPortalOptions />
          </Box>
        </Paper>
        <Container
          sx={{
            flex: 1,
            p: { xs: "5px", sm: "10px", md: "30px" },
          }}
        >
          <Typography
            sx={{ display: { xs: "block", sm: "none", md: "none" } }}
            align="right"
            component="div"
          >
            <IconButton onClick={() => setOpen(true)}>
              <MenuIcon />
            </IconButton>
          </Typography>
          <Paper
            sx={{
              px: { xs: "5px", sm: "30px", md: "80px" },
              py: "30px",
              borderTop: "3px solid #FEB330",
            }}
            elevation={1}
          >
            <Typography
              variant="bold"
              component="h1"
              align="center"
              sx={{ color: "gray", mb: "25px" }}
            >
              {pageTitle}
            </Typography>
            {children}
          </Paper>
        </Container>
      </Stack>
      {/* for mobile */}
      <Drawer open={open} onClose={() => setOpen(!open)}>
        <UserProfile />
        <Divider />
        <TeacherPortalOptions />
      </Drawer>
    </React.Fragment>
  );
}
