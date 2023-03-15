import * as React from "react";
import MoneyIcon from "@mui/icons-material/Money";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Paper, Typography } from "@mui/material";
export default function ViewChart({ data }) {
  return (
    <Paper sx={{ p: "20px" }} variant="none">
      <Typography
        align="center"
        variant="bold"
        sx={{ fontSize: "30px", fontWeight: 700, color: "gray" }}
      >
        Accounts
      </Typography>
      <List dense>
        <ListItem
          component={Paper}
          className="hoverAnimations"
          sx={{
            mb: "10px",
            py: "15px",
          }}
        >
          <ListItemIcon>
            <MoneyIcon />
          </ListItemIcon>
          <ListItemText
            primary="Total Amount"
            secondary={data ? data.totalPayment : null}
          />
        </ListItem>

        <ListItem
          component={Paper}
          className="hoverAnimations"
          sx={{ mb: "10px", py: "15px" }}
        >
          <ListItemIcon>
            <MoneyIcon />
          </ListItemIcon>
          <ListItemText
            primary="Utility Cost"
            secondary={data ? data.totalUtilityCost : null}
          />
        </ListItem>
        <ListItem
          component={Paper}
          className="hoverAnimations"
          sx={{ mb: "10px", py: "15px" }}
        >
          <ListItemIcon>
            <MoneyIcon />
          </ListItemIcon>
          <ListItemText
            primary="Employee Salary"
            secondary={data ? data.totalEmployeeSalary : null}
          />
        </ListItem>
        <ListItem
          component={Paper}
          className="hoverAnimations"
          sx={{ mb: "10px", py: "15px" }}
        >
          <ListItemIcon>
            <MoneyIcon />
          </ListItemIcon>
          <ListItemText
            primary="Widthdraw"
            secondary={data ? data.totalWithdraw : null}
          />
        </ListItem>
        <ListItem
          component={Paper}
          className="hoverAnimations"
          sx={{ mb: "10px", py: "15px" }}
        >
          <ListItemIcon>
            <MoneyIcon />
          </ListItemIcon>
          <ListItemText
            primary="Paid Employee Salary"
            secondary={data ? data.paidEmployeeSalary : null}
          />
        </ListItem>
        <ListItem
          component={Paper}
          className="hoverAnimations"
          sx={{  py: "15px" }}
        >
          <ListItemIcon>
            <MoneyIcon />
          </ListItemIcon>
          <ListItemText
            primary="Balance"
            secondary={data ? data.balance : null}
          />
        </ListItem>
      </List>
    </Paper>
  );
}
