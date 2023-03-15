import { Typography, Container, Divider, Box } from "@mui/material";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import ShareIcon from "@mui/icons-material/Share";
import React from "react";
import EventNoteIcon from "@mui/icons-material/EventNote";
import { prisma } from "../utils/db";
import SiteLayout from "../components/SiteLayout";
import moment from "moment";
export default function Index({ data }) {
  return (
    <SiteLayout pageTitle="Noticeboard">
      <Box sx={{ borderTop: "3px solid #F2D801" }}>
        <Container maxWidth="md" sx={{ py: "20px" }}>
          <Typography
            sx={{ color: "gray" }}
            variant="h4"
            align="center"
            fontWeight={600}
          >
            Noticeboard
          </Typography>
          <Divider>Check everyday to get our regular update</Divider>
          <Typography variant="h5">Latest</Typography>

          {data.map((item) => (
            <Card key={item.id} variant="outlined" sx={{ mb: "5px" }}>
              <CardHeader
                avatar={<EventNoteIcon />}
                title={item.title}
                subheader={moment(item.createdAt).format("MMM Do YY")}
              />
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {item.description}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Container>
      </Box>
    </SiteLayout>
  );
}

export async function getServerSideProps(context) {
  const noticeboard = await prisma.noticeboard.findMany();
  return {
    props: {
      data: JSON.parse(JSON.stringify(noticeboard)),
    },
  };
}
