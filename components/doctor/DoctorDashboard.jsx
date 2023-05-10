import { Stack } from "@mui/material";
import React from "react";
import ItemOverview from "../ItemOverview";
import BarChart from "../BarChart";
import PaiChart from "../PaiChart";
export default function AdminDashboard({ data }) {
  
  return (
    <React.Fragment>
      <ItemOverview data={data} />
      <br></br>

      <Stack
        spacing={1}
        direction={{ xs: "column", sm: "column", md: "row" }}
        sx={{
          width: "100%",
        }}
      >
        <BarChart data={data} />
        <PaiChart data={data} />
      </Stack>
    </React.Fragment>
  );
}
