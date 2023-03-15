import Menu from "@mui/icons-material/Menu";
import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import NavItem from "./NavItem";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <React.Fragment>
      <AppBar
        position="sticky"
        sx={{ py: "7px", boxShadow: "none", background: "transparent" }}
      >
        <Toolbar>
          <Typography
            variant="h4"
            fontWeight={900}
            sx={{ color: "#BB3D6E", flexGrow: 1 }}
          >
            SchoolName
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "none", md: "block" } }}>
            <NavItem direction="row" />
          </Box>
          <IconButton
            sx={{ display: { xs: "block", sm: "none", md: "none" } }}
            onClick={() => setOpen(true)}
          >
            <Menu />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer open={open} onClose={() => setOpen(false)}>
        <Box sx={{ width: "200px", p: "20px" }}>
          <NavItem direction="column" />
        </Box>
      </Drawer>
    </React.Fragment>
  );
}
