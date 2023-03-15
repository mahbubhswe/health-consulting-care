import { Card, Container, Divider, Grid, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import AdjustIcon from "@mui/icons-material/Adjust";
import axios from "axios";
import useSWR from "swr";
import Loading from "./Loading";
const getGroup = (url) => axios.get(url).then((res) => res.data);
export default function GroupSection() {
  const { data, error } = useSWR(`/api/group/read`, getGroup);
  if (!data) {
    return <Loading />;
  }
  console.log(data);
  return (
    <Container>
      <Typography
        sx={{ color: "#BB3D6E" }}
        pt={10}
        align="center"
        variant="bold"
        component="h1"
      >
        Subjects
      </Typography>
      <Divider>
        <AdjustIcon fontSize="3" />
        <AdjustIcon fontSize="3" />
        <AdjustIcon fontSize="3" />
      </Divider>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{ my: "100px" }}
      >
        {data.length > 0 ? (
          data.map((item) => {
            return (
              <Grid item key={item.id} className="groupItem">
                <Card>
                  <Image
                    src={item.photo}
                    alt={item.groupName}
                    height={200}
                    width={200}
                    quality={100}
                  />

                  <Typography align="center" my={1}>{item.groupName}</Typography>
                </Card>
              </Grid>
            );
          })
        ) : (
          <Typography sx={{ color: "gray" }}>No subject group found</Typography>
        )}
      </Grid>
    </Container>
  );
}
