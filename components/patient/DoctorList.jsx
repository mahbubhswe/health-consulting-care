import * as React from "react";
import { useRouter } from "next/router";
import { Avatar, Box, Button, Grid, Stack, Typography } from "@mui/material";
export default function DoctorList({ data }) {
  const router = useRouter();

  return (
    <React.Fragment>
      <Grid
        container
        direction={"row"}
        justifyContent={"space-around"}
        alignItems={"center"}
      >
        {data.map((item, index) => (
          <Grid item key={index}>
            <Avatar
              alt="Profile"
              src={item.profilePic}
              sx={{ width: 120, height: 120 }}
            />

            <Box sx={{ width: "300px", height: "350px" }}>
              <br />
              <span
                style={{
                  background: "#4B8EB0",
                  color: "white",
                  borderRadius: "20px",
                  padding: "5px",
                }}
              >
                {item.fullName}
              </span>
              <br />
              <Typography>{item.description}</Typography> <br />
              <Typography
                sx={{
                  background: "#D9EDF6",
                  color: "#339DBB",
                  borderRadius: "4px",
                  p: "5px",
                }}
              >
                Visiting Hours: {item.visitingHours}
              </Typography>{" "}
              <br />
              <Stack direction={"row"} spacing={1}>
                <Button
                  size="small"
                  variant="contained"
                  sx={{ background: "#5EA4B7" }}
                  onClick={() =>
                    router.push(`/view-doctor-profile?id=${item.id}`)
                  }
                >
                  View Profile
                </Button>
                <Button
                  size="small"
                  variant="contained"
                  sx={{ background: "#C03B30" }}
                  onClick={() =>
                    router.push(
                      `/dashboard/patient/appointment/create?id=${item.id}`
                    )
                  }
                >
                  Appointment
                </Button>
              </Stack>
            </Box>
          </Grid>
        ))}
      </Grid>
    </React.Fragment>
  );
}
