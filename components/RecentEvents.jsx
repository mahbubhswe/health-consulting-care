import {
  Divider,
  Typography,
  Container,
  Stack,
  Paper,
  Box,
} from "@mui/material";
import React from "react";
import AdjustIcon from "@mui/icons-material/Adjust";
import axios from "axios";
import useSWR from "swr";
import Marquee from "react-fast-marquee";
import Loading from "./Loading";
import Image from "next/image";
const getRecentEvents = (url) => axios.get(url).then((res) => res.data);
export default function TeacherList() {
  const { data } = useSWR(`/api/recentEvents/read`, getRecentEvents);
  if (!data) {
    return <Loading />;
  }

  return (
    <Container>
      <Typography
        sx={{ color: "#BB3D6E" }}
        pt={10}
        align="center"
        variant="bold"
        component="h1"
      >
        Recent Events
      </Typography>
      <Divider>
        <AdjustIcon fontSize="3" />
        <AdjustIcon fontSize="3" />
        <AdjustIcon fontSize="3" />
      </Divider>
      <Marquee>
        {data
          ? data.map((item) => (
              <Stack key={item.id} direction="row" my={10} spacing={3}>
                <Paper variant="outlined">
                  <Image
                    className="eventsImg"
                    src={item.photo}
                    height={300}
                    width={300}
                    quality={100}
                  />
                  <Box pl={1} sx={{ width: "300px" }} mt={1}>
                    <Typography fontWeight={900}>{item.title}</Typography>
                    <Typography pb={3} color={Text.secondary}>
                      {item.createdAt}
                    </Typography>
                  </Box>
                </Paper>
              </Stack>
            ))
          : null}
      </Marquee>
    </Container>
  );
}
