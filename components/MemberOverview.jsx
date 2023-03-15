import React from "react";
import {
  ListItem,
  ListItemText,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import Image from "next/image";
export default function MemberOverview({ data }) {
  return (
    <Stack
      direction={{ xs: "column", sm: "column", md: "row" }}
      spacing={1}
      justifyContent="space-between"
      alignItems="center"
    >
      <Paper
        className="hoverAnimations"
        sx={{ width: { xs: "300px", sm: "300px", md: "200px" }, p: "10px" }}
      >
        <ListItem
          secondaryAction=<Image
            src="/icons/students.png"
            height={60}
            width={60}
            quality={100}
            alt=""
          />
        >
          <ListItemText
            primary=<Typography component="h3" variant="bold">
              Student
            </Typography>
            secondary=<Typography component="h4" variant="bold">
              {data.totalStudent}
            </Typography>
          />
        </ListItem>
      </Paper>
      <Paper
        className="hoverAnimations"
        sx={{ width: { xs: "300px", sm: "300px", md: "200px" }, p: "10px" }}
      >
        <ListItem
          secondaryAction=<Image
            src="/icons/teacher.png"
            height={60}
            width={60}
            quality={100}
            alt=""
          />
        >
          <ListItemText
            primary=<Typography component="h3" variant="bold">
              Teacher
            </Typography>
            secondary=<Typography component="h4" variant="bold">
              {data.totalTeacher}
            </Typography>
          />
        </ListItem>
      </Paper>
      <Paper
        className="hoverAnimations"
        sx={{ width: { xs: "300px", sm: "300px", md: "200px" }, p: "10px" }}
      >
        <ListItem
          secondaryAction=<Image
            src="/icons/user.png"
            height={60}
            width={60}
            quality={100}
            alt=""
          />
        >
          <ListItemText
            primary=<Typography component="h3" variant="bold">
              Staff
            </Typography>
            secondary=<Typography component="h4" variant="bold">
              {data.totalStaff}
            </Typography>
          />
        </ListItem>
      </Paper>
      <Paper
        className="hoverAnimations"
        sx={{ width: { xs: "300px", sm: "300px", md: "200px" }, p: "10px" }}
      >
        <ListItem
          secondaryAction=<Image
            src="/icons/employee.png"
            height={60}
            width={60}
            quality={100}
            alt=""
          />
        >
          <ListItemText
            primary=<Typography component="h3" variant="bold">
              Employee
            </Typography>
            secondary=<Typography component="h4" variant="bold">
              {data.totalEmployee}
            </Typography>
          />
        </ListItem>
      </Paper>
    </Stack>
  );
}
