import {
  Divider,
  Grid,
  Typography,
  Box,
  Slide,
  Button,
  Dialog,
  Container,
} from "@mui/material";
import React from "react";
import NextImg from "next/image";
import AdjustIcon from "@mui/icons-material/Adjust";
import axios from "axios";
import useSWR from "swr";
import { useState } from "react";
import { Fade } from "react-reveal";
import Loading from "./Loading";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const getTeacher = (url) => axios.get(url).then((res) => res.data);
export default function TeacherList() {
  const { data, error } = useSWR(`/api/teacher/read`, getTeacher);
  const [showDailog, setShowDailog] = useState(false);
  const [teacher, setTeacher] = useState();
  if (!data) {
    return <Loading />;
  }
  return (
    <Box style={{ backgroundColor: "#F4F4F4" }}>
      <Container>
        <Typography
          sx={{ color: "#BB3D6E" }}
          pt={10}
          align="center"
          variant="bold"
          component="h1"
        >
          Our Teachers
        </Typography>
        <Divider>
          <AdjustIcon fontSize="3" />
          <AdjustIcon fontSize="3" />
          <AdjustIcon fontSize="3" />
        </Divider>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          py={10}
        >
          {data.length > 0 ? (
            data.map((item) => (
              <Fade bottom key={item.id}>
                <Grid
                  item
                  sx={{
                    height: "250px",
                    width: "180px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    margin: "8px",
                    boxShadow: "0 1px 4px 0 rgb(0 0 0 / 50%)",
                  }}
                >
                  <Typography align="center">
                    <NextImg
                      src={item.avatar}
                      height={180}
                      width={180}
                      quality={100}
                    />
                  </Typography>
                  <Typography align="center">
                    <strong> {item.name.substring(0, 20)}</strong>
                    <span> {item.designation.substring(0, 20)}</span>
                  </Typography>
                </Grid>
              </Fade>
            ))
          ) : (
            <Typography sx={{ color: "gray" }}>No teacher found</Typography>
          )}
        </Grid>
        {/* //show details */}
        <Dialog
          open={showDailog}
          onClose={() => setShowDailog(!showDailog)}
          TransitionComponent={Transition}
        >
          gfhjhggfd
        </Dialog>
      </Container>
    </Box>
  );
}
