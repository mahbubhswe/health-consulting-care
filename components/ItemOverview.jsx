import React from "react";
import {
  ListItem,
  ListItemText,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import Image from "next/image";
export default function ItemOverview({ data }) {
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
            src="/icons/doctor.png"
            height={60}
            width={60}
            quality={100}
            alt=""
          />
        >
          <ListItemText
            primary=<Typography component="h3" variant="bold">
              Doctor
            </Typography>
            secondary=<Typography component="h4" variant="bold">
              {data.doctor}
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
            src="/icons/petient.png"
            height={60}
            width={60}
            quality={100}
            alt=""
          />
        >
          <ListItemText
            primary=<Typography component="h3" variant="bold">
              Petient
            </Typography>
            secondary=<Typography component="h4" variant="bold">
              {data.patient}
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
            src="/icons/bloodBank.png"
            height={60}
            width={60}
            quality={100}
            alt=""
          />
        >
          <ListItemText
            primary=<Typography component="h3" variant="bold">
              Doner
            </Typography>
            secondary=<Typography component="h4" variant="bold">
              {data.bloodBank}
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
            src="/icons/report.png"
            height={60}
            width={60}
            quality={100}
            alt=""
          />
        >
          <ListItemText
            primary=<Typography component="h3" variant="bold">
              Report
            </Typography>
            secondary=<Typography component="h4" variant="bold">
              {data.patientReport}
            </Typography>
          />
        </ListItem>
      </Paper>
    </Stack>
  );
}
