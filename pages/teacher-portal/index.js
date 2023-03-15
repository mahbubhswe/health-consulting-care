import { Paper, Stack, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import TeacherPortalLayout from "../../components/TeacherPortalLayout";
export default function Index() {
  return (
    <TeacherPortalLayout pageTitle="Teacher Portal">
      <Paper sx={{ p: "25px", mt: "25px", background: "#D9465A" }}>
        <Stack
          direction={{ xs: "column", sm: "column", md: "row" }}
          spacing={3}
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography
            flexGrow={1}
            align="center"
            variant="bold"
            component="h1"
            fontWeight={900}
            sx={{ fontFamily: "sans-serif", color: "#ffffff" }}
          >
            Welcome to Teacher Portal
          </Typography>

          <Image
            src="/studentPortalWelcome.webp"
            height={350}
            width={350}
            quality={100}
          />
        </Stack>
      </Paper>
    </TeacherPortalLayout>
  );
}
