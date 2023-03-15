import * as React from "react";
import { Chart } from "react-google-charts";
export default function AmountOverviewChart({ data }) {
  const chartData = [
    ["Amount", "Withdraw,  Cost and Salary"],
    ["Paid Employee Salary", data.paidEmployeeSalary],
    ["Utility Cost", data.paidEmployeeSalary],
    ["Withdraw", data.totalWithdraw],
  ];

  const options = {
    title: "Withdraw, Cost and Salary",
    is3D: true,
  };

  return (
    <div style={{display:"grid",placeContent:"center",flexGrow:1}}>
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
