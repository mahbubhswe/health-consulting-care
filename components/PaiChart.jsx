import * as React from "react";
import { Chart } from "react-google-charts";

export default function ViewChart({ data }) {
  const chartData = [
    ["Cabin", "Ambulance"],
    ["freeAmbulance", data.freeAmbulance],
    ["bookedAmbulance", data.bookedAmbulance],
    ["freeCabin", data.freeCabin],
    ["bookedCabin", data.bookedCabin],
  ];

  const options = {
    title: "Ambulance and Cabin",
    is3D: true,
  };

  return (
    <div style={{ display: "grid", placeContent: "center", flexGrow: 1 }}>
      <Chart
        chartType="PieChart"
        data={chartData}
        options={options}
        height="350px"
        legendToggle
      />
    </div>
  );
}
