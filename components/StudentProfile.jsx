import {
  AppBar,
  Button,
  Container,
  Divider,
  List,
  ListItem,
  ListItemText,
  Paper,
  Toolbar,
  Typography,
} from "@mui/material";
import moment from "moment/moment";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

export default function StudentProfile({ data }) {
  const router = useRouter();
  return (
    <React.Fragment>
      <AppBar sx={{ background: "#1FB4B4" }}>
        <Toolbar>
          <Typography align="right" flexGrow={1}>
            <Link style={{ color: "#FFFFFF" }} href="/student-portal">
              Dashboard
            </Link>
          </Typography>
        </Toolbar>
      </AppBar>
      <Container sx={{ my: "100px" }} maxWidth="sm">
        <Paper sx={{ p: "25px" }}>
          <Typography component="h2" variant="bold" align="center" sx={{color:"gray"}}>Profile Information</Typography>
        <Divider/>
          <List dense={true}>
            <ListItem disablePadding={true}>
              <ListItemText>
                <strong>Name:</strong> {data.name}
              </ListItemText>
            </ListItem>
            <ListItem disablePadding={true}>
              <ListItemText>
                <strong>Student ID:</strong> {data.studentId}
              </ListItemText>
            </ListItem>
            <ListItem disablePadding={true}>
              <ListItemText>
                <strong>Class:</strong> {data.className}
              </ListItemText>
            </ListItem>
            <ListItem disablePadding={true}>
              <ListItemText>
                <strong>Phone:</strong> {data.phone}
              </ListItemText>
            </ListItem>
            <ListItem disablePadding={true}>
              <ListItemText>
                <strong>Email:</strong> {data.email}
              </ListItemText>
            </ListItem>
            <ListItem disablePadding={true}>
              <ListItemText>
                <strong>Gender:</strong> {data.gender}
              </ListItemText>
            </ListItem>
            <ListItem disablePadding={true}>
              <ListItemText>
                <strong>DOB:</strong> {data.dob}
              </ListItemText>
            </ListItem>
            <ListItem disablePadding={true}>
              <ListItemText>
                <strong>Blood Group:</strong> {data.bloodGroup}
              </ListItemText>
            </ListItem>
            <ListItem disablePadding={true}>
              <ListItemText>
                <strong>Address:</strong>
                {data.address}
              </ListItemText>
            </ListItem>
            <ListItem disablePadding={true}>
              <ListItemText>
                <strong>{"Father's Name:"}</strong> {data.fatherName}
              </ListItemText>
            </ListItem>
            <ListItem disablePadding={true}>
              <ListItemText>
                <strong>{"Mother's Name:"}</strong> {data.motherName}
              </ListItemText>
            </ListItem>
            <ListItem disablePadding={true}>
              <ListItemText>
                <strong>{"Guardian's Contact Number:"}</strong>
                {data.guardianContactNumber}
              </ListItemText>
            </ListItem>
            <ListItem disablePadding={true}>
              <ListItemText>
                <strong>Admited:</strong>
                {moment(data.createdAt).format("YYYY-MM-DD")}
              </ListItemText>
            </ListItem>
          </List>
          <Typography flexGrow={1} align="right">
            <Button
              variant="contained"
              color="yallo"
              size="small"
              onClick={() =>
                router.push(
                  `/student-portal/profile/update?studentId=${data.studentId}&phone=${data.phone}&email=${data.email}&address=${data.address}&motherName=${data.motherName}&fatherName=${data.fatherName}&bloodGroup=${data.bloodGroup}`
                )
              }
            >
              Update Profile
            </Button>
          </Typography>
        </Paper>
      </Container>
    </React.Fragment>
  );
}
