import React from "react";
import { Chart } from "react-google-charts";

export default function ViewChart({ data }) {
  const chartData = [
    ["Appoitment Status", "Pending", "Approved"],
    ["Current Status", data.pendingAppoitment, data.approveAppoitment],
  ];
  const options = {
    title: "Appointment: Pending vs Approved",
  };
  return (
    <Chart
      chartType="ScatterChart"
      data={chartData}
      options={options}
      height="350px"
      legendToggle
    />
  );
}
