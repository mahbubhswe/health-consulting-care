import {  Stack } from "@mui/material";
import React from "react";
import MemberOverview from "./MemberOverview";
import AmountOverviewChart from "./AmountOverviewChart";
import AmountOverview from "./AmountOverview";
export default function Dashboard({ data }) {
  return (
    <React.Fragment>
      <MemberOverview data={data} />
      <br></br>
     
        <Stack
          spacing={1}
          direction={{ xs: "column", sm: "column", md: "row" }}
          sx={{
            width: "100%",
          }}
        >
          <AmountOverviewChart data={data} />
          <AmountOverview data={data} />
        </Stack>
   
    </React.Fragment>
  );
}
