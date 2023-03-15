import {
  Container,
  ListItem,
  ListItemText,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import Image from "next/image";
import * as React from "react";

export default function StudentPortalHome({ data }) {
  return (
    <React.Fragment>
      <Container sx={{ my: "100px" }}>
        <Stack
          direction={{ xs: "column", sm: "column", md: "row" }}
          spacing={3}
          justifyContent="space-between"
          alignItems="center"
        >
          <Paper sx={{ width: "300px", p: "10px" }}>
            <ListItem
              secondaryAction=<Image
                src="/icons/payable.png"
                height={60}
                width={60}
                quality={100}
                alt=""
              />
            >
              <ListItemText
                primary=<Typography component="h2" variant="bold">
                  Payable
                </Typography>
                secondary=<Typography component="h4" variant="bold">
                  {data.payable}
                </Typography>
              />
            </ListItem>
          </Paper>
          <Paper sx={{ width: "300px", p: "10px" }}>
            <ListItem
              secondaryAction=<Image
                src="/icons/due.png"
                height={60}
                width={60}
                quality={100}
                alt=""
              />
            >
              <ListItemText
                primary=<Typography component="h2" variant="bold">
                  Due
                </Typography>
                secondary=<Typography component="h4" variant="bold">
                  {data.due}
                </Typography>
              />
            </ListItem>
          </Paper>
          <Paper sx={{ width: "300px", p: "10px" }}>
            <ListItem
              secondaryAction=<Image
                src="/icons/paid.png"
                height={60}
                width={60}
                quality={100}
                alt=""
              />
            >
              <ListItemText
                primary=<Typography component="h2" variant="bold">
                  Paid
                </Typography>
                secondary=<Typography component="h4" variant="bold">
                  {data.totalPaid}
                </Typography>
              />
            </ListItem>
          </Paper>
        </Stack>
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
              Welcome to Student Portal
            </Typography>

            <Image
              src="/studentPortalWelcome.webp"
              height={350}
              width={350}
              quality={100}
              alt=""
            />
          </Stack>
        </Paper>
      </Container>
    </React.Fragment>
  );
}
