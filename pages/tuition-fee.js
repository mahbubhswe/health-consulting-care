import {
  Typography,
  Container,
  Divider,
  Box,
  Autocomplete,
  TextField,
  List,
  ListItem,
  ListItemText,
  Paper,
} from "@mui/material";
import React, { useState } from "react";
import { prisma } from "../utils/db";
import SiteLayout from "../components/SiteLayout";
export default function TuitionFee({ data }) {
  const [tuitionFee, setTuitionFee] = useState(data);
  const classFiltering = (className) => {
    if (className == "") {
      setTuitionFee(data);
    } else {
      setTuitionFee(data.filter((item) => item.className == className));
    }
  };
  return (
    <SiteLayout pageTitle="Tuition Fee">
      <Box sx={{ borderTop: "3px solid #F2D801" }}>
        <Container maxWidth="md" sx={{ py: "20px" }}>
          <Typography
            sx={{ color: "gray" }}
            variant="h4"
            align="center"
            fontWeight={600}
          >
            Tuition Fee
          </Typography>
          <Divider sx={{ mb: "5px" }}>Select a Class</Divider>
          <Autocomplete
            sx={{ mb: "10px" }}
            options={data.map((option) => option.className)}
            onChange={(event, newValue) => {
              classFiltering(newValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select Class"
                size="small"
                required
                color="yallo"
              />
            )}
          />
          {tuitionFee.map((item) => (
            <Paper
              key={item.id}
              variant="outlined"
              sx={{ px: "10px", mb: "10px" }}
            >
              <List dense={true}>
                <Typography variant="h6" fontWeight={700}>
                  Class: {item.className}
                </Typography>
                <ListItem disablePadding={true}>
                  <ListItemText>
                    Admission Fee: {item.admissionFee}
                  </ListItemText>
                </ListItem>
                <ListItem disablePadding={true}>
                  <ListItemText>Tution Fee: {item.tutionFee}</ListItemText>
                </ListItem>
                <ListItem disablePadding={true}>
                  <ListItemText>Exam Fee: {item.examFee}</ListItemText>
                </ListItem>
                <ListItem disablePadding={true}>
                  <ListItemText>Session Fee: {item.sessionFee}</ListItemText>
                </ListItem>
                <ListItem disablePadding={true}>
                  <ListItemText>
                    Campus Development Fee: {item.campusDevelopmentFee}
                  </ListItemText>
                </ListItem>
                <ListItem disablePadding={true}>
                  <ListItemText>Others Fee: {item.othersFee}</ListItemText>
                </ListItem>
                <Divider />
                <ListItem disablePadding={true}>
                  <ListItemText>Total Amount: {item.totalAmount}</ListItemText>
                </ListItem>
              </List>
            </Paper>
          ))}
        </Container>
      </Box>
    </SiteLayout>
  );
}

export async function getServerSideProps(context) {
  const tuitionFee = await prisma.Fees.findMany();
  return {
    props: {
      data: JSON.parse(JSON.stringify(tuitionFee)),
    },
  };
}
