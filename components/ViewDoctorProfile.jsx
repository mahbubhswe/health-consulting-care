import { Avatar, Container, Divider, Paper, Typography } from "@mui/material";
import React from "react";

export default function ViewDoctorProfile({ data }) {
  return (
    <Container sx={{ mt: "50px" }}>
      <Paper sx={{ p: "50px", borderRadius: "80px" }}>
        <Typography align="center">
          <Avatar
            src={data.profilePic}
            alt="Photo"
            sx={{ height: "100px", width: "100px" }}
          />
        </Typography>
        <Divider sx={{ my: "5px" }} />
        <Typography>
          Name: <strong>{data.fullName}</strong>
        </Typography>
        <Typography>
          Department Name: <strong>{data.departmentName}</strong>
        </Typography>
        <Typography>
          Phone: <strong>{data.phone}</strong>
        </Typography>
        <Typography>
          Email: <strong>{data.email}</strong>
        </Typography>
        <Typography>
          Gender: <strong>{data.gender}</strong>
        </Typography>
        <Typography>
          Room Number: <strong>{data.roomNumber}</strong>
        </Typography>
        <Typography>
          escription: <strong>{data.description}</strong>
        </Typography>
        <Typography>
          Visiting Hours: <strong>{data.visitingHours}</strong>
        </Typography>
      </Paper>
    </Container>
  );
}
